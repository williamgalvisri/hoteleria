export class FormPerson {
  typeDocument: string;
  fullName: string;
  gender: string;
  birthDay: Date;
  documentNumber: string;
  email: string;
  phone: number;

  constructor(item?: FormPerson) {
    this.typeDocument = item?.typeDocument ?? ''
    this.fullName = item?.fullName ?? ''
    this.gender = item?.gender ?? ''
    this.birthDay = item?.birthDay ?? new Date()
    this.documentNumber = item?.documentNumber ?? ''
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
