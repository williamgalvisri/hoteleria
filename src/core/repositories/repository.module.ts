import { NgModule } from '@angular/core';
import { HotelRepository } from './hotel/hotel.repository';
import { HotelImplementation } from '@infrastructure/implementation/hotel.implementation';
import { RoomRepository } from './room/room.repository';
import { RoomImplementation } from '@infrastructure/implementation/room.implementation';
import { ReservaRepository } from './reserva/reserva.repository';
import { ReservaImplementation } from '@infrastructure/implementation/reserva.implementation';

@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    {
      provide: HotelRepository,
      useClass: HotelImplementation
    },
    {
      provide: RoomRepository,
      useClass: RoomImplementation
    },
    {
      provide: ReservaRepository,
      useClass: ReservaImplementation
    },
  ],
})
export class RepositoryModule { }
