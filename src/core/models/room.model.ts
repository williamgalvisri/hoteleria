export class Room {
  id?: string;
  cost: number;
  roomType: string;
  tax: string;
  active: boolean;

  constructor(item?: Room) {
    this.id = item?.id ?? '';
    this.cost = item?.cost ?? 0;
    this.roomType = item?.roomType ?? '';
    this.tax = item?.tax ?? '';
    this.active = item?.active ?? false;
  }
}
