export interface FormRoomInterface {
  roomType: string;
  cost: number;
  tax: string;
  location: string;
}


export enum TypeRoomEnum {
  INDIVIDUAL = 'individual',
  DOUBLE = 'double',
  FAMILLY = 'familly',
  BIGGER = 'bigger',
}
