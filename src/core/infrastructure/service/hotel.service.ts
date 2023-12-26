import { Injectable, inject } from '@angular/core';
import { HotelDto } from '@infrastructure/dto/hotel.dto';
import { HotelMapper } from '@infrastructure/mappers/hotel.mapper';
import { CreateHotelPayload, UpdateHotelPayload } from '@infrastructure/payload/hotel.payload';
import { Hotel } from '@models/hotel.model';
import { Observable, catchError, from, map, of } from 'rxjs';
import { Firestore, collection, addDoc, getDocs, CollectionReference, FirestoreDataConverter, doc, getDoc, updateDoc, onSnapshot, query, collectionData, Unsubscribe} from '@angular/fire/firestore';
import { RequestInterface, StatusResponse } from '@infrastructure/base/request.model';
import { HOTELS } from '@infrastructure/base/collections.const';

@Injectable({providedIn: 'root'})
export class HotelService {
  firestore: Firestore = inject(Firestore);
  unsubscribeHotelCollection!: Unsubscribe;

  constructor() { }

  listenerHotels$(): Observable<Hotel[]>  {
    const collectionRef = collection(this.firestore, HOTELS);
    return new Observable((observable) => {
      this.unsubscribeHotelCollection = onSnapshot(query(collectionRef), (snapshots, ) => {
        const docs = snapshots.docs.map(snapshot => HotelMapper.mapFrom({id: snapshot.id, ...snapshot.data() as HotelDto}))
        observable.next(docs)
      })
    })
  }


  createHotel(payload: CreateHotelPayload): Observable<RequestInterface<any>> {
    const dto = HotelMapper.mapTo(payload);
    return from(addDoc(collection(this.firestore, HOTELS), dto))
      .pipe(
        map<any, RequestInterface<any>>(() => ({ response: {}, status: StatusResponse.SUCCESS})),
        catchError((error) => {
          return of({ response: {}, status: 'error' }) as Observable<RequestInterface<any>>
        })
      )
  }

  getByIdHotel(id: string): Observable<RequestInterface<Hotel>> {
    // Get reference
    const collectionRef = doc(this.firestore, HOTELS, id);
    // mapping response
    return from(getDoc(collectionRef)).pipe(
      map(
        (snapshot) => {
          const mapFromfirebase = HotelMapper.mapFrom(
            ({
              id: snapshot.id,
              ...snapshot.data()
            }) as HotelDto
          )
          return {response: mapFromfirebase, status: StatusResponse.SUCCESS} as RequestInterface<Hotel>
        }
      ),
      catchError((error) => {
        return of({ status: 'error' }) as Observable<RequestInterface<Hotel>>
      })
    );
  }



  getAllHotels(): Observable<RequestInterface<Hotel[]>> {
    // Get reference
    const collectionRef = collection(this.firestore, HOTELS);
    // mapping response
    return from(getDocs(collectionRef)).pipe(
      map(
        (snapshots) => {
          const docs = snapshots.docs.map(snapshot => HotelMapper.mapFrom({id: snapshot.id, ...snapshot.data() as HotelDto}))
          return {response: docs, status: StatusResponse.SUCCESS} as RequestInterface<Hotel[]>
        }
      ),
      catchError((error) => {
        return of({ response: {}, status: StatusResponse.ERROR }) as Observable<RequestInterface<Hotel[]>>
      })
    );
  }

  updateHotel(payload: UpdateHotelPayload): Observable<RequestInterface<any>> {
    const collectionRef = doc(this.firestore, HOTELS, payload.id);
    const dto = HotelMapper.mapToUpdate(payload);
    const method = updateDoc(collectionRef, dto);

    return from(method).pipe(
      map<any, RequestInterface<any>>(() => ({ response: {}, status: StatusResponse.SUCCESS})),
      catchError((error) => {
        return of({ response: {}, status: StatusResponse.ERROR }) as Observable<RequestInterface<any>>
      })
    )
  }

  activateOrDeactivateHotel(id: string, previewState: boolean): Observable<RequestInterface<any>> {
    // Get reference
    const collectionRef = doc(this.firestore, HOTELS, id);
    const method = updateDoc(collectionRef, {
      activate: !previewState
    });
    return from(method).pipe(
        map<any, RequestInterface<any>>(() => ({ response: {}, status: StatusResponse.SUCCESS})),
        catchError((error) => {
          return of({ response: {}, status: StatusResponse.ERROR }) as Observable<RequestInterface<any>>
        })
    );
  }


  // ----------------------------- helpers ----------------------
  unsubscribeSnapshot() {
    this.unsubscribeHotelCollection()
  }


}
