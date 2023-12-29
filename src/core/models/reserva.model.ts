import { Hotel } from "./hotel.model";
import { Room } from "./room.model";

export class Person {
  typeDocument: string;
  fullName: string;
  gender: string;
  birthDay: string;
  documentNumber: number;
  email: string;
  phone: number;
  constructor(item?: Person) {
    this.typeDocument = item?.typeDocument ?? '';
    this.fullName = item?.fullName ?? '';
    this.gender = item?.gender ?? '';
    this.birthDay = item?.birthDay ?? '';
    this.documentNumber = item?.documentNumber ?? 0;
    this.email = item?.email ?? '';
    this.phone = item?.phone ?? 0;
  }
}
export class Reserva{
  public id: string;
  public hotel: string;
  public room: string;
  public guests: Array<Person>;
  public emergencyFullName: string;
  public emergencyPhone: number;
  public hotelDocument?: Hotel;
  public roomDocument?: Room;
  public endDate: string;
  public initDate: string;
  constructor(item?: Reserva) {
    this.id = item?.id ?? ''
    this.hotel = item?.hotel ?? ''
    this.room = item?.room ?? ''
    this.guests = item?.guests ?? [];
    this.emergencyFullName = item?.emergencyFullName ?? '';
    this.emergencyPhone = item?.emergencyPhone ?? 0;
    this.hotelDocument = item?.hotelDocument ?? new Hotel();
    this.roomDocument = item?.roomDocument ?? new Room();
    this.endDate = item?.endDate ?? '';
    this.initDate = item?.initDate ?? '';
  }
}
