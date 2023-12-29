import { FormPerson } from "@shared/components/organisms/form-persona/model/form-persona.model";

export interface CreateReservaPayload {
  hotel: string;
  room: string;
  initDate: string;
  endDate: string;
  guests: FormPerson[];
  emergencyFullName: string;
  emergencyPhone: number;
}
