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
    return this.contactCollection.snapshotChanges().pipe<Contact[]>(
      map((changes) => {
        return changes.map((action) => {
          const data = action.payload.doc.data();
          const id = action.payload.doc.id;
          return { ...data, id };
        });
      })
    );
  }

  create(contact: Contact): Promise<DocumentReference<Contact>> {
    const timestamp = firebase.firestore.Timestamp.fromDate(new Date());
    contact.createdAt = timestamp;
    contact.updatedAt = timestamp;
    return this.contactCollection.add(contact);
  }

  get(id: string) {
    return this.contactCollection
      .doc(id)
      .snapshotChanges()
      .pipe(
        map((action) => {
          if (action.payload.exists === false) {
            return null;
          } else {
            const data = action.payload.data();
            data.id = action.payload.id;
            return data;
          }
        })
      );
  }

  update(id: string, contact: Contact) {
    contact.updatedAt = firebase.firestore.Timestamp.fromDate(new Date());
    return this.contactCollection.doc(id).update(contact);
  }

  delete(id: string) {
    return this.contactCollection.doc(id).delete();
  }
}
