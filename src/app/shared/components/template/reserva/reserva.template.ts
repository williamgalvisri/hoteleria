import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservaService } from '@pages/reserva/service/reserva.service';
import { ButtonAtom } from '@shared/components/atoms/button/button.atom';
import { LabelAtom } from '@shared/components/atoms/label/label.atom';
import { ModalMolecule } from '@shared/components/atoms/modal/modal.molecule';
import { ModalService } from '@shared/components/atoms/modal/service/modal.service';
import { OptionType } from '@shared/components/atoms/select/model/select.model';
import { NumberMolecule } from '@shared/components/molecules/number-input/number-input.molecule';
import { SelectMolecule } from '@shared/components/molecules/select-input/select-input.molecule';
import { TextMolecule } from '@shared/components/molecules/text-input/text-input.molecule';
import { FormReservaOrganism } from '@shared/components/organisms/form-persona/form-persona.organism';
import { EmmitDataPersonaAction, FormPerson } from '@shared/components/organisms/form-persona/model/form-persona.model';
import { TAX_OPTION, TYPE_ROOM_OPTION } from '@shared/components/utils/dummy-option.const';
import { ID_MODAL_ADD_PERSON } from '@shared/components/utils/modal-keys.const';
import { GetFormControlPipe } from '@shared/pipes/get-form-control.pipe';
import { GetTextFromOptionPipe } from '@shared/pipes/get-text-from-options.pipe';
import { Modal } from 'flowbite';
import { ReservaFormInterface, ResumenReserva } from './models/reserva.models';
import { Subscription, of, switchMap, tap } from 'rxjs';
import { RoomRepository } from '@repositories/room/room.repository';
import { RepositoryModule } from '@repositories/repository.module';
import { CreateReservaPayload } from '@infrastructure/payload/reserva.payload';
import { ReservaRepository } from '@repositories/reserva/reserva.repository';
import { ReservaTemplateService } from './service/reserva-template.service';
import { CommonModule, formatDate } from '@angular/common';

@Component({
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonAtom,
    SelectMolecule,
    TextMolecule,
    NumberMolecule,
    GetFormControlPipe,
    ModalMolecule,
    FormReservaOrganism,
    LabelAtom,
    RepositoryModule,
    CommonModule
  ],
  providers:[
    GetTextFromOptionPipe
  ],
  selector: 'tp-reserva',
  templateUrl: 'reserva.template.html',
  styleUrl: './reserva.template.css'
})

export class ReservaTemplate implements OnInit, AfterViewInit, OnDestroy {
  person: FormPerson = new FormPerson();
  guest: FormPerson[] = [{
    typeDocument: '',
    fullName: 'William galvis',
    gender: '',
    birthDay: '',
    documentNumber: 0,
    email: '',
    phone: 1221314,
  }];
  hotelId: string = '';
  roomsTypeOptions: OptionType[] = [];
  allowNumberPerson: number = 0;
  indexEditPersona: number | null = null;
  showErroAllowedPerson: boolean = false;
  reservaFormGroup!: FormGroup;
  formPesonaInstanceModal!: Modal;
  loading: boolean = false;
  reserved: boolean = false;
  resumenReserva!: ResumenReserva;
  private reservaFormGroupSubscription!: Subscription;
  private routerActivedSubscription!: Subscription;
  constructor(
    private formBuilder: FormBuilder,
    private modalService: ModalService,
    private reservaService: ReservaService,
    private router: Router,
    private getTextFromOptionPipe: GetTextFromOptionPipe,
    private activatedRoute: ActivatedRoute,
    private roomRepository: RoomRepository,
    private reservaRepository: ReservaRepository,
    private reservaTemplateService: ReservaTemplateService
  ) {
    this.reservaFormGroup = this.formBuilder.group({
      room: ['', Validators.required],
      emergencyFullName: ['', Validators.required],
      emergencyPhone: ['', Validators.required]
    });
    this.reservaFormGroupSubscription = this.reservaFormGroup.valueChanges.subscribe((data: ReservaFormInterface) => {
      const roomType = this.reservaService.rooms.find(room => room.id === data.room)?.roomType
      this.allowNumberPerson = TYPE_ROOM_OPTION.find(t => t.value === roomType)?.allowNumberPerson ?? 0;
      this.checkNumberPersonAllowed()
    })

    this.routerActivedSubscription = this.activatedRoute.params
    .pipe(
      switchMap((param) => {
        const id = param['id'];
        this.hotelId = id;
        if (id) {
          return this.roomRepository.setHotelIdentifier(id)
        } else {
          return of(false)
        }
      }),
      tap((validateExist) => {
        if(!validateExist) {
          this.goToFilters()
        }
      })
    ).subscribe();
  }

