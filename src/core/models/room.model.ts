export class Room {
  id: string;
  cost: number;
  roomType: string;
  location: string;
  numberPersonaAllow: number;
  tax: string;
  active: boolean;

  constructor(item?: Room) {
    this.id = item?.id ?? '';
    this.cost = item?.cost ?? 0;
    this.roomType = item?.roomType ?? '';
    this.location = item?.location ?? '';
    this.numberPersonaAllow = item?.numberPersonaAllow ?? 0;
    this.tax = item?.tax ?? '';
    this.active = item?.active ?? false;
  }
}
