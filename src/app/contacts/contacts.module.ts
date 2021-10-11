import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ContactsDashboardComponent } from './contacts-dashboard/contacts-dashboard.component';
import { ContactCreateComponent } from './contact-create/contact-create.component';

@NgModule({
  declarations: [ContactsDashboardComponent, ContactCreateComponent],
  imports: [CommonModule],
})
export class ContactsModule {}
