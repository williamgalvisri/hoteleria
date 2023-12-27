import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HotelRepository } from '@repositories/hotel/hotel.repository';
import { RepositoryModule } from '@repositories/repository.module';
import { ButtonAtom } from '@shared/components/atoms/button/button.atom';
import { InputAtom } from '@shared/components/atoms/input/input.atom';
import { LabelAtom } from '@shared/components/atoms/label/label.atom';
import { OptionType } from '@shared/components/atoms/select/model/select.model';
import { SelectAtom } from '@shared/components/atoms/select/select.atom';
import { TYPE_ROOM_OPTION } from '@shared/components/utils/dummy-option.const';
import { GetFormControlPipe } from '@shared/pipes/get-form-control.pipe';
declare var Datepicker: any;

@Component({
  standalone: true,
  imports: [
    ButtonAtom,
    LabelAtom,
    InputAtom,
    SelectAtom,
    ReactiveFormsModule,
    GetFormControlPipe,
    RepositoryModule,
  ],
  selector: 'pg-reseva',
  templateUrl: './reserva.page.html'
})

export class ReservaPage implements OnInit, AfterViewInit {
  allowPersonOption: OptionType[] = [];
  citiesOptions: OptionType[] = [];
  filterFormGroup!: FormGroup;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private hotelRepository: HotelRepository
  ) {
    this.allowPersonOption = TYPE_ROOM_OPTION.map(option => ({
      value: option.allowNumberPerson,
      text: `${option.allowNumberPerson} (${option.text})`
    })) as OptionType[];
  }

  ngOnInit() {
    this.setFormData()
    this.getCities()
    this.hotelRepository.applyFilters({
      city: 'Soledad',
      numberPersonaAllow: 1,
      initDate: new Date(),
      endDate: new Date()
    }).subscribe(({response}) => {
      console.log(response);
    })
  }

  setFormData(){
    const initDate = new Date();
    const endDate = new Date(new Date().getDate() + (24*60*60*1000))
    this.filterFormGroup = this.formBuilder.group({
      initDate: [initDate],
      endDate: [endDate],
      allowPerson: [''],
      city: ['']
    })
  }

  getCities() {
    this.hotelRepository.getCityAvailables().subscribe(({response}) => {
      this.citiesOptions = response.map(city => ({
        value: city,
        text: city
      }))
    })
  }

  ngAfterViewInit(): void {
  }

  goToLogin() {
    this.router.navigate(['login'])
  }

}
