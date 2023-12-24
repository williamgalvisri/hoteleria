import { Routes } from '@angular/router';
import { AdminPage } from '@pages/admin/admin.page';
import { LoginPage } from '@pages/login/login.page';
import { HotelTemplate } from '@shared/components/template/hotels/hotel.template';
import { ReservasTemplate } from '@shared/components/template/reservas/reservas.template';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginPage,
  },
  {
    path: 'admin',
    component: AdminPage,
    children: [
      {
        path:'hotels',
        component: HotelTemplate
      },
      {
        path:'reservas',
        component: ReservasTemplate
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'hotels'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];
