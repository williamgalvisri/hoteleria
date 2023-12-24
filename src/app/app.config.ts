import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"hoteleria-eab96","appId":"1:8653056439:web:1037de5087ff3482b32032","storageBucket":"hoteleria-eab96.appspot.com","apiKey":"AIzaSyBfLW4vpLppl-NG64MfQmgzchEihXlHtO0","authDomain":"hoteleria-eab96.firebaseapp.com","messagingSenderId":"8653056439"}))), importProvidersFrom(provideFirestore(() => getFirestore()))]
};
