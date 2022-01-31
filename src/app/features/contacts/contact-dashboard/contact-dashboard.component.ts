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
  isPending = false;

  contacts: Contact[] = [];

  contactsSubscription = new Subscription();

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.isPending = true;
    this.contactsSubscription = this.contactService
      .getAll()
      .subscribe((contactsData) => {
        this.contacts = contactsData;
        this.isPending = false;
      });
  }

  ngOnDestroy(): void {
    this.contactsSubscription.unsubscribe();
  }
}
