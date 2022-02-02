import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { map } from 'rxjs/operators';
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private firestore: AngularFirestore) {}

  list() {
    return this.firestore
      .collection<Contact>('contacts')
      .snapshotChanges()
      .pipe(
        map((changes) => {
          return changes.map((action) => {
            const data = action.payload.doc.data();
            const id = action.payload.doc.id;
            return { ...data, id };
          });
        })
      );
  }

  create(contact: Contact) {
    const timestamp = firebase.firestore.Timestamp.fromDate(new Date());
    contact.createdAt = timestamp;
    contact.updatedAt = timestamp;
    return this.firestore.collection<Contact>('contacts').add(contact);
  }

  get(id: string) {
    return this.firestore
      .collection<Contact>('contacts')
      .doc(id)
      .snapshotChanges()
      .pipe(
        map((action) => {
          if (!action.payload.exists) {
            return null;
          }

          const data = action.payload.data();
          const id = action.payload.id;
          return { ...data, id };
        })
      );
  }

  update(id: string, contact: Contact) {
    contact.updatedAt = firebase.firestore.Timestamp.fromDate(new Date());
    return this.firestore
      .collection<Contact>('contacts')
      .doc(id)
      .update(contact);
  }

  delete(id: string) {
    return this.firestore.collection<Contact>('contacts').doc(id).delete();
  }
}
