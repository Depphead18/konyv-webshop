import { Routes } from '@angular/router';
import { authGuard, publicGuard } from './shared/guards/auth.guard';


export const routes: Routes = [
    {
        path: 'home',
        title: 'Főoldal',
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
    },
    {
        path: 'tbr',
        title: 'TBR Lista',
        loadComponent: () => import('./pages/tasks/tbr.component').then(m => m.TBRComponent),
        canActivate: [authGuard]
    },
    {
        path: 'profile',
        title: 'Profil',
        loadComponent: () => import('./pages/profile/profile.component').then(m => m.ProfileComponent),
        canActivate: [authGuard]
    },
    {
        path: 'registrate',
        title: 'Regisztráció',
        loadComponent: () => import('./pages/registrate/registrate.component').then(m => m.RegistrateComponent),
    },
    {
        path: 'konyvlista',
        title: 'Könyveink',
        loadComponent: () => import('./pages/konyvlista/konyvlista.component').then(m => m.KonyvlistaComponent),
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
    },
    {
        path: 'kosar',
        title: 'Kosár',
        loadComponent: () => import('./pages/kosar/kosar.component').then(m => m.KosarComponent),
        canActivate: [authGuard]
    },
    {
        path: 'konyv/:id',
        loadComponent: () => import('./pages/konyvreszletek/konyvreszletek.component').then(m => m.KonyvReszletekComponent)
    },
    { 
        path: 'konyv/szerkesztes/:id', 
        loadComponent: () => import('./pages/konyvszerkesztes/konyvszerkesztes.component').then(m => m.KonyvSzerkesztesComponent)
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: '**',
        loadComponent: () => import('./shared/page-not-found/page-not-found.component').then(m => m.PageNotFoundComponent)
    },
];