export interface CreateHotelPayload {
  name: string;
  description: string;
  city: string;
}


export interface UpdateHotelPayload {
  id: string;
  name: string;
  description: string;
  city: string;
}
