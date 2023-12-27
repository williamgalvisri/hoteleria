import { Room } from "./room.model";

export class Hotel{
  public id: string;
  public name: string;
  public description: string;
  public city: string;
  public active: boolean;
  public rooms?: Room[];
  constructor(item?: Hotel) {
    this.id = item?.id ?? '';
    this.name = item?.name ?? '';
    this.description = item?.description ?? '';
    this.city = item?.city ?? '';
    this.active = item?.active ?? false;
    this.rooms = item?.rooms ?? [];
  }
}
