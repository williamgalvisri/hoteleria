import { Inject, Injectable } from '@angular/core';
import { InstanceOptions, Modal } from 'flowbite';
import type { ModalOptions } from 'flowbite';

@Injectable({providedIn: 'root'})
export class ModalService {
  constructor() {
  }

  public createInstanceModal(id: string, options: ModalOptions = {}, instanceOptions: InstanceOptions = {}) {
    options = {
      ...options,
      onShow: () => {
        const element = document.querySelector('div[modal-backdrop]') as HTMLElement;
        element.style.display = "";
      },
      onHide: () => {
        const element = document.querySelector('div[modal-backdrop]') as HTMLElement;
        element.style.display = "none";
      }
    };
    const element = document.getElementById(id)
    return new Modal(element, options, instanceOptions);
  }
}
