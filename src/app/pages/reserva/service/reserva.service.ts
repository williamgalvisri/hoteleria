import { EventEmitter, Injectable } from '@angular/core';
import { Hotel } from '@models/hotel.model';
import { Room } from '@models/room.model';

@Injectable({providedIn: 'root'})
export class ReservaService {
  public rooms: Room[] = [];
  public hotel: Hotel = new Hotel();
  public dateReserva!: {initDate: string, endDate: string};
  constructor() { }


  emmitRooms(rooms: Room[]) {
    this.rooms = rooms;
  }

  emmitHotel(hotel: Hotel) {
    this.hotel = hotel;
  }

  emmitDates(initDate: string, endDate: string) {
    this.dateReserva = {
      initDate,
      endDate,
    }
  }


}
