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
import { BuildReservaSummary, ReservaFormInterface, ResumenReserva } from './models/reserva.models';
import { Subscription, of, switchMap, tap } from 'rxjs';
import { RoomRepository } from '@repositories/room/room.repository';
import { RepositoryModule } from '@repositories/repository.module';
import { CreateReservaPayload } from '@infrastructure/payload/reserva.payload';
import { ReservaRepository } from '@repositories/reserva/reserva.repository';
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
    CommonModule,
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
  guest: FormPerson[] = [];
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
  isLoading: boolean = true;

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
    // build data summary
    const hotel = this.reservaService.hotel;
    const roomInfo = this.reservaService.rooms.find(room => room.id === values.room)
    const guestInfo = values.guests?.[0] ?? new FormPerson();
    // set-up data sumamry
    const summaryReserva: BuildReservaSummary = {
      hotelName: hotel?.name,
      initDate: formatDate(dateReserva?.initDate ?? new Date(),'yyyy-MM-dd', 'en'),
      endDate: formatDate(dateReserva?.endDate ?? new Date(),'yyyy-MM-dd', 'en'),
      numberGuest: `${values.guests.length}`,
      locationRoom:  `${roomInfo?.location}(${this.getTextFromOptionPipe.transform(roomInfo?.roomType, TYPE_ROOM_OPTION)})`,
      tax: this.getTextFromOptionPipe.transform(roomInfo?.tax, TAX_OPTION),
      price: Number(roomInfo?.cost),
    };
    this.builResumenReserva(summaryReserva)
    // request to save reserva
    const saveReserva$ = this.reservaRepository.createReserva(values);

    // then send email
    const sendEmail$ = this.reservaRepository.sendEmail({
      name: guestInfo.fullName,
      roomName: summaryReserva.locationRoom,
      hotelName: summaryReserva.hotelName,
      price: `${summaryReserva.price}+${summaryReserva.tax}`,
      numberGuest: `${summaryReserva.numberGuest}`,
      emailTo: guestInfo.email,
    })

    saveReserva$.pipe(
      switchMap(({response, status}) => {
        this.loading = false;
        // show summary info
        this.reserved = true
        if(status == 'success') {
          return sendEmail$
        } else {
          return of({error: true, message: 'Hubo un error al crear la reserva'})
        }
      })
    ).subscribe();
  }

  builResumenReserva(summary: BuildReservaSummary) {
    this.resumenReserva = {
      hotelName: summary.hotelName,
      initDate: summary.initDate,
      endDate: summary.endDate,
      numberGuest: summary.numberGuest,
      locationRoom: summary.locationRoom,
      tax: summary.tax,
      price: summary.price
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
