import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Hotel } from '@models/hotel.model';
import { ReservaService } from '@pages/reserva/service/reserva.service';
import { HotelRepository } from '@repositories/hotel/hotel.repository';
import { RepositoryModule } from '@repositories/repository.module';
import { ButtonAtom } from '@shared/components/atoms/button/button.atom';
import { CardAtom } from '@shared/components/atoms/card/card.atom';
import { InputAtom } from '@shared/components/atoms/input/input.atom';
import { LabelAtom } from '@shared/components/atoms/label/label.atom';
import { ModalMolecule } from '@shared/components/atoms/modal/modal.molecule';
import { ModalService } from '@shared/components/atoms/modal/service/modal.service';
import { OptionType } from '@shared/components/atoms/select/model/select.model';
import { SelectAtom } from '@shared/components/atoms/select/select.atom';
import { FormReservaOrganism } from '@shared/components/organisms/form-persona/form-persona.organism';
import { TYPE_ROOM_OPTION } from '@shared/components/utils/dummy-option.const';
import { GetFormControlPipe } from '@shared/pipes/get-form-control.pipe';
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
    FormReservaOrganism
  ],
  selector: 'tp-filter',
  templateUrl: 'filter.template.html',
  styleUrl: './filter.template.css'
})

export class FilterTemplate implements OnInit {
  formReservaInstanceModal!: Modal;
  allowPersonOption: OptionType[] = [];
  citiesOptions: OptionType[] = [];
  hotels: Hotel[] = [];
  isLoadigFilter: boolean = false;
  trySearchHotel: boolean = false;

  filterFormGroup!: FormGroup;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private hotelRepository: HotelRepository,
    private modalService: ModalService,
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
    const initDate = new Date();
    const endDate = new Date().setTime(new Date().getTime() + (24*60*60*1000));
    this.filterFormGroup = this.formBuilder.group({
      initDate: [formatDate(initDate,'yyyy-MM-dd', 'en')],
      endDate: [formatDate(endDate,'yyyy-MM-dd', 'en')],
      allowPerson: ['4'],
      city: ['Cartagena']
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
    // this.formReservaInstanceModal = this.modalService.createInstanceModal(ID_MODAL_FORM_RESERVA, {closable: false});
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

  goToFormReserva(hotel: Hotel){
    console.log(hotel)
    this.reservaService.emmitRooms(hotel?.rooms ?? []);
    this.router.navigate([`reserva/${hotel.id}/form`]);
  }

  goToFilter() {
    this.router.navigate([`reserva/home`])
  }

}
