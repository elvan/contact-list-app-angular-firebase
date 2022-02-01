import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from 'src/app/models/contact';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css'],
})
export class ContactDetailsComponent implements OnInit {
  isPending = false;
  isDeleting = false;

  contact?: Contact;
  id?: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contactService: ContactService
  ) {}

  ngOnInit(): void {
    this.isPending = true;
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.contactService.get(id).subscribe((contact) => {
        if (contact) {
          this.id = id;
          this.contact = contact;
        }
      });
    }
    this.isPending = false;
  }

  onEdit(): void {
    if (this.id) {
      this.router.navigate(['/contact-edit', this.id]);
    }
  }

  async onDelete() {
    this.isDeleting = true;
    if (confirm('Are you sure?')) {
      if (this.id) {
        await this.contactService.delete(this.id);
        this.router.navigateByUrl('/contact-dashboard');
      }
    }
    this.isDeleting = false;
  }
}
