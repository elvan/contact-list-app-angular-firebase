import { Injectable } from '@angular/core';
import {
  Action,
  AngularFirestore,
  DocumentChangeAction,
  DocumentSnapshot,
} from '@angular/fire/firestore';
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
      .collection<Contact>('contacts', (ref) =>
        ref.orderBy('createdAt', 'desc')
      )
      .snapshotChanges()
      .pipe(map(this.fromCollection));
  }

  create(contact: Contact) {
    const timestamp = firebase.firestore.Timestamp.fromDate(new Date());
    contact.createdAt = timestamp;
    contact.updatedAt = timestamp;
    return this.firestore.collection<Contact>('contacts').add(contact);
  }

  read(id: string) {
    return this.firestore
      .collection<Contact>('contacts')
      .doc(id)
      .snapshotChanges()
      .pipe(map(this.fromDocument));
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

  private fromCollection(changes: DocumentChangeAction<Contact>[]): Contact[] {
    return changes.map((action) => {
      const data = action.payload.doc.data();
      const id = action.payload.doc.id;
      return { ...data, id };
    });
  }

  private fromDocument(
    snapshot: Action<DocumentSnapshot<Contact>>
  ): Contact | null {
    if (!snapshot.payload.exists) {
      return null;
    }

    const data = snapshot.payload.data();
    const id = snapshot.payload.id;
    return { ...data, id };
  }
}
