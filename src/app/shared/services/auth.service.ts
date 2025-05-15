import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  signOut,
  authState,
  User as FirebaseUser,
  UserCredential,
  createUserWithEmailAndPassword
} from '@angular/fire/auth';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { Firestore, collection, doc, setDoc } from '@angular/fire/firestore';
import { User } from '../users/User';

// ✅ Típus új felhasználó létrehozásához (Firestore-ba)
type NewUserData = Omit<User, 'id'>;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  currentUser: Observable<FirebaseUser | null>;

  constructor(
    private auth: Auth,
    private router: Router,
    private firestore: Firestore
  ) {
    this.currentUser = authState(this.auth);
    this.currentUser.subscribe(user => {
      this.isLoggedInSubject.next(!!user);
    });
  }

  signIn(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  signOut(): Promise<void> {
    return signOut(this.auth).then(() => {
      this.isLoggedInSubject.next(false);
      this.router.navigateByUrl('/home');
    });
  }

  async signUp(email: string, password: string, userData: NewUserData): Promise<UserCredential> {
    const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);

    // 👇 Új felhasználó adatainak mentése Firestore-ba
    await this.createUserData(userCredential.user.uid, {
      ...userData,
      email,
      tbr: []
    });

    return userCredential;
  }

  private async createUserData(userId: string, userData: NewUserData): Promise<void> {
    const userRef = doc(this.firestore, 'Users', userId);
    return setDoc(userRef, userData);
  }

  isLoggedIn(): Observable<FirebaseUser | null> {
    return this.currentUser;
  }

  updateLoginStatus(isLoggedIn: boolean): void {
    localStorage.setItem('isLoggedIn', isLoggedIn ? 'true' : 'false');
  }
}
