import { EventEmitter, Injectable } from '@angular/core';
import { Hotel } from '@models/hotel.model';
import { Room } from '@models/room.model';

@Injectable({providedIn: 'root'})
export class ReservaService {
  public rooms: Room[] = []
  private emmitRoomsResponseByFilters = new EventEmitter<Room[]>();
  private observableRoomsResponseByFilters = this.emmitRoomsResponseByFilters.asObservable();
  constructor() { }


  emmitRooms(rooms: Room[]) {
    this.rooms = rooms;
  }


}
