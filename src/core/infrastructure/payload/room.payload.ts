export interface CreateRoomPayload {
  cost: number;
  roomType: string;
  tax: string;
  location: string;
  numberPersonaAllow: number;
}

export interface UpdateRoomPayload {
  id: string;
  cost: number;
  roomType: string;
  tax: string;
  location: string;
  numberPersonaAllow: number;
}
