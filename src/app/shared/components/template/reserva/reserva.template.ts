import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Room } from '@models/room.model';
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
import { SEX_OPTION, TAX_OPTION, TYPE_ROOM_OPTION } from '@shared/components/utils/dummy-option.const';
import { ID_MODAL_ADD_PERSON, ID_MODAL_FORM_ROOM } from '@shared/components/utils/modal-keys.const';
import { GetFormControlPipe } from '@shared/pipes/get-form-control.pipe';
import { GetTextFromOptionPipe } from '@shared/pipes/get-text-from-options.pipe';
import { Modal } from 'flowbite';
import { ReservaFormInterface } from './models/reserva.models';

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
  ],
  providers:[
    GetTextFromOptionPipe
  ],
  selector: 'tp-reserva',
  templateUrl: 'reserva.template.html',
  styleUrl: './reserva.template.css'
})

export class ReservaTemplate implements OnInit, AfterViewInit {
  person: FormPerson = new FormPerson();
  guest: FormPerson[] = [{
    typeDocument: '',
    fullName: 'William galvis',
    gender: '',
    birthDay: new Date(),
    documentNumber: '12343566',
    email: '',
    phone: 1221314,
  }];
  roomsTypeOptions: OptionType[] = [];
  allowNumberPerson: number = 0;
  indexEditPersona: number | null = null;
  showErroAllowedPerson: boolean = false;
  reservaFormGroup!: FormGroup;
  formPesonaInstanceModal!: Modal;
  constructor(
    private formBuilder: FormBuilder,
    private modalService: ModalService,
    private reservaService: ReservaService,
    private router: Router,
    private getTextFromOptionPipe: GetTextFromOptionPipe
  ) {
    this.reservaFormGroup = this.formBuilder.group({
      room: ['', Validators.required],
      emergencyFullName: ['', Validators.required],
      emergencyPhone: ['', Validators.required]
    });
    this.reservaFormGroup.valueChanges.subscribe((data: ReservaFormInterface) => {
      const roomType = this.reservaService.rooms.find(room => room.id === data.room)?.roomType
      this.allowNumberPerson = TYPE_ROOM_OPTION.find(t => t.value === roomType)?.allowNumberPerson ?? 0;
      this.checkNumberPersonAllowed()
    })
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

  ngAfterViewInit(): void {
    this.formPesonaInstanceModal = this.modalService.createInstanceModal(ID_MODAL_ADD_PERSON, {closable: false});
  }

  goToFilters() {
    this.router.navigate(['reserva/home'])
  }

  saveReserva() {
    const values = {...this.reservaFormGroup.value, guests: this.guest} as ReservaFormInterface;
    console.log(values)
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
