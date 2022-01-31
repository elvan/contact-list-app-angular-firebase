import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
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

  contact: Contact;

  constructor(private router: Router, private contactService: ContactService) {
    this.contact = {
      name: dummyUsers[Math.floor(Math.random() * 10)].name,
      email: dummyUsers[Math.floor(Math.random() * 10)].email.toLowerCase(),
      phone: dummyUsers[Math.floor(Math.random() * 10)].phone,
    };
  }

  ngOnInit(): void {}

  async onSubmit(contactForm: NgForm) {
    this.isPending = true;

    if (contactForm.invalid) {
      return;
    }

    await this.contactService.create(this.contact);

    this.isPending = false;
    this.router.navigateByUrl('/contact-dashboard');
  }
}
