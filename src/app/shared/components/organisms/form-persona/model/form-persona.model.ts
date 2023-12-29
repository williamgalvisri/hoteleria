export class FormPerson {
  typeDocument: string;
  fullName: string;
  gender: string;
  birthDay: string;
  documentNumber: number;
  email: string;
  phone: number;

  constructor(item?: FormPerson) {
    this.typeDocument = item?.typeDocument ?? ''
    this.fullName = item?.fullName ?? ''
    this.gender = item?.gender ?? ''
    this.birthDay = item?.birthDay ?? ''
    this.documentNumber = item?.documentNumber ?? 0
    this.email = item?.email ?? ''
    this.phone = item?.phone ?? 0
  }
}


export enum TypeRoomEnum {
  INDIVIDUAL = 'individual',
  DOUBLE = 'double',
  FAMILLY = 'familly',
  BIGGER = 'bigger',
}


export type EmmitDataPersonaAction = {data: FormPerson, action: 'create' | 'edit'}
