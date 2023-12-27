import { Room } from "@models/room.model";

export interface HotelDto {
  id?: string;
  name: string;
  description: string;
  city: string;
  active: boolean;
  rooms?: Room[]
}
