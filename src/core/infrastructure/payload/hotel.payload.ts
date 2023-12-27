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

export interface FiltersHotelPayload {
  city: string;
  initDate: Date;
  endDate: Date;
  numberPersonaAllow: number;
}
