import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  signOut,
  authState,
  User,
  UserCredential
} from '@angular/fire/auth';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  currentUser: Observable<User | null>;

  constructor(
    private auth: Auth,
    private router: Router
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

  isLoggedIn(): Observable<boolean> {
    return this.isLoggedIn$;
  }
}
