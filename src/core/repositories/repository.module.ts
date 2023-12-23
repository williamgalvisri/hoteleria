import { NgModule } from '@angular/core';
import { HotelRepository } from './hotel/hotel.repository';
import { HotelImplementation } from '@infrastructure/implementation/hotel.implementation';

@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [{
    provide: HotelRepository,
    useClass: HotelImplementation
  }],
})
export class RepositoryModule { }
