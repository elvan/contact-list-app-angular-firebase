import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { EMPTY, Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public readonly firebaseUser$: Observable<firebase.User | null> = EMPTY;

  private currentUserSource = new ReplaySubject<firebase.User | null>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private firebaseAuth: AngularFireAuth) {
    this.firebaseAuth.authState.subscribe((user) => {
      this.currentUserSource.next(user);
    });
  }

  async login(email: string, password: string) {
    const userCredential = await this.firebaseAuth.signInWithEmailAndPassword(
      email,
      password
    );
    this.currentUserSource.next(userCredential.user);
  }

  async logout() {
    await this.firebaseAuth.signOut();
    this.currentUserSource.next(null);
  }

  getCurrentUser(): Promise<firebase.User | null> {
    return new Promise<firebase.User | null>(async (resolve, reject) => {
      const unsubscribe = await this.firebaseAuth.onAuthStateChanged((user) => {
        resolve(user);
        unsubscribe();
      }, reject);
    });
  }
}
