import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Contact } from 'src/app/models/contact';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-dashboard',
  templateUrl: './contact-dashboard.component.html',
  styleUrls: ['./contact-dashboard.component.css'],
})
export class ContactDashboardComponent implements OnInit, OnDestroy {
  contacts: Contact[] = [];

  contactsSubscription = new Subscription();

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.contactsSubscription = this.contactService
      .getAllContacts()
      .subscribe((contactsData) => {
        this.contacts = contactsData;
        console.log(this.contacts);
      });
  }

  ngOnDestroy(): void {
    this.contactsSubscription.unsubscribe();
  }
}
