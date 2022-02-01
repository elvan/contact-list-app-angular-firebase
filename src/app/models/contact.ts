import firebase from 'firebase/app';

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  address: string;
  website: string;
  createdAt?: firebase.firestore.Timestamp;
  updatedAt?: firebase.firestore.Timestamp;
}
