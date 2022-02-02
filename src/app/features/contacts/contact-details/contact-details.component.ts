import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import firebase from 'firebase/app';
import { Subscription } from 'rxjs';
import { ContactData } from 'src/app/models/contact';
import { AuthService } from 'src/app/services/auth.service';
import { ContactService } from 'src/app/services/contact.service';
@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css'],
})
export class ContactDetailsComponent implements OnInit, OnDestroy {
  pending = false;
  deleting = false;

  currentUser?: firebase.User | null;

  contact?: ContactData;
  id?: string | null;

  authSub?: Subscription;
  getContactSub?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private contactService: ContactService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.authService.currentUser$.subscribe((currentUser) => {
      this.currentUser = currentUser;

      if (this.currentUser) {
        if (this.id) {
          this.pending = true;
          this.getContactSub = this.contactService
            .read(this.currentUser.uid, this.id)
            .subscribe((contact) => {
              if (contact) {
                this.contact = contact;
              }
              this.pending = false;
            });
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.getContactSub?.unsubscribe();
  }

  onEdit(): void {
    if (this.id) {
      this.router.navigate(['/contact-form', this.id]);
    }
  }

  openModal(content: any): void {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.delete();
        },
        (reason) => {}
      );
  }

  private async delete(): Promise<void> {
    if (this.currentUser) {
      this.deleting = true;
      if (this.id) {
        await this.contactService.delete(this.currentUser.uid, this.id);
        this.router.navigateByUrl('/contact-dashboard');
      }
      this.deleting = false;
    }
  }
}
