import { Inject, Injectable } from '@angular/core';
import { InstanceOptions, Modal } from 'flowbite';
import type { ModalOptions } from 'flowbite';

@Injectable({providedIn: 'root'})
export class ModalService {
  constructor() {
  }

  public createInstanceModal(id: string, options: ModalOptions = {}, instanceOptions: InstanceOptions = {}) {
    const element = document.getElementById(id)
    return new Modal(element, options, instanceOptions);
  }
}
