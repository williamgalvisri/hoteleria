import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateHotelPayload, UpdateHotelPayload } from '@infrastructure/payload/hotel.payload';
import { HotelRepository } from '@repositories/hotel/hotel.repository';
import { ButtonAtom } from '@shared/components/atoms/button/button.atom';
import { TextAreaMolecule } from '@shared/components/molecules/text-area-input/text-area-input.molecule';
import { TextMolecule } from '@shared/components/molecules/text-input/text-input.molecule';
import { GetFormControlPipe } from '@shared/pipes/get-form-control.pipe';
import { FormHotelInterface } from './form-hotel.model';
import { RepositoryModule } from '@repositories/repository.module';
import { Hotel } from '@models/hotel.model';
import { ModalService } from '@shared/components/atoms/modal/service/modal.service';
import { ID_MODAL_FORM_HOTEL } from '@shared/components/utils/modal-keys.const';
import { Modal } from 'flowbite';
import { pipe, tap } from 'rxjs';

const COMPONENTS = [
  TextMolecule,
  TextAreaMolecule,
  ButtonAtom,
  GetFormControlPipe
];

const MODULE = [
  CommonModule,
  ReactiveFormsModule,
  RepositoryModule
];

@Component({
  standalone: true,
  selector: 'or-form-hotel',
  imports: [...MODULE, ...COMPONENTS],
  templateUrl: 'form-hotel.organism.html'
})

export class FormHotelOrganism implements OnInit, OnChanges, AfterViewInit {
  @Input() formData: Hotel = new Hotel();

  id: string = '';
  hotelFormGroup!: FormGroup;
  formHotelInstanceModal!: Modal;
  isLoading: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private hotelRepository: HotelRepository,
    private modalService: ModalService
  ) {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if(!changes['formData'].isFirstChange()) {
      this.setValueForm(this.formData)
    }
  }

  ngOnInit() {
    this.setValueForm();
  }

  ngAfterViewInit(){
    this.formHotelInstanceModal = this.modalService.createInstanceModal(ID_MODAL_FORM_HOTEL, {closable: false});
  }

  setValueForm(data: Hotel = new Hotel()) {
    this.hotelFormGroup = this.formBuilder.group({
      name: [data.name, Validators.required],
      description: [data.description, Validators.required],
      city: [data.city, Validators.required]
    })
  }

  createHotel() {
    const values = this.hotelFormGroup.value as FormHotelInterface;
    const payload: CreateHotelPayload = {
      name: values.name,
      city: values.city,
      description: values.description
    }
    this.isLoading = true;
    // TODO: execute messahe suscces and error
    this.hotelRepository.createHotel(payload)
    .pipe(
      tap(() => {
        this.isLoading = false;
        this.formHotelInstanceModal.hide();
      })
    ).subscribe()
  }

  updateHotel() {
    const values = this.hotelFormGroup.value as FormHotelInterface;
    const id = this.formData.id;
    const payload: UpdateHotelPayload = {
      id: id,
      name: values.name,
      city: values.city,
      description: values.description
    }
    this.isLoading = true;
    // TODO: execute messahe suscces and error
    this.hotelRepository.updateHotel(payload).pipe(
      tap(() => {
        this.isLoading = false;
        this.formHotelInstanceModal.hide();
      })
    ).subscribe()
  }
}
