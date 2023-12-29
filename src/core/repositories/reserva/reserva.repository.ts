import { Observable } from "rxjs";
import { RequestInterface } from "@infrastructure/base/request.model";
import { Reserva } from "@models/reserva.model";
import { CreateReservaPayload } from "@infrastructure/payload/reserva.payload";

export abstract class ReservaRepository{
  abstract createReserva(payload: CreateReservaPayload): Observable<RequestInterface<any>>;
  abstract getByDocumentNumberReserva(documentNumber: number): Observable<RequestInterface<Reserva[]>>;
}
