import { Component, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { map, Observable } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    MatListModule,
    MatIconModule
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  @Input() sidenav?: MatSidenav;

  isLoggedIn$: Observable<boolean>;

  constructor(
    private authService: AuthService
  ) {
    this.isLoggedIn$ = this.authService.isLoggedIn().pipe(
      map(user => !!user) 
);

  }

  closeMenu(sidenav: MatSidenav) {
    sidenav?.close();
  }

  logout() {
  this.authService.signOut().then(() => {
    this.sidenav?.close();
  });
}
}
