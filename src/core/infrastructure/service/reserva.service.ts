import { Injectable, inject } from '@angular/core';
import { Observable, catchError, from, map, of, switchMap, tap } from 'rxjs';
import { Firestore, collection, addDoc, getDocs, doc, getDoc, updateDoc, onSnapshot, query, Unsubscribe, where} from '@angular/fire/firestore';
import { RequestInterface, StatusResponse } from '@infrastructure/base/request.model';
import { HOTELS, RESERVA, ROOMS } from '@infrastructure/base/collections.const';
import { Reserva } from '@models/reserva.model';
import { CreateReservaPayload } from '@infrastructure/payload/reserva.payload';
import { ReservaMapper } from '@infrastructure/mappers/reserva.mapper';
import { ReservaDto } from '@infrastructure/dto/reserva.dto';
import { HotelDto } from '@infrastructure/dto/hotel.dto';
import { RoomDto } from '@infrastructure/dto/room.dto';

@Injectable({providedIn: 'root'})
export class ReservaService {
  private idHotel: string = '';
  firestore: Firestore = inject(Firestore);

  constructor() { }

  getPathRoom(idHotel: string) {
    return `${HOTELS}/${idHotel}/${ROOMS}`
  }


  createReserva(payload: CreateReservaPayload): Observable<RequestInterface<any>> {
    const dto = ReservaMapper.mapTo(payload);
    // Set the number of people possible by the type of rooms before to create

    return from(addDoc(collection(this.firestore, RESERVA), dto))
      .pipe(
        map<any, RequestInterface<any>>(() => ({ response: {}, status: StatusResponse.SUCCESS})),
        catchError((error) => {
          return of({ response: {}, status: 'error' }) as Observable<RequestInterface<any>>
        })
      )
  }

  getByDocumentNumberReserva(documentNumber: number): Observable<RequestInterface<Reserva[]>> {
    // Get reference
    const collectionRef = collection(this.firestore, RESERVA)
    const queryReserva = query(collectionRef, where('document_number_array', 'array-contains', documentNumber));

    // mapping response
    return from(getDocs(queryReserva)).pipe(
      switchMap(
        (snapshots) => {
          const docs =  from(Promise.all(snapshots.docs.map(async snapshot => {
            const dataReserva = {...snapshot.data()} as ReservaDto;
            const collectionHotelRef = doc(this.firestore, HOTELS, dataReserva.hotel);
            const collectionRoomRef = doc(this.firestore, this.getPathRoom(dataReserva.hotel), dataReserva.room);

            const hotelSnapshot = await getDoc(collectionHotelRef);
            const roomSnapshot = await getDoc(collectionRoomRef);

            const hotelDoc = {id: hotelSnapshot.id, ...hotelSnapshot.data()} as HotelDto;
            const roomDoc = {id: roomSnapshot.id, ...roomSnapshot.data()} as RoomDto;
            return ReservaMapper.mapFrom({
              id: snapshot.id,
              ...snapshot.data(),
              hotel_document: hotelDoc,
              room_document: roomDoc,
            } as ReservaDto)
          })))
          return docs;
        }
      ),
      map(doc => {
        return { response: doc, status: StatusResponse.SUCCESS } as RequestInterface<Reserva[]>
      }),
      catchError((error) => {
        return of({ status: 'error' }) as Observable<RequestInterface<Reserva[]>>
      })
    );
  }
}
function form(arg0: Promise<Reserva>[]) {
  throw new Error('Function not implemented.');
}

