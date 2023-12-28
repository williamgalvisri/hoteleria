import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Room } from '@models/room.model';
import { RepositoryModule } from '@repositories/repository.module';
import { ButtonAtom } from '@shared/components/atoms/button/button.atom';
import { ModalService } from '@shared/components/atoms/modal/service/modal.service';
import { OptionType } from '@shared/components/atoms/select/model/select.model';
import { NumberMolecule } from '@shared/components/molecules/number-input/number-input.molecule';
import { SelectMolecule } from '@shared/components/molecules/select-input/select-input.molecule';
import { TextMolecule } from '@shared/components/molecules/text-input/text-input.molecule';
import { GetFormControlPipe } from '@shared/pipes/get-form-control.pipe';
import { Modal } from 'flowbite';
import { ID_MODAL_ADD_PERSON } from '@shared/components/utils/modal-keys.const';
import { DOCUMENT_TYPE_OPTION, SEX_OPTION, TAX_OPTION } from '@shared/components/utils/dummy-option.const';
import { EmailMolecule } from '@shared/components/molecules/email-input/email-input.molecule';
import { DateMolecule } from '@shared/components/molecules/date-input/date-input.molecule';
import { EmmitDataPersonaAction, FormPerson } from './model/form-persona.model';

const COMPONENTS = [
  TextMolecule,
  SelectMolecule,
  ButtonAtom,
  NumberMolecule,
  GetFormControlPipe,
  EmailMolecule,
  DateMolecule
];

const MODULE = [
  CommonModule,
  ReactiveFormsModule,
  RepositoryModule
];

@Component({
  standalone: true,
  imports: [...MODULE, ...COMPONENTS],
  selector: 'or-form-persona',
  templateUrl: 'form-persona.organism.html',
  styleUrl: './form-persona.organism.css'
})

export class FormReservaOrganism implements OnInit, AfterViewInit, OnChanges {
  @Input() formData: FormPerson = new FormPerson();
  @Input() roomsTypeOptions: OptionType[] = [];
  @Output() emmitPersona = new EventEmitter<EmmitDataPersonaAction>()

  guestFormGroup!: FormGroup;

  isLoading: boolean = false;

  documentTypeOptions: OptionType[] = [];
  sexTypeOptions: OptionType[] = [];
  formPersonaInstanceModal!: Modal;
  constructor(
    private formBuilder: FormBuilder,
    private modalService: ModalService
  ) {
    this.documentTypeOptions = DOCUMENT_TYPE_OPTION;
    this.sexTypeOptions = SEX_OPTION;

  }

  ngOnInit() {
    this.setValueForm(this.formData);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(!changes['formData'].isFirstChange()) {
      this.setValueForm(this.formData)
    }
  }

  ngAfterViewInit(): void {
    this.formPersonaInstanceModal = this.modalService.createInstanceModal(ID_MODAL_ADD_PERSON, {closable: false});
  }

  setValueForm(data: FormPerson) {
    this.guestFormGroup = this.formBuilder.group(
      {
        typeDocument: [data?.typeDocument ?? '', Validators.required],
        fullName: [data?.fullName ?? '', Validators.required],
        gender: [data?.gender ?? '', Validators.required],
        birthDay: [data?.birthDay ?? new Date(), Validators.required],
        documentNumber: [data?.documentNumber ?? '', Validators.required],
        email: [data?.email ?? '', [Validators.required, Validators.email]],
        phone: [data?.phone ?? '', Validators.required],
      }
    );
  }

  actionPersonForm(action: 'create' | 'edit'){
    const values = this.guestFormGroup.value as FormPerson;
    this.emmitPersona.emit({ data: values, action })
    this.formPersonaInstanceModal.hide()
  }


}
