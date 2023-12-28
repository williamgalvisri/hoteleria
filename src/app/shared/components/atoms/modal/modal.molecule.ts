import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Modal } from "flowbite";
import { ModalService } from './service/modal.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'ml-modal',
  templateUrl: './modal.molecule.html'
})

export class ModalMolecule implements OnInit {
  @Input() size: '2xl' | '3xl' | '4xl' | '5xl' | '6xl' = '2xl';
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
