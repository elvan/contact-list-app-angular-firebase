import firebase from 'firebase/app';

export interface ContactData {
  name: string;
  email: string;
  phone: string;
  company: string;
  address: string;
  website: string;
  createdAt?: firebase.firestore.Timestamp;
  updatedAt?: firebase.firestore.Timestamp;
}

export interface ContactWithId extends ContactData {
  id: string;
}
