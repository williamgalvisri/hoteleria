import { Injectable } from "@angular/core";
import { RequestInterface } from "@infrastructure/base/request.model";
import { CreateRoomPayload, UpdateRoomPayload } from "@infrastructure/payload/room.payload";
import { RoomService } from "@infrastructure/service/room.service";
import { Room } from "@models/room.model";
import { RoomRepository } from "@repositories/room/room.repository";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class RoomImplementation implements RoomRepository {
  constructor(private roomService: RoomService) {

  }

  setHotelIdentifier(id: string): Observable<boolean> {
    return this.roomService.setHotelIdentifier(id);
  }

  createRoom(payload: CreateRoomPayload): Observable<RequestInterface<any>> {
    return this.roomService.createRoom(payload)
  }

  getByIdRoom(id: string): Observable<RequestInterface<Room>> {
    return this.roomService.getByIdRoom(id)
  }

  getAllRooms(): Observable<RequestInterface<Room[]>> {
    return this.roomService.getAllRooms()
  }

  activateOrDeactivateRoom(id: string, statePreview: boolean): Observable<RequestInterface<any>> {
    return this.roomService.activateOrDeactivateRoom(id, statePreview)
  }

  updateRoom(payload: UpdateRoomPayload): Observable<RequestInterface<any>> {
    return this.roomService.updateRoom(payload)
  }

  listenerRooms$(): Observable<Room[]> {
    return this.roomService.listenerRooms$();
  }

  unsubscribeSnapshot(): void {
    this.roomService.unsubscribeSnapshot();
  }
}
