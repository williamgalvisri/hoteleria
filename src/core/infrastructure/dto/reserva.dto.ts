import { HotelDto } from "./hotel.dto";
import { RoomDto } from "./room.dto";

export interface PersonDto {
  type_document: string;
  full_name: string;
  gender: string;
  birthDay: string;
  document_number: number;
  email: string;
  phone: number;
}

export interface ReservaDto{
  id?: string;
  init_date: string;
  end_date: string;
  hotel: string;
  room: string;
  document_number_array: Array<string>;
  guests: Array<PersonDto>;
  emergency_full_name: string;
  emergency_phone: number;
  hotel_document?: HotelDto;
  room_document?: RoomDto;
}
