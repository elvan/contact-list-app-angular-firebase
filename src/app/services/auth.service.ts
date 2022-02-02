import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { EMPTY, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public readonly firebaseUser$: Observable<firebase.User | null> = EMPTY;

  constructor(private auth: AngularFireAuth) {
    this.firebaseUser$ = this.auth.authState;
  }

  getUser() {
    return this.auth.authState;
  }

  login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  getCurrentUser(): Promise<firebase.User | null> {
    return new Promise<firebase.User | null>(async (resolve, reject) => {
      const unsubscribe = await this.auth.onAuthStateChanged((user) => {
        resolve(user);
        unsubscribe();
      }, reject);
    });
  }
}
