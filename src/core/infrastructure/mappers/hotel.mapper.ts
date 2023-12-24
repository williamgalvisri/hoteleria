import { HotelDto } from "@infrastructure/dto/hotel.dto";
import { CreateHotelPayload } from "@infrastructure/payload/hotel.payload";
import { Hotel } from "@models/hotel.model";

export class HotelMapper {

  static mapFrom(param: HotelDto): Hotel {
    return new Hotel({
      id: param?.id ?? '',
      name: param.name,
      description: param.description,
      active: param.activate
    })
  }

  static mapTo(param: CreateHotelPayload): HotelDto {
    return {
      name: param.name,
      description: param.description,
      activate: true
    }
  }
}
