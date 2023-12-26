import { RoomDto } from "@infrastructure/dto/room.dto";
import { CreateRoomPayload, UpdateRoomPayload } from "@infrastructure/payload/room.payload";
import { Room } from "@models/room.model";

export class RoomMapper {

  static mapFrom(param: RoomDto): Room {
    return new Room({
      id: param?.id ?? '',
      cost: param.cost,
      roomType: param.room_type,
      tax: param.tax,
      active: param.active,
    })
  }

  static mapTo(param: CreateRoomPayload): RoomDto {
    return {
      room_type: param.roomType,
      cost: param.cost,
      tax: param.tax,
      active: true
    }
  }

  static mapToUpdate(param: UpdateRoomPayload): Omit<RoomDto, 'active'> {
    return {
      id: param.id,
      room_type: param.roomType,
      cost: param.cost,
      tax: param.tax,
    }
  }
}
