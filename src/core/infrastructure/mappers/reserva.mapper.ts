import { PersonDto, ReservaDto } from "@infrastructure/dto/reserva.dto";
import { RoomDto } from "@infrastructure/dto/room.dto";
import { CreateReservaPayload } from "@infrastructure/payload/reserva.payload";
import { CreateRoomPayload, UpdateRoomPayload } from "@infrastructure/payload/room.payload";
import { Person, Reserva } from "@models/reserva.model";
import { Room } from "@models/room.model";
import { HotelMapper } from "./hotel.mapper";
import { HotelDto } from "@infrastructure/dto/hotel.dto";
import { RoomMapper } from "./room.mapper";

export class ReservaMapper {

  static mapFrom(param: ReservaDto): Reserva {
    return new Reserva({
      id: param.id ?? '',
      hotel: param.hotel,
      room: param.room,
      initDate: param.init_date,
      endDate: param.end_date,
      guests: param.guests.map(guest => new Person({
        typeDocument: guest.type_document,
        fullName: guest.full_name,
        gender: guest.gender,
        birthDay: guest.birthDay,
        documentNumber: guest.document_number,
        email: guest.email,
        phone: guest.phone,
      })),
      emergencyFullName: param.emergency_full_name,
      emergencyPhone: param.emergency_phone,
      hotelDocument: HotelMapper.mapFrom({...param.hotel_document} as HotelDto),
      roomDocument: RoomMapper.mapFrom({...param.room_document} as RoomDto)
    })
  }

  static mapTo(param: CreateReservaPayload): ReservaDto {
    return {
      hotel: param.hotel,
      room: param.room,
      init_date: param.initDate,
      end_date: param.endDate,
      document_number_array: param.guests.map(guest => String(guest.documentNumber)),
      guests: param.guests.map((guest) => ({
        type_document: guest.typeDocument,
        full_name: guest.fullName,
        gender: guest.gender,
        birthDay: guest.birthDay,
        document_number: guest.documentNumber,
        email: guest.email,
        phone: guest.phone
      })) as PersonDto[],
      emergency_full_name: param.emergencyFullName,
      emergency_phone: param.emergencyPhone
    }
  }
}
