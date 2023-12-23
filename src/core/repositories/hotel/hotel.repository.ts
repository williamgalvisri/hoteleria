import { Observable } from "rxjs";
import { Hotel } from "@models/hotel.model";
import { CreateHotelPayload } from "@infrastructure/payload/hotel.payload"

export abstract class HotelRepository{
  abstract createHotel(payload: CreateHotelPayload): Observable<void>;
  abstract getByIdHotel(id: string): Observable<Hotel>;
  abstract getAllHotels(): Observable<Hotel[]>;
  abstract activateOrDeactivateHotel(id: string): Observable<void>;
}
