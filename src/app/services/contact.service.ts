import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference,
} from '@angular/fire/firestore';
import firebase from 'firebase/app';
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
      return ref.orderBy('createdAt', 'desc');
    });
  }

  getAll(): Observable<Contact[]> {
    return this.contactCollection.snapshotChanges().pipe(
      map((changes) => {
        return changes.map((action) => {
          const data = action.payload.doc.data() as Contact;
          const id = action.payload.doc.id;
          return { ...data, id };
        });
      })
    );
  }

  create(contact: Contact): Promise<DocumentReference<Contact>> {
    contact.createdAt = firebase.firestore.Timestamp.fromDate(new Date());
    contact.updatedAt = firebase.firestore.Timestamp.fromDate(new Date());
    return this.contactCollection.add(contact);
  }
}
