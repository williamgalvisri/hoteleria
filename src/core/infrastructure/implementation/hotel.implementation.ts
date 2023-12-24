import { Injectable, inject } from '@angular/core';
import { RequestInterface } from '@infrastructure/base/request.model';
import { CreateHotelPayload } from '@infrastructure/payload/hotel.payload';
import { HotelService } from '@infrastructure/service/hotel.service';
import { Hotel } from '@models/hotel.model';
import { HotelRepository } from '@repositories/hotel/hotel.repository';
import { Observable, of } from 'rxjs';



@Injectable({providedIn: 'root'})
export class HotelImplementation implements HotelRepository {

  constructor(
    private hotelService: HotelService
  ) { }

  createHotel(payload: CreateHotelPayload): Observable<RequestInterface<any>> {
    return this.hotelService.createHotel(payload)
  }

  getByIdHotel(id: string): Observable<RequestInterface<Hotel>> {
    return this.hotelService.getByIdHotel(id)
  }

  getAllHotels(): Observable<RequestInterface<Hotel[]>> {
    return this.hotelService.getAllHotels()
  }

  activateOrDeactivateHotel(id: string): Observable<RequestInterface<any>> {
    return this.hotelService.activateOrDeactivateHotel(id)
  }
}
