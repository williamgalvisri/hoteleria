import { Unsubscribe } from "@angular/fire/firestore";

export interface RequestInterface<T> {
  response: T,
  status: StatusResponse.SUCCESS | StatusResponse.ERROR,
  unsubscribe?: Unsubscribe
}

export enum StatusResponse {
  SUCCESS = 'success',
  ERROR = 'error'
}
