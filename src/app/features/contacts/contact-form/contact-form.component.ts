import { Component, OnInit } from '@angular/core';
import { dummyUsers } from 'src/app/data/dummy-users';
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
      name: dummyUsers[Math.floor(Math.random() * 10)].name,
      email: dummyUsers[Math.floor(Math.random() * 10)].email.toLowerCase(),
      phone: dummyUsers[Math.floor(Math.random() * 10)].phone,
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
