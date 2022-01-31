import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contactCollection: AngularFirestoreCollection<Contact>;

  constructor(private firestore: AngularFirestore) {
    this.contactCollection = this.firestore.collection('contacts', (ref) => {
      return ref.orderBy('lastName', 'asc');
    });
  }

  getAllContacts(): Observable<Contact[]> {
    return this.contactCollection.snapshotChanges().pipe(
      map((changes) =>
        changes.map((action) => {
          const data = action.payload.doc.data() as Contact;
          const id = action.payload.doc.id;
          return { ...data, id };
        })
      )
    );
  }
}
