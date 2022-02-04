import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
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

  contacts: ContactWithId[] = [];

  authSub?: Subscription;
  listContactsSub?: Subscription;

  constructor(
    private router: Router,
    private contactService: ContactService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authSub = this.authService
      .getUser()
      .pipe(take(1))
      .subscribe((currentUser) => {
        if (currentUser) {
          this.pending = true;
          this.listContactsSub = this.contactService
            .list(currentUser.uid)
            .subscribe(
              (contacts) => {
                if (contacts) {
                  this.contacts = contacts;
                }
                this.pending = false;
              },
              (error) => {
                console.log(error);
              }
            );
        }
      });
  }

  ngOnDestroy(): void {
    this.authSub?.unsubscribe();
    this.listContactsSub?.unsubscribe();
  }

  viewDetails(id: string | undefined): void {
    if (id) {
      this.router.navigate(['/contact-details', id]);
    }
  }
}
