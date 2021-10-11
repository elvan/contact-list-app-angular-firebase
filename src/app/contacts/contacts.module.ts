import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { ContactCreateComponent } from './contact-create/contact-create.component';
import { ContactsDashboardComponent } from './contacts-dashboard/contacts-dashboard.component';

@NgModule({
  declarations: [ContactsDashboardComponent, ContactCreateComponent],
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
  ],
})
export class ContactsModule {}
