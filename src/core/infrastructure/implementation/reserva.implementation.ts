import { Injectable, inject } from '@angular/core';
import { RequestInterface } from '@infrastructure/base/request.model';
import { CreateHotelPayload} from '@infrastructure/payload/hotel.payload';
import { CreateReservaPayload, SendEmailPayload } from '@infrastructure/payload/reserva.payload';
import { HotelService } from '@infrastructure/service/hotel.service';
import { ReservaService } from '@infrastructure/service/reserva.service';
import { Hotel } from '@models/hotel.model';
import { Reserva } from '@models/reserva.model';
import { ReservaRepository } from '@repositories/reserva/reserva.repository';
import { Observable, of } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ReservaImplementation implements ReservaRepository {

  constructor(
    private reservaService: ReservaService
  ) { }

  createReserva(payload: CreateReservaPayload): Observable<RequestInterface<any>> {
    return this.reservaService.createReserva(payload)
  }

  setRoomIdentifier(id: string, idHotel: string): Observable<boolean> {
    return this.reservaService.setRoomIdentifier(id, idHotel);
  }

  getByDocumentNumberReserva(documentNumber: number): Observable<RequestInterface<Reserva[]>> {
    return this.reservaService.getByDocumentNumberReserva(documentNumber)
  }

  getAllReservas(): Observable<RequestInterface<Reserva[]>> {
    return this.reservaService.getAllReservas()
  }

  sendEmail(payload: SendEmailPayload): Observable<RequestInterface<void>>  {
    return this.reservaService.sendEmail(payload)
  }
}
