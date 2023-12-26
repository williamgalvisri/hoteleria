import { RequestInterface } from "@infrastructure/base/request.model";
import { CreateRoomPayload, UpdateRoomPayload } from "@infrastructure/payload/room.payload";
import { Room } from "@models/room.model";
import { Observable } from "rxjs";

export abstract class RoomRepository {
  abstract setHotelIdentifier(id: string): Observable<boolean>;
  abstract createRoom(payload: CreateRoomPayload): Observable<RequestInterface<any>>;
  abstract updateRoom(payload: UpdateRoomPayload): Observable<RequestInterface<any>>
  abstract getByIdRoom(id: string): Observable<RequestInterface<Room>>;
  abstract getAllRooms(id: string): Observable<RequestInterface<Room[]>>;
  abstract activateOrDeactivateRoom(id: string, previewState: boolean): Observable<RequestInterface<any>>;
  abstract listenerRooms$(): Observable<Room[]>;
  abstract unsubscribeSnapshot(): void;
}
