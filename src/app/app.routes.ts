import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component'
import { RegistrateComponent } from './pages/registrate/registrate.component';
import { KonyvlistaComponent } from './pages/konyvlista/konyvlista.component';
import { KonyvreszletekComponent } from './pages/konyvreszletek/konyvreszletek.component';
import { LoginComponent } from './pages/login/login.component';
import { KosarComponent } from './pages/kosar/kosar.component';
import { TBRComponent } from "./pages/tasks/tbr.component";

export const routes: Routes = [
    // Statikus elérési útvonalak
    { path: 'home', title: 'Főoldal', component: HomeComponent },

    { path: 'tbr', title: 'TBR Lista', component: TBRComponent },

    { path: 'profile', title: 'Profil', component: ProfileComponent, },

    { path: 'registrate', title: 'Regisztráció', component: RegistrateComponent },

    { path: 'konyvlista', title: 'Könyveink', component: KonyvlistaComponent },

    { path: 'konyvreszletek', title: 'Részletek', component: KonyvreszletekComponent },

    { path: 'login', title: 'Bejelentkezés', component: LoginComponent },

    { path: 'kosar', title: 'Kosár', component: KosarComponent },

    { path: '**', title: 'Page-Not-Found', component: PageNotFoundComponent }, //ha egyik útvonal sem egyezik

    // Paraméterezett útvonalak
    // { path: 'task-edit/:id', component: TaskEditComponent },

    // Üres elérési út - alapértelmezett útvonal
    { path: '', redirectTo: 'home', pathMatch: 'full' },

    
];