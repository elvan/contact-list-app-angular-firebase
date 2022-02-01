import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Contact } from 'src/app/models/contact';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-dashboard',
  templateUrl: './contact-dashboard.component.html',
  styleUrls: ['./contact-dashboard.component.css'],
})
export class ContactDashboardComponent implements OnInit, OnDestroy {
  pending = false;

  contacts: Contact[] = [];

  listContactsSub?: Subscription;

  constructor(private router: Router, private contactService: ContactService) {}

  ngOnInit(): void {
    this.pending = true;
    this.listContactsSub = this.contactService
      .list()
      .subscribe((contactsData) => {
        this.contacts = contactsData;
        this.pending = false;
      });
  }

  ngOnDestroy(): void {
    this.listContactsSub?.unsubscribe();
  }

  viewDetails(id: string | undefined): void {
    if (id) {
      this.router.navigate(['/contact-details', id]);
    }
  }
}
