import { Routes } from '@angular/router';
import { AdminPage } from '@pages/admin/admin.page';
import { LoginPage } from '@pages/login/login.page';
import { ReservaPage } from '@pages/reserva/reserva.page';
import { FilterTemplate } from '@shared/components/template/filter/filter.template';
import { HotelTemplate } from '@shared/components/template/hotels/hotel.template';
import { ReservaTemplate } from '@shared/components/template/reserva/reserva.template';
import { ReservasTemplate } from '@shared/components/template/reservas/reservas.template';
import { RoomsTemplate } from '@shared/components/template/rooms/rooms.template';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginPage,
  },
  {
    path: 'reserva',
    component: ReservaPage,
    children:[
      {
        path: 'home',
        component: FilterTemplate
      },
      {
        path: ':id/form',
        component: ReservaTemplate
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
      }
    ]
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
        children: [
          {
            path:':id/reservas',
            component: ReservaTemplate,
            data: { breadcrumbs: [{title: 'Hoteles', path: 'admin/hotels'}, {title: 'Habitaciones', path: 'admin/hotels/[idRoom]'}, {title: 'Reservas', path: ''}] },
          }
        ]
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
