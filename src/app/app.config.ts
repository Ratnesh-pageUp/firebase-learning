import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(), // Provide HTTP client for general use
    provideClientHydration(),
    provideFirebaseApp(() => initializeApp({
      "projectId": "fir-learning-63d67",
      "appId": "1:730194163204:web:e3a19b503ca59f08552751",
      "databaseURL": "https://fir-learning-63d67-default-rtdb.asia-southeast1.firebasedatabase.app",
      "storageBucket": "fir-learning-63d67.firebasestorage.app",
      "apiKey": "AIzaSyAO0IwwaNTRKxc3JhAoOaPgvWe91pKs9PQ",
      "authDomain": "fir-learning-63d67.firebaseapp.com",
      "messagingSenderId": "730194163204",
      "measurementId": "G-LM4MX7SJD2"
    })),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
    provideMessaging(() => getMessaging())
  ]
};
