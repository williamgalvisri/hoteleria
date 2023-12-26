import { Routes } from '@angular/router';
import { AdminPage } from '@pages/admin/admin.page';
import { LoginPage } from '@pages/login/login.page';
import { HotelTemplate } from '@shared/components/template/hotels/hotel.template';
import { ReservasTemplate } from '@shared/components/template/reservas/reservas.template';
import { RoomsTemplate } from '@shared/components/template/rooms/rooms.template';

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
        component: HotelTemplate,
        data: { breadcrumbs: [{title: 'Hoteles', path: ''}] },
      },
      {
        path:'hotels/:id',
        component: RoomsTemplate,
        data: { breadcrumbs: [{title: 'Hoteles', path: 'admin/hotels'}, {title: 'Habitaciones', path: ''}] },
      },
      {
        path:'reservas',
        component: ReservasTemplate,
        data: { breadcrumbs: [{title: 'Reservas', path: ''}] }
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
