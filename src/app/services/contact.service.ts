import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { map } from 'rxjs/operators';
import { Contact } from '../models/contact';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService
  ) {}

  list() {
    return this.firestore
      .collection<Contact>('contacts', this.queryContacts)
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
    this.authService.user$.subscribe((user) => {
      if (user) {
        contact.createdAt = timestamp;
        contact.updatedAt = timestamp;
        contact.uid = user.uid;
        this.firestore.collection<Contact>('contacts').add(contact);
      }
    });
  }

  get(id: string) {
    return this.firestore
      .collection<Contact>('contacts', this.queryContacts)
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

  update(id: string, contact: Contact): Promise<void> {
    contact.updatedAt = firebase.firestore.Timestamp.fromDate(new Date());
    return this.firestore
      .collection<Contact>('contacts', this.queryContacts)
      .doc(id)
      .update(contact);
  }

  delete(id: string): Promise<void> {
    return this.firestore
      .collection<Contact>('contacts', this.queryContacts)
      .doc(id)
      .delete();
  }

  private queryContacts = (ref: firebase.firestore.Query) => {
    let query:
      | firebase.firestore.CollectionReference
      | firebase.firestore.Query = ref;

    query = query.orderBy('createdAt', 'desc');

    return query;
  };
}
