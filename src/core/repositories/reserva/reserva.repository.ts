import { Observable } from "rxjs";
import { RequestInterface } from "@infrastructure/base/request.model";
import { Reserva } from "@models/reserva.model";
import { CreateReservaPayload } from "@infrastructure/payload/reserva.payload";

export abstract class ReservaRepository{
  abstract setRoomIdentifier(id: string, idHotel: string): Observable<boolean>;
  abstract createReserva(payload: CreateReservaPayload): Observable<RequestInterface<any>>;
  abstract getByDocumentNumberReserva(documentNumber: number): Observable<RequestInterface<Reserva[]>>;
  abstract getAllReservas(): Observable<RequestInterface<Reserva[]>>;
}
