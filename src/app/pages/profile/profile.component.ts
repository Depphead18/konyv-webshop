import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../shared/users/User';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileObject: any = [
    {
      user_name: 'Kovács János',
      username: 'kovacsjani',
      email: 'kovacs.janos@example.com',
      phone: '+36 70 123 4567',
      avatar: 'KJ'
    }
  ];

  constructor(private authService: AuthService, private router: Router) {}

  
  selectedIndex: number = 0;

  ngOnInit(): void {
    // Inicializálás
  }

  getInitials(name: string): string {
    return name.split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  }

  reload(index: number): void {
    this.selectedIndex = index;
  }

  logout(): void {
  this.authService.signOut().then(() => {
    this.router.navigateByUrl('/home');
  });
}
}