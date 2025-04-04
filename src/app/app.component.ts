import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { MenuComponent } from './shared/menu/menu.component';
import { NgIf } from '@angular/common';
import { RegistrateComponent } from './pages/registrate/registrate.component';
import { KonyvlistaComponent } from './pages/konyvlista/konyvlista.component';
import { KonyvreszletekComponent } from './pages/konyvreszletek/konyvreszletek.component';
import { LoginComponent } from './pages/login/login.component';
import { KosarComponent } from './pages/kosar/kosar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HomeComponent, ProfileComponent, MenuComponent, NgIf, RegistrateComponent, KonyvlistaComponent, KonyvreszletekComponent, LoginComponent, KosarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'konyv-webshop';
  page = "home";
  changePage(selectedPage: string){
    this.page = selectedPage;
  }
}
