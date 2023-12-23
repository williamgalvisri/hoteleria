import { Routes } from '@angular/router';
import { LoginPage } from '@pages/login/login.page';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginPage,
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];
