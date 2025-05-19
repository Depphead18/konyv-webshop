import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { firstValueFrom, Subscription } from 'rxjs';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/users/User';
import { TBR } from '../../shared/models/TBR';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { Auth, deleteUser } from '@angular/fire/auth';
import { deleteDoc, doc, Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit, OnDestroy {
  user: User | null = null;
  tbrs: TBR[] = [];
  isLoading = true;
  isEditing = false;
  private subscription: Subscription | null = null;

  constructor(private userService: UserService, private authService: AuthService, private router: Router, private auth: Auth, private firestore: Firestore) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  loadUserProfile(): void {
    this.isLoading = true;
    this.subscription = this.userService.getUserProfile().subscribe({
      next: (data) => {
        this.user = data.user;
        this.tbrs = data.tbr;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Hiba a felhasználói profil betöltésekor:', error);
        this.isLoading = false;
      }
    });
  }

  getInitials(): string {
    if (!this.user || !this.user.name) return '?';
    const firstInitial = this.user.name.firstname?.charAt(0).toUpperCase() || '';
    const lastInitial = this.user.name.lastname?.charAt(0).toUpperCase() || '';
    return firstInitial + lastInitial;
  }

  logout(): void {
    this.authService.signOut().then(() => {
      this.router.navigate(['/home']);
    }).catch(error => {
      console.error('Kijelentkezési hiba:', error);
    });
  }

  enableEdit(): void {
    this.isEditing = true;
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.loadUserProfile();
  }

  deleteUserProfile(): Promise<void> {
    return firstValueFrom(this.authService.currentUser).then(async authUser => {
      if (!authUser) {
        throw new Error("Nincs bejelentkezett felhasználó.");
      }

      const uid = authUser.uid;
      const userDocRef = doc(this.firestore, 'Users', uid);

      await deleteDoc(userDocRef);

      if (this.auth.currentUser) {
        await deleteUser(this.auth.currentUser);
      } else {
        throw new Error("Nem található a felhasználó.");
      }
    });
  }

  onDeleteClicked(): void {
    this.deleteUserProfile().catch(e => {
      console.error('Hiba történt a fiók törlésekor:', e);
      alert('Hiba történt a fiók törlésekor.');
    });
  }
}