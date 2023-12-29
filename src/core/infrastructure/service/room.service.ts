import { Injectable, inject } from '@angular/core';
import { Observable, catchError, from, map, of, tap } from 'rxjs';
import { Firestore, collection, addDoc, getDocs, doc, getDoc, updateDoc, onSnapshot, query, Unsubscribe} from '@angular/fire/firestore';
import { RequestInterface, StatusResponse } from '@infrastructure/base/request.model';
import { HOTELS, ROOMS } from '@infrastructure/base/collections.const';
import { CreateRoomPayload, UpdateRoomPayload } from '@infrastructure/payload/room.payload';
import { Room } from '@models/room.model';
import { RoomMapper } from '@infrastructure/mappers/room.mapper';
import { RoomDto } from '@infrastructure/dto/room.dto';

@Injectable({providedIn: 'root'})
export class RoomService {
  private idHotel: string = '';
  firestore: Firestore = inject(Firestore);
  unsubscribeRoomCollection!: Unsubscribe;

  constructor() { }

  setHotelIdentifier(id: string): Observable<boolean> {
    return from(getDoc(doc(this.firestore, HOTELS, id))).pipe(map((snapshot) => {
      if(snapshot.exists()) {
        this.idHotel = id;
      }
      return snapshot.exists()
    }));
  }

  getPathRoom() {
    return `${HOTELS}/${this.idHotel}/${ROOMS}`
  }

  listenerRooms$(): Observable<Room[]>  {
    const collectionRef = collection(this.firestore, this.getPathRoom());
    return new Observable((observable) => {
      this.unsubscribeRoomCollection = onSnapshot(query(collectionRef), (snapshots, ) => {
        const docs = snapshots.docs.map(snapshot => RoomMapper.mapFrom({id: snapshot.id, ...snapshot.data() as RoomDto}))
        observable.next(docs)
      })
    })
  }


  createRoom(payload: CreateRoomPayload): Observable<RequestInterface<any>> {
    const dto = RoomMapper.mapTo(payload);
    // Set the number of people possible by the type of rooms before to create

    return from(addDoc(collection(this.firestore, this.getPathRoom()), dto))
      .pipe(
        map<any, RequestInterface<any>>(() => ({ response: {}, status: StatusResponse.SUCCESS})),
        catchError((error) => {
          return of({ response: {}, status: 'error' }) as Observable<RequestInterface<any>>
        })
      )
  }

  getByIdRoom(id: string): Observable<RequestInterface<Room>> {
    // Get reference
    const collectionRef = doc(this.firestore, this.getPathRoom(), id);
    // mapping response
    return from(getDoc(collectionRef)).pipe(
      map(
        (snapshot) => {
          const mapFromfirebase = RoomMapper.mapFrom(
            ({
              id: snapshot.id,
              ...snapshot.data()
            }) as RoomDto
          )
          return {response: mapFromfirebase, status: StatusResponse.SUCCESS} as RequestInterface<Room>
        }
      ),
      catchError((error) => {
        return of({ status: 'error' }) as Observable<RequestInterface<Room>>
      })
    );
  }



  getAllRooms(): Observable<RequestInterface<Room[]>> {
    // Get reference
    const collectionRef = collection(this.firestore, this.getPathRoom());
    // mapping response
    return from(getDocs(collectionRef)).pipe(
      map(
        (snapshots) => {
          const docs = snapshots.docs.map(snapshot => RoomMapper.mapFrom({id: snapshot.id, ...snapshot.data() as RoomDto}))
          return {response: docs, status: StatusResponse.SUCCESS} as RequestInterface<Room[]>
        }
      ),
      catchError((error) => {
        return of({ response: {}, status: StatusResponse.ERROR }) as Observable<RequestInterface<Room[]>>
      })
    );
  }

  updateRoom(payload: UpdateRoomPayload): Observable<RequestInterface<any>> {
    const collectionRef = doc(this.firestore, this.getPathRoom(), payload.id);
    const dto = RoomMapper.mapToUpdate(payload);
    const method = updateDoc(collectionRef, dto);

    return from(method).pipe(
      map<any, RequestInterface<any>>(() => ({ response: {}, status: StatusResponse.SUCCESS})),
      catchError((error) => {
        return of({ response: {}, status: StatusResponse.ERROR }) as Observable<RequestInterface<any>>
      })
    )
  }

  activateOrDeactivateRoom(id: string, previewState: boolean): Observable<RequestInterface<any>> {
    // Get reference
    const collectionRef = doc(this.firestore, this.getPathRoom(), id);
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

  // ----------------------------- helpers ----------------------
  unsubscribeSnapshot() {
    if(this.unsubscribeRoomCollection) {
      this.unsubscribeRoomCollection()
    }
  }

}
