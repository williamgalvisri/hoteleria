import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideHttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

const firebaseConfig = {
  projectId: environment.projectId,
  appId: environment.appId,
  storageBucket: environment.storageBucket,
  apiKey: environment.apiKey,
  authDomain: environment.authDomain,
  messagingSenderId: environment.messagingSenderId,
}
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(provideFirebaseApp(() => initializeApp(firebaseConfig))), importProvidersFrom(provideFirestore(() => getFirestore()))]
};
