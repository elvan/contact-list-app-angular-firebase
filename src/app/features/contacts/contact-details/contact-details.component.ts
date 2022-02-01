import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Contact } from 'src/app/models/contact';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css'],
})
export class ContactDetailsComponent implements OnInit, OnDestroy {
  pending = false;
  deleting = false;

  contact?: Contact;
  id: string | null;

  getContactSub?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contactService: ContactService,
    private modalService: NgbModal
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    if (this.id) {
      this.pending = true;
      this.getContactSub = this.contactService
        .get(this.id)
        .subscribe((contact) => {
          if (contact) {
            this.contact = contact;
          }
          this.pending = false;
        });
    }
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
    this.deleting = true;
    if (this.id) {
      await this.contactService.delete(this.id);
      this.router.navigateByUrl('/contact-dashboard');
    }
    this.deleting = false;
  }
}