  ngOnInit() {
    if(!this.reservaService.rooms.length) {
      this.goToFilters()
    } else {
      this.roomsTypeOptions = this.reservaService.rooms.map(room =>{
        const roomTypeText = this.getTextFromOptionPipe.transform(room.roomType, TYPE_ROOM_OPTION);
        const taxText = this.getTextFromOptionPipe.transform(room.tax, TAX_OPTION);
        return ({value: room.id, text: `${room.location} - ${roomTypeText} - ${room.cost} + ${taxText}`})
      })
    }
  }

  ngOnDestroy(): void {
    this.reservaFormGroupSubscription?.unsubscribe();
    this.routerActivedSubscription?.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.formPesonaInstanceModal = this.modalService.createInstanceModal(ID_MODAL_ADD_PERSON, {closable: false});
  }

  goToFilters() {
    this.router.navigate(['reserva/home'])
  }

  async saveReserva() {
    this.loading = true;
    const dateReserva = this.reservaService.dateReserva;
    const values = {...this.reservaFormGroup.value, hotel: this.hotelId, guests: this.guest, ...dateReserva} as CreateReservaPayload;
    this.builResumenReserva(values)
    const saveReserva$ = this.reservaRepository.createReserva(values);
    const sendEmail$ = of({error: false, message: 'correo enviado'});

    saveReserva$.pipe(
      switchMap(({response, status}) => {
        this.loading = false;
        this.reserved = true
        if(status == 'success') {
          return sendEmail$
        } else {
          return of({error: true, message: 'Hubo un error al crear la reserva'})
        }
      })
    ).subscribe();
  }

  builResumenReserva(formData: CreateReservaPayload) {
    const dateReserva = this.reservaService.dateReserva;
    const hotel = this.reservaService.hotel;
    const roomInfo = this.reservaService.rooms.find(room => room.id === formData.room)
    this.resumenReserva = {
      hotelName: hotel.name,
      initDate: formatDate(dateReserva?.initDate ?? new Date(),'yyyy-MM-dd', 'en'),
      endDate: formatDate(dateReserva?.endDate ?? new Date(),'yyyy-MM-dd', 'en'),
      numberGuest: this.guest.length,
      locationRoom:`${roomInfo?.location}(${this.getTextFromOptionPipe.transform(roomInfo?.roomType, TYPE_ROOM_OPTION)})`,
      tax: this.getTextFromOptionPipe.transform(roomInfo?.tax, TAX_OPTION),
      price: Number(roomInfo?.cost)
    }
  }

  editPerson(index: number, person: FormPerson ) {
    this.indexEditPersona = index;
    this.person = person;
    this.formPesonaInstanceModal.show();
  }

  removePerson(index: number ) {
    this.guest = this.guest.filter((_, _index) => _index !== index);
    this.checkNumberPersonAllowed();
  }
  // --------------- Modal Methods -------------
  openModalPerson() {
    this.person = new FormPerson()
    this.formPesonaInstanceModal.show();
  }

  closeFormPersonaModal() {
    this.formPesonaInstanceModal.hide();
  }

  getDataFormPersona(event: EmmitDataPersonaAction) {
    if(event.action === 'create'){
      this.guest.push(event.data);
    } else if (event.action === 'edit' && this.indexEditPersona != null) {
      this.guest[this.indexEditPersona] = event.data
    }
    this.indexEditPersona = null;
    this.checkNumberPersonAllowed()
  }

  checkNumberPersonAllowed() {
    // Rule: verify when guest is over number persona allowed
    this.showErroAllowedPerson  = (this.guest.length > this.allowNumberPerson) && this.reservaFormGroup.controls['room'].value
  }
}
