import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Subscription } from 'rxjs';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/users/User';
import { TBR } from '../../shared/models/TBR';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatProgressBarModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit, OnDestroy {
  user: User | null = null;
  tbrs: TBR[] = [];
  isLoading = true;
  
  private subscription: Subscription | null = null;

  constructor(private userService: UserService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
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
    
    const firstInitial = this.user.name.firstname ? this.user.name.firstname.charAt(0).toUpperCase() : '';
    const lastInitial = this.user.name.lastname ? this.user.name.lastname.charAt(0).toUpperCase() : '';
    
    return firstInitial + (lastInitial ? lastInitial : '');
  }

  logout(): void {
  this.authService.signOut().then(() => {
    this.router.navigate(['/home']); // vagy más oldalra irányítás
  }).catch(error => {
    console.error('Kijelentkezési hiba:', error);
  });
}

}