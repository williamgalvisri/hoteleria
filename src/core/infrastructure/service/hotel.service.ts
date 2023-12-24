import { Injectable, inject } from '@angular/core';
import { HotelDto } from '@infrastructure/dto/hotel.dto';
import { HotelMapper } from '@infrastructure/mappers/hotel.mapper';
import { CreateHotelPayload } from '@infrastructure/payload/hotel.payload';
import { Hotel } from '@models/hotel.model';
import { Observable, catchError, from, map, of } from 'rxjs';
import { Firestore, collection, addDoc, getDocs, CollectionReference, FirestoreDataConverter, doc, getDoc} from '@angular/fire/firestore';
import { RequestInterface } from '@infrastructure/base/request.model';
import { HOTELS } from '@infrastructure/base/collections.const';

@Injectable({providedIn: 'root'})
export class HotelService {
  firestore: Firestore = inject(Firestore);
  private collectionConverter: FirestoreDataConverter<any, Hotel> = {
    toFirestore(data) {
      return data
    },
    fromFirestore(snapshot, option) {
      console.log(snapshot);
      const data = {id: snapshot.id, ...snapshot.data(option)} as HotelDto;
      return data;
    }
  };

  constructor() { }

  createHotel(payload: CreateHotelPayload): Observable<RequestInterface<any>> {
    const dto = HotelMapper.mapTo(payload);
    const response = from(addDoc(collection(this.firestore, HOTELS), dto))
      .pipe(map<any, RequestInterface<any>>(() => ({status: 'sucess'})))
    return response
  }

  getByIdHotel(id: string): Observable<RequestInterface<Hotel>> {
    console.log(id)
    // Get reference
    const collectionRef = doc(this.firestore, HOTELS, id);
    // mapping response
    const response = from(getDoc(collectionRef)).pipe(
      map(
        (snapshot) => {
          console.log(snapshot)
          const mapFromfirebase = HotelMapper.mapFrom(
            ({
              id: snapshot.id,
              ...snapshot.data()
            }) as HotelDto
          )
          return {response: mapFromfirebase, status: 'sucess'} as RequestInterface<Hotel>
        }
      ),
      catchError((error) => {
        return of({ status: 'error' }) as Observable<RequestInterface<Hotel>>
      })
    );
    return response;
  }

  getAllHotels(): Observable<RequestInterface<Hotel[]>> {
    // Get reference
    const collectionRef = collection(this.firestore, HOTELS);

     // mapping response
     const response = from(getDocs(collectionRef)).pipe(
      map(
        (snapshots) => {
          const docs = snapshots.docs.map(snapshot => HotelMapper.mapFrom({id: snapshot.id, ...snapshot.data() as HotelDto}))
          return {response: docs, status: 'sucess'} as RequestInterface<Hotel[]>
        }
      ),
      catchError((error) => {
        return of({ status: 'error' }) as Observable<RequestInterface<Hotel[]>>
      })
    );

    // const response = [] as HotelDto[];
    return response
  }
  activateOrDeactivateHotel(id: string): Observable<RequestInterface<any>> {
    console.log('deactivate or activate', id)
    return of({
      status: 'sucess'
    })
  }
}
