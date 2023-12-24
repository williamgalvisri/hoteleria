import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Hotel } from '@models/hotel.model';
import { ButtonAtom } from '@shared/components/atoms/button/button.atom';
import { CardAtom } from '@shared/components/atoms/card/card.atom';
import { LabelAtom } from '@shared/components/atoms/label/label.atom';
import { ModalMolecule } from '@shared/components/atoms/modal/modal.molecule';
import { ModalService } from '@shared/components/atoms/modal/service/modal.service';
import { TextAreaMolecule } from '@shared/components/molecules/text-area-input/text-area-input.molecule';
import { TextMolecule } from '@shared/components/molecules/text-input/text-input.molecule';
import { CreateHotelOrganism } from '@shared/components/organisms/create-hotel/create-hotel.organism';
import { Modal } from 'flowbite';

@Component({
  standalone: true,
  selector: 'tp-hotel',
  imports: [ButtonAtom, LabelAtom, CardAtom, ModalMolecule, CreateHotelOrganism, CommonModule],
  providers:[
    {
      provide: 'id', useValue: 'recaptcha-container'
    }
  ],
  templateUrl: './hotel.template.html',
  styleUrl: './hotel.template.css'
})

export class HotelTemplate implements OnInit, AfterViewInit {
  hotels: Hotel[] = [
    {
      name: 'Hotel 1',
      id: '1',
      description: 'Este es un hotel maravilloso con vista al mar',
      active: false,
    },
    {
      name: 'Hotel 1',
      id: '1',
      description: 'Este es un hotel maravilloso con vista al mar',
      active: true,
    },
  ];
  createHotelInstanceModal!: Modal;
  constructor(private modalService: ModalService) {
  }

  ngOnInit() {}

  ngAfterViewInit(): void {
    const ID_MODAL = 'modal-create-hotel';
    this.createHotelInstanceModal = this.modalService.createInstanceModal(ID_MODAL, {closable: false});
    this.createHotelInstanceModal.show()
  }

  // -------------------- Modal Methods --------------------
  openCreateHotelModal() {
    this.createHotelInstanceModal.show()
  }

  closeCreateHoterModal() {
    this.createHotelInstanceModal.hide()
  }
}
