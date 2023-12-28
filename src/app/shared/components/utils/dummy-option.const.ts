import { OptionType } from "../atoms/select/model/select.model";
import { TypeRoomEnum } from "../organisms/form-room/model/form-room.model";
export type AllowPersonaNumberOptionType = OptionType & {allowNumberPerson: number};
const TYPE_ROOM_OPTION: AllowPersonaNumberOptionType[] = [
  {
    text: 'Individual',
    value: TypeRoomEnum.INDIVIDUAL,
    allowNumberPerson: 1,
  },
  {
    text: 'Dobles',
    value: TypeRoomEnum.DOUBLE,
    allowNumberPerson: 2,
  },
  {
    text: 'Familiar',
    value: TypeRoomEnum.FAMILLY,
    allowNumberPerson: 4,
  },
  {
    text: 'Bigger',
    value: TypeRoomEnum.BIGGER,
    allowNumberPerson: 5,
  }
];

const TAX_OPTION: OptionType[] = [
  {
    text: 'IVA',
    value: 'iva',
  },
]

const DOCUMENT_TYPE_OPTION: OptionType[] = [
  {
    text: 'Cedula de ciudadania',
    value: 'cc',
  },
  {
    text: 'Pasaporte',
    value: 'passaport',
  },
];

const SEX_OPTION: OptionType[] = [
  {
    text: 'Masculino',
    value: 'M',
  },
  {
    text: 'Femenino',
    value: 'F',
  },
  {
    text: 'Otro',
    value: 'O',
  },
];


export { TYPE_ROOM_OPTION, TAX_OPTION, DOCUMENT_TYPE_OPTION, SEX_OPTION }
