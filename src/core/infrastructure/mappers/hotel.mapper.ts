import { HotelDto } from "@infrastructure/dto/hotel.dto";
import { CreateHotelPayload, UpdateHotelPayload } from "@infrastructure/payload/hotel.payload";
import { Hotel } from "@models/hotel.model";

export class HotelMapper {

  static mapFrom(param: HotelDto): Hotel {
    return new Hotel({
      id: param?.id ?? '',
      name: param.name,
      description: param.description,
      active: param.activate,
      city: param.city,
    })
  }

  static mapTo(param: CreateHotelPayload): HotelDto {
    return {
      name: param.name,
      description: param.description,
      city: param.city,
      activate: true
    }
  }

  static mapToUpdate(param: UpdateHotelPayload): Omit<HotelDto, 'activate'> {
    return {
      name: param.name,
      description: param.description,
      city: param.city
    }
  }
}
