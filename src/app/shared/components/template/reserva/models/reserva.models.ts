import { FormPerson } from "@shared/components/organisms/form-persona/model/form-persona.model";

export interface ReservaFormInterface{
  hotel: string;
  room: string;
  guests: FormPerson[];
  emergencyFullName: string;
  emergencyPhone: number;
}

export interface EmailPayload {
  from: string,
  to: string | string[],
  subject: string,
  text?: string,
  html: string
}


export interface ResumenReserva {
  initDate: string;
  endDate: string;
  numberGuest: number;
  hotelName: string;
  locationRoom: string;
  tax: string;
  price: number
}
