import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileObject } from '../../shared/constants';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-profile',
  imports: [CommonModule,
    MatCardModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    MatProgressBarModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{
  profileObject: any = ProfileObject;
  
  selectedIndex: number = 0;

  ngOnInit(): void{
    this.selectedIndex;
  }

  reload (index: number): void{
    this.selectedIndex = index;
  }

  logout() {
    //this.authService.signOut();
    
  }

  user = {
    name: 'Vezeteknev Keresztnev',
    felhasznalonev: '@valami',
    email: 'felhasznalo@example.com',
    avatar: 'https://i.pravatar.cc/150?img=3'
  };
}
