import { formatDate } from "@angular/common";
import { HotelDto } from "@infrastructure/dto/hotel.dto";
import { CreateHotelPayload, UpdateHotelPayload } from "@infrastructure/payload/hotel.payload";
import { Hotel } from "@models/hotel.model";

export class HotelMapper {

  static mapFrom(param: HotelDto): Hotel {
    return new Hotel({
      id: param?.id ?? '',
      name: param.name,
      description: param.description,
      active: param.active,
      city: param.city,
      rooms: param?.rooms ?? []
    })
  }

  static mapTo(param: CreateHotelPayload): HotelDto {
    return {
      name: param.name,
      description: param.description,
      city: param.city,
      active: true,
      create_at: formatDate(new Date(), 'yyyy-MM-dd', 'en')
    }
  }

  static mapToUpdate(param: UpdateHotelPayload): Omit<HotelDto, 'active'> {
    return {
      name: param.name,
      description: param.description,
      city: param.city
    }
  }
}
