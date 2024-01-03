import { Injectable, inject } from '@angular/core';
import { HotelDto } from '@infrastructure/dto/hotel.dto';
import { HotelMapper } from '@infrastructure/mappers/hotel.mapper';
import { CreateHotelPayload, FiltersHotelPayload, UpdateHotelPayload } from '@infrastructure/payload/hotel.payload';
import { Hotel } from '@models/hotel.model';
import { Observable, catchError, from, map, of, switchMap } from 'rxjs';
import { Firestore, collection, addDoc, getDocs, CollectionReference, FirestoreDataConverter, doc, getDoc, updateDoc, onSnapshot, query, collectionData, Unsubscribe, collectionGroup, where, orderBy} from '@angular/fire/firestore';
import { RequestInterface, StatusResponse } from '@infrastructure/base/request.model';
import { HOTELS, ROOMS } from '@infrastructure/base/collections.const';
import { RoomMapper } from '@infrastructure/mappers/room.mapper';
import { RoomDto } from '@infrastructure/dto/room.dto';
import { Room } from '@models/room.model';

@Injectable({providedIn: 'root'})
export class HotelService {
  firestore: Firestore = inject(Firestore);
  unsubscribeHotelCollection!: Unsubscribe;

  constructor() { }

  listenerHotels$(): Observable<Hotel[]>  {
    const collectionRef = query(collection(this.firestore, HOTELS), orderBy('create_at', 'desc'));
    return new Observable((observable) => {
      this.unsubscribeHotelCollection = onSnapshot(query(collectionRef), (snapshots) => {
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
    const collectionRef = query(collection(this.firestore, HOTELS), orderBy('created_at', 'desc'));
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
      active: !previewState
    });
    return from(method).pipe(
        map<any, RequestInterface<any>>(() => ({ response: {}, status: StatusResponse.SUCCESS})),
        catchError((error) => {
          return of({ response: {}, status: StatusResponse.ERROR }) as Observable<RequestInterface<any>>
        })
    );
  }

  getCityAvailables(): Observable<RequestInterface<string[]>> {
     // Get reference
     const collectionRef = collection(this.firestore, HOTELS);
     return from(getDocs(collectionRef)).pipe(
      map(
        (snapshots) => {
          const docs = snapshots.docs.map(snapshot => HotelMapper.mapFrom({id: snapshot.id, ...snapshot.data() as HotelDto}))
          // unique cities registered
          const cities: string[] = docs.map(x => x.city).filter((value, index, array) => array.indexOf(value) === index);
          return {response: cities, status: StatusResponse.SUCCESS} as RequestInterface<string[]>
        }
      ),
      catchError((error) => {
        return of({ response: {}, status: StatusResponse.ERROR }) as Observable<RequestInterface<string[]>>
      })
    );
  }


  applyFilters(filters: FiltersHotelPayload): Observable<RequestInterface<Hotel[]>> {
    const collectionRef = collection(this.firestore, HOTELS);
    const queryHotel = query(collectionRef, where('city', '==', filters.city), where('active', '==', true));

    return from(getDocs(queryHotel)).pipe(
      switchMap((snapshots) => {
        const docs = snapshots.docs.map(snapshot => ({
          id: snapshot.id,
          rooms: [] as Room[],
          ref: snapshot.ref,
          data: snapshot.data()
        }));

        return from(Promise.all(docs.map(async (doc) => {
          const roomsCollection = collection(doc.ref, ROOMS);
          const roomsQuery = query(roomsCollection, where('number_persona_allow', '<=', Number(filters.numberPersonaAllow)), where('active', '==', true));
          const roomsSnapshots = await getDocs(roomsQuery);
          doc.rooms = roomsSnapshots.docs.map(roomSnapshot => RoomMapper.mapFrom({
            id: roomSnapshot.id,
            ...roomSnapshot.data() as RoomDto
          }));
          return docs; // Return the updated docs array
        })));
      }),
      map((docs) => {
        const mappingHotel = (docs?.[0] ?? []).filter(x => x.rooms.length > 0).map(docHotels => HotelMapper.mapFrom({
          id: docHotels.id,
          rooms: docHotels.rooms,
          ...docHotels.data as HotelDto
        }));
        return { response: mappingHotel, status: StatusResponse.SUCCESS } as RequestInterface<Hotel[]>;
      }),
      catchError((error) => {
        console.error(error)
        return of({ response: {}, status: StatusResponse.ERROR }) as Observable<RequestInterface<Hotel[]>>;
      })
    );
  }



  // ----------------------------- helpers ------------------------
  unsubscribeSnapshot() {
    this.unsubscribeHotelCollection()
  }


}
