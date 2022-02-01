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

  contactData: Contact = {
    id: '',
    name: '',
    email: '',
    phone: '',
    company: '',
    address: '',
    website: '',
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
      // Create new contact with dummy data
      const dummyAddress =
        `${dummyUsers[Math.floor(Math.random() * 10)].address.street} ` +
        `${dummyUsers[Math.floor(Math.random() * 10)].address.suite}, ` +
        `${dummyUsers[Math.floor(Math.random() * 10)].address.city}, ` +
        `${dummyUsers[Math.floor(Math.random() * 10)].address.zipcode}`;

      this.contactData = {
        id: '',
        name: dummyUsers[Math.floor(Math.random() * 10)].name,
        email: dummyUsers[Math.floor(Math.random() * 10)].email.toLowerCase(),
        phone: dummyUsers[Math.floor(Math.random() * 10)].phone,
        company: dummyUsers[Math.floor(Math.random() * 10)].company.name,
        address: dummyAddress,
        website: dummyUsers[Math.floor(Math.random() * 10)].website,
      };
    } else {
      // Update existing contact
      this.returnUrl = '/contact-details/' + this.id;
      this.contactService.get(this.id).subscribe((contact) => {
        if (contact) {
          this.contactData = {
            ...contact,
            id: contact.id,
          };
        }
      });
    }

    this.isPending = false;
  }

  async onSubmit(contactForm: NgForm): Promise<void> {
    this.isPending = true;

    if (contactForm.invalid) {
      return;
    }

    if (!this.id) {
      // Create
      await this.contactService.create(this.contactData);
      this.router.navigateByUrl('/contact-dashboard');
    } else {
      // Update
      await this.contactService.update(this.id, contactForm.value);
      this.router.navigate(['/contact-details', this.id]);
    }

    this.isPending = false;
  }
}
