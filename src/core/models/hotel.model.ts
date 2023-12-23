export class Hotel{
  public id: string;
  public name: string;
  public description: string;
  constructor(item?: Hotel) {
    this.id = item?.id ?? '';
    this.name = item?.name ?? '';
    this.description = item?.description ?? '';
  }
}
