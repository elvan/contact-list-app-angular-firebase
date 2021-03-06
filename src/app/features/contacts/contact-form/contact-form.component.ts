import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import firebase from 'firebase/app';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { dummyUsers } from 'src/app/data/dummy-users';
import { ContactData } from 'src/app/models/contact';
import { AuthService } from 'src/app/services/auth.service';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css'],
})
export class ContactFormComponent implements OnInit, OnDestroy {
  pending = false;
  saving = false;

  mode: 'create' | 'update' = 'create';

  user: firebase.User | null = null;

  id: string | null = null;

  contactData: ContactData = {
    name: '',
    email: '',
    phone: '',
    company: '',
    address: '',
    website: '',
  };

  returnUrl = '/contact-dashboard';

  authSub?: Subscription;
  contactSub?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private contactService: ContactService
  ) {
    this.authSub = this.authService.getUser().subscribe((user) => {
      this.user = user;
    });
  }

  ngOnInit(): void {
    if (this.user) {
      this.id = this.route.snapshot.paramMap.get('id');
      if (!this.id) {
        this.mode = 'create';
        this.contactData = this.createDummyData();
      } else {
        // Update existing contact
        this.pending = true;
        this.mode = 'update';
        this.returnUrl = '/contact-details/' + this.id;
        this.contactSub = this.contactService
          .read(this.user.uid, this.id)
          .pipe(take(1))
          .subscribe((contact) => {
            if (contact) {
              this.contactData = contact;
            }
            this.pending = false;
          });
      }
    }
  }

  ngOnDestroy(): void {
    this.authSub?.unsubscribe();
    this.contactSub?.unsubscribe();
  }

  async onSubmit(contactForm: NgForm): Promise<void> {
    if (contactForm.invalid) {
      return;
    }

    if (this.user) {
      this.pending = true;
      this.saving = true;

      if (this.mode === 'create') {
        // Create
        await this.contactService.create(this.user.uid, this.contactData);
        this.router.navigateByUrl('/contact-dashboard');
      } else {
        // Update
        if (this.id) {
          await this.contactService.update(
            this.user.uid,
            this.id,
            contactForm.value
          );
          this.router.navigate(['/contact-details', this.id]);
        }
      }

      this.pending = false;
      this.saving = false;
    }
  }

  private createDummyData() {
    const dummyAddress =
      `${dummyUsers[Math.floor(Math.random() * 10)].address.street} ` +
      `${dummyUsers[Math.floor(Math.random() * 10)].address.suite}, ` +
      `${dummyUsers[Math.floor(Math.random() * 10)].address.city}, ` +
      `${dummyUsers[Math.floor(Math.random() * 10)].address.zipcode}`;

    return {
      name: dummyUsers[Math.floor(Math.random() * 10)].name,
      email: dummyUsers[Math.floor(Math.random() * 10)].email.toLowerCase(),
      phone: dummyUsers[Math.floor(Math.random() * 10)].phone,
      company: dummyUsers[Math.floor(Math.random() * 10)].company.name,
      address: dummyAddress,
      website: dummyUsers[Math.floor(Math.random() * 10)].website,
    };
  }
}
