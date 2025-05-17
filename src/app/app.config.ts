import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({ projectId: "konyvshop-9740d", appId: "1:516471047917:web:09a457f13245fb278eeee4", storageBucket: "konyvshop-9740d.firebasestorage.app", apiKey: "AIzaSyBQtxxGm44jRYKg4O0Vk7H_AomO79knYc4", authDomain: "konyvshop-9740d.firebaseapp.com", messagingSenderId: "516471047917" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideFirebaseApp(() => initializeApp({ projectId: "konyvshop-9740d", appId: "1:516471047917:web:09a457f13245fb278eeee4", storageBucket: "konyvshop-9740d.firebasestorage.app", apiKey: "AIzaSyBQtxxGm44jRYKg4O0Vk7H_AomO79knYc4", authDomain: "konyvshop-9740d.firebaseapp.com", messagingSenderId: "516471047917" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
};