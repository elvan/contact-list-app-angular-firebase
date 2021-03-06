import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { Subscription } from 'rxjs';
import { ContactWithId } from 'src/app/models/contact';
import { AuthService } from 'src/app/services/auth.service';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-dashboard',
  templateUrl: './contact-dashboard.component.html',
  styleUrls: ['./contact-dashboard.component.css'],
})
export class ContactDashboardComponent implements OnInit, OnDestroy {
  pending = false;

  user: firebase.User | null = null;
  contacts: ContactWithId[] = [];

  authSub?: Subscription;
  contactSub?: Subscription;

  constructor(
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
      this.pending = true;
      this.contactSub = this.contactService
        .list(this.user.uid)
        .subscribe((contacts) => {
          if (contacts) {
            this.contacts = contacts;
          }
          this.pending = false;
        });
    }
  }

  ngOnDestroy(): void {
    this.authSub?.unsubscribe();
    this.contactSub?.unsubscribe();
  }

  viewDetails(id: string | undefined): void {
    if (id) {
      this.router.navigate(['/contact-details', id]);
    }
  }
}
