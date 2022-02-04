import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { Observable, ReplaySubject } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user$ = new ReplaySubject<firebase.User | null>(1);

  constructor(private firebaseAuth: AngularFireAuth) {
    this.firebaseAuth.authState.subscribe((firebaseUser) => {
      this.user$.next(firebaseUser);
    });
  }

  getUser(): Observable<firebase.User | null> {
    // Cache the observable with shareReplay to avoid unnecessary calls to the backend
    return this.user$
      .asObservable()
      .pipe(shareReplay({ bufferSize: 1, refCount: true }));
  }

  async register(email: string, password: string) {
    const userCredential =
      await this.firebaseAuth.createUserWithEmailAndPassword(email, password);
    this.user$.next(userCredential.user);
  }

  async login(email: string, password: string) {
    const userCredential = await this.firebaseAuth.signInWithEmailAndPassword(
      email,
      password
    );
    this.user$.next(userCredential.user);
  }

  async logout() {
    await this.firebaseAuth.signOut();
    this.user$.next(null);
  }

  initAuthState(): Promise<firebase.User | null> {
    return new Promise<firebase.User | null>(async (resolve, reject) => {
      const unsubscribe = await this.firebaseAuth.onAuthStateChanged((user) => {
        resolve(user);
        unsubscribe();
      }, reject);
    });
  }
}
