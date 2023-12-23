import { Injectable } from '@angular/core';
import { HotelDto } from '@infrastructure/dto/hotel.dto';
import { HotelMapper } from '@infrastructure/mappers/hotel.mapper';
import { CreateHotelPayload } from '@infrastructure/payload/hotel.payload';
import { Hotel } from '@models/hotel.model';
import { Observable, of } from 'rxjs';

@Injectable({providedIn: 'root'})
export class HotelService {
  constructor() { }

  createHotel(payload: CreateHotelPayload): Observable<void> {
    const dto = HotelMapper.mapTo(payload);
    console.log('guardado', dto)
    return of()
  }

  getByIdHotel(id: string): Observable<Hotel> {
    const response = {} as HotelDto;
    return of(HotelMapper.mapFrom(response))
  }

  getAllHotels(): Observable<Hotel[]> {
    const response = [] as HotelDto[];
    return of(response.map(HotelMapper.mapFrom))
  }
  activateOrDeactivateHotel(id: string): Observable<void> {
    console.log('deactivate or activate', id)
    return of()
  }
}
