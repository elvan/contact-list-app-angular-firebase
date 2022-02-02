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
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  user: firebase.User | null = null;

  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService
  ) {
    this.authService.firebaseUser$.subscribe((user) => (this.user = user));
  }

  list() {
    return this.firestore
      .collection<Contact>(`/users/${this.user?.uid}/contacts`, (ref) =>
        ref.orderBy('createdAt', 'desc')
      )
      .snapshotChanges()
      .pipe(map(this.fromCollection));
  }

  create(contact: Contact) {
    const timestamp = firebase.firestore.Timestamp.fromDate(new Date());
    contact.createdAt = timestamp;
    contact.updatedAt = timestamp;
    return this.firestore
      .collection<Contact>(`/users/${this.user?.uid}/contacts`)
      .add(contact);
  }

  read(id: string) {
    return this.firestore
      .collection<Contact>(`/users/${this.user?.uid}/contacts`)
      .doc(id)
      .snapshotChanges()
      .pipe(map(this.fromDocument));
  }

  update(id: string, contact: Contact) {
    contact.updatedAt = firebase.firestore.Timestamp.fromDate(new Date());
    return this.firestore
      .collection<Contact>(`/users/${this.user?.uid}/contacts`)
      .doc(id)
      .update(contact);
  }

  delete(id: string) {
    return this.firestore
      .collection<Contact>(`/users/${this.user?.uid}/contacts`)
      .doc(id)
      .delete();
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
