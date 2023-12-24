import { Observable } from "rxjs";
import { Hotel } from "@models/hotel.model";
import { CreateHotelPayload } from "@infrastructure/payload/hotel.payload"
import { RequestInterface } from "@infrastructure/base/request.model";

export abstract class HotelRepository{
  abstract createHotel(payload: CreateHotelPayload): Observable<RequestInterface<any>>;
  abstract getByIdHotel(id: string): Observable<RequestInterface<Hotel>>;
  abstract getAllHotels(): Observable<RequestInterface<Hotel[]>>;
  abstract activateOrDeactivateHotel(id: string): Observable<RequestInterface<any>>;
}
