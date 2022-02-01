import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { dummyUsers } from 'src/app/data/dummy-users';
import { Contact } from 'src/app/models/contact';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css'],
})
export class ContactFormComponent implements OnInit {
  isPending = false;

  id: string | null = null;
  contact: Contact = {
    name: '',
    email: '',
    phone: '',
  };

  returnUrl = '/contact-dashboard';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contactService: ContactService
  ) {}

  ngOnInit(): void {
    this.isPending = true;
    this.id = this.route.snapshot.paramMap.get('id');
    console.log('ID', this.id);

    if (!this.id) {
      this.contact = {
        name: dummyUsers[Math.floor(Math.random() * 10)].name,
        email: dummyUsers[Math.floor(Math.random() * 10)].email.toLowerCase(),
        phone: dummyUsers[Math.floor(Math.random() * 10)].phone,
      };
    } else {
      this.returnUrl = '/contact-details/' + this.id;
      this.contactService.get(this.id).subscribe((contact) => {
        if (contact) {
          this.contact = contact;
        }
      });
    }

    this.isPending = false;
  }

  async onSubmit(contactForm: NgForm) {
    this.isPending = true;

    if (contactForm.invalid) {
      return;
    }

    if (!this.id) {
      // Create
      this.router.navigateByUrl('/contact-dashboard');
    } else {
      // Update
      await this.contactService.update(this.id, contactForm.value);
      this.router.navigate(['/contact-details', this.id]);
    }

    this.isPending = false;
  }
}
