import { Component, OnInit } from '@angular/core';
import faker from '@faker-js/faker';
import { Contact } from 'src/app/models/contact';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css'],
})
export class ContactFormComponent implements OnInit {
  isPending = false;

  contact: Contact;

  constructor() {
    this.contact = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email().toLowerCase(),
      phone: faker.phone.phoneNumber(),
    };
  }

  ngOnInit(): void {}

  save() {
    this.isPending = true;
    setTimeout(() => {
      this.isPending = false;
    }, 1000);
  }
}
