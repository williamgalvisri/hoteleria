import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Modal } from "flowbite";
import { ModalService } from './service/modal.service';

@Component({
  standalone: true,
  selector: 'ml-modal',
  templateUrl: './modal.molecule.html'
})

export class ModalMolecule implements OnInit {
  @Input() title: string = ''
  @Input() id: string = ''
  @Output() onCloseEmmiter = new EventEmitter<string>()
  constructor(private modalService: ModalService) { }

  ngOnInit() {
  }
  onClose() {
    this.onCloseEmmiter.emit('close')
  }
}
