import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Room } from '@models/room.model';
import { HotelRepository } from '@repositories/hotel/hotel.repository';
import { RepositoryModule } from '@repositories/repository.module';
import { RoomRepository } from '@repositories/room/room.repository';
import { ButtonAtom } from '@shared/components/atoms/button/button.atom';
import { ModalService } from '@shared/components/atoms/modal/service/modal.service';
import { OptionType } from '@shared/components/atoms/select/model/select.model';
import { NumberMolecule } from '@shared/components/molecules/number-input/number-input.molecule';
import { SelectMolecule } from '@shared/components/molecules/select-input/select-input.molecule';
import { TextMolecule } from '@shared/components/molecules/text-input/text-input.molecule';
import { GetFormControlPipe } from '@shared/pipes/get-form-control.pipe';
import { FormRoomInterface, TypeRoomEnum } from './model/form-room.model';
import { CreateRoomPayload, UpdateRoomPayload } from '@infrastructure/payload/room.payload';
import { tap } from 'rxjs';
import { Modal } from 'flowbite';
import { ID_MODAL_FORM_ROOM } from '@shared/components/utils/modal-keys.const';
import { TAX_OPTION, TYPE_ROOM_OPTION } from '@shared/components/utils/dummy-option.const';

const COMPONENTS = [
  TextMolecule,
  SelectMolecule,
  ButtonAtom,
  NumberMolecule,
  GetFormControlPipe
];

const MODULE = [
  CommonModule,
  ReactiveFormsModule,
  RepositoryModule
];

@Component({
  standalone: true,
  imports: [...MODULE, ...COMPONENTS],
  selector: 'or-form-room',
  templateUrl: 'form-room.organism.html',
  styleUrl: './form-room.organism.css'
})

export class FormRoomOrganism implements OnInit, AfterViewInit, OnChanges {
  @Input() formData: Room = new Room();
  roomFormGroup!: FormGroup;
  isLoading: boolean = false;

  roomTypeOptions: OptionType[] = [];
  taxOptions: OptionType[] = [];
  formRoomInstanceModal!: Modal;
  constructor(
    private formBuilder: FormBuilder,
    private roomRepository: RoomRepository,
    private modalService: ModalService
  ) {

    this.roomTypeOptions = TYPE_ROOM_OPTION;
    this.taxOptions = TAX_OPTION
  }

  ngOnInit() {
    this.setValueForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(!changes['formData'].isFirstChange()) {
      this.setValueForm(this.formData)
    }
  }

  ngAfterViewInit(): void {
    this.formRoomInstanceModal = this.modalService.createInstanceModal(ID_MODAL_FORM_ROOM, {closable: false});
  }

  setValueForm(data: Room =  new Room()) {
    this.roomFormGroup = this.formBuilder.group({
      roomType: [data.roomType, Validators.required],
      cost: [data.cost, Validators.required],
      tax: [data.tax, Validators.required],
      location: [data.location, Validators.required]
    })
  }


  // ---------------------- Fetch Method ----------------------

  createRoom() {
    const values = this.roomFormGroup.value as FormRoomInterface;
    const payload: CreateRoomPayload = {
      cost: values.cost,
      tax: values.tax,
      roomType: values.roomType,
      location: values.location,
      numberPersonaAllow: this.getNumberAllowedPerson(values.roomType)
    }
    this.isLoading = true;
    // TODO: execute messahe suscces and error
    this.roomRepository.createRoom(payload)
    .pipe(
      tap(() => {
        this.isLoading = false;
        this.formRoomInstanceModal.hide();
      })
    ).subscribe()
  }

  updateRoom() {
    const values = this.roomFormGroup.value as FormRoomInterface;
    const id = this.formData.id;
    const payload: UpdateRoomPayload = {
      id,
      cost: values.cost,
      tax: values.tax,
      roomType: values.roomType,
      location: values.location,
      numberPersonaAllow: this.getNumberAllowedPerson(values.roomType)
    }
    this.isLoading = true;
    // TODO: execute messahe suscces and error
    this.roomRepository.updateRoom(payload).pipe(
      tap(() => {
        this.isLoading = false;
        this.formRoomInstanceModal.hide();
      })
    ).subscribe()
  }

  getNumberAllowedPerson(typeRoom: string): number {
    return TYPE_ROOM_OPTION.find(x => x.value === typeRoom)?.allowNumberPerson ?? 0;
  }
}
