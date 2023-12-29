import { CommonModule, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Hotel } from '@models/hotel.model';
import { Reserva } from '@models/reserva.model';
import { ReservaService } from '@pages/reserva/service/reserva.service';
import { HotelRepository } from '@repositories/hotel/hotel.repository';
import { RepositoryModule } from '@repositories/repository.module';
import { ReservaRepository } from '@repositories/reserva/reserva.repository';
import { ButtonAtom } from '@shared/components/atoms/button/button.atom';
import { CardAtom } from '@shared/components/atoms/card/card.atom';
import { InputAtom } from '@shared/components/atoms/input/input.atom';
import { LabelAtom } from '@shared/components/atoms/label/label.atom';
import { ModalMolecule } from '@shared/components/atoms/modal/modal.molecule';
import { ModalService } from '@shared/components/atoms/modal/service/modal.service';
import { OptionType } from '@shared/components/atoms/select/model/select.model';
import { SelectAtom } from '@shared/components/atoms/select/select.atom';
import { FormReservaOrganism } from '@shared/components/organisms/form-persona/form-persona.organism';
import { TAX_OPTION, TYPE_ROOM_OPTION } from '@shared/components/utils/dummy-option.const';
import { GetFormControlPipe } from '@shared/pipes/get-form-control.pipe';
import { GetTextFromOptionPipe } from '@shared/pipes/get-text-from-options.pipe';
import { Modal } from 'flowbite';

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
    CardAtom,
    ModalMolecule,
    FormReservaOrganism,
    CommonModule,
    GetTextFromOptionPipe
  ],
  selector: 'tp-filter',
  templateUrl: 'filter.template.html',
  styleUrl: './filter.template.css'
})

export class FilterTemplate implements OnInit {
  selectedFilter: 'filter' | 'my-reservas' = 'my-reservas'
  formReservaInstanceModal!: Modal;
  allowPersonOption: OptionType[] = [];
  citiesOptions: OptionType[] = [];
  hotels: Hotel[] = [];
  isLoadigFilter: boolean = false;
  isLoadingFilterReserva: boolean = false;
  roomTypeOptions: OptionType[] = TYPE_ROOM_OPTION;
  taxTypeOptions: OptionType[] = TAX_OPTION;

  trySearchReservas: boolean = false;
  trySearchHotel: boolean = false;
  // Reservas
  reservas: Reserva[] = [];

  filterFormGroup!: FormGroup;
  filterReservaFormGroup!: FormGroup;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private hotelRepository: HotelRepository,
    private reservaRepository: ReservaRepository,
    private reservaService: ReservaService
  ) {
    this.allowPersonOption = TYPE_ROOM_OPTION.map(option => ({
      value: `${option.allowNumberPerson}`,
      text: `${option.allowNumberPerson} (${option.text})`
    })) as OptionType[];
  }

  ngOnInit() {
    this.setFormData()
    this.getCities()
  }

  setFormData(){
    // add 24 hours end date beacause need gap between dates inputs
    const initDate = new Date();
    const endDate = new Date().setTime(new Date().getTime() + (24*60*60*1000));

    this.filterFormGroup = this.formBuilder.group({
      initDate: [formatDate(initDate,'yyyy-MM-dd', 'en')],
      endDate: [formatDate(endDate,'yyyy-MM-dd', 'en')],
      allowPerson: [''],
      city: ['']
    });

    this.filterReservaFormGroup = this.formBuilder.group({
      documentNumber: ['', Validators.required],
    });
  }

  getCities() {
    this.hotelRepository.getCityAvailables().subscribe(({response}) => {
      this.citiesOptions = response.map(city => ({
        value: city,
        text: city
      }))
    })
  }

  goToLogin() {
    this.router.navigate(['login'])
  }

  applyFilter() {
    const values =  this.filterFormGroup.value;
    this.isLoadigFilter = true;
    this.hotelRepository.applyFilters({
      initDate: values.initDate,
      endDate: values.endDate,
      city: values.city,
      numberPersonaAllow: values.allowPerson,
    }).subscribe(({response}) => {
      this.hotels = response;
      this.isLoadigFilter = false;
      // if the person not search yet show a message invite them to apply filters
      this.trySearchHotel = true;
    })
  }

  applyFilterReserva() {
    this.isLoadingFilterReserva = true;
    this.trySearchReservas = true;
    const values =  this.filterReservaFormGroup.value;
    this.reservaRepository.getByDocumentNumberReserva(values.documentNumber).subscribe(({response, status}) => {
      this.isLoadingFilterReserva = false;
      console.log(response, status)
      if(status === 'success') {
        this.reservas = response
      }
    })
  }

  goToFormReserva(hotel: Hotel){
    const values =  this.filterFormGroup.value;
    this.reservaService.emmitRooms(hotel?.rooms ?? []);
    this.reservaService.emmitDates(values.initDate, values.endDate);
    this.reservaService.emmitHotel(hotel);
    this.router.navigate([`reserva/${hotel.id}/form`]);
  }

  goToFilter() {
    this.router.navigate([`reserva/home`])
  }

  changeFilterType(type: 'filter' | 'my-reservas') {
    this.selectedFilter = type;
  }

}
