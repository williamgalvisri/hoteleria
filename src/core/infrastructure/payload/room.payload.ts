export interface CreateRoomPayload {
  idHotel: string,
  cost: number;
  roomType: string;
  tax: string;
  active: boolean;
}

export interface UpdateRoomPayload {
  idHotel: string
  id: string;
  cost: number;
  roomType: string;
  tax: string;
  active: boolean;
}
