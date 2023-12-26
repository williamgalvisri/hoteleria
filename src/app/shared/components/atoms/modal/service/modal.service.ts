import { Inject, Injectable } from '@angular/core';
import { InstanceOptions, Modal } from 'flowbite';
import type { ModalOptions } from 'flowbite';

@Injectable({providedIn: 'root'})
export class ModalService {
  listIntancesModals: Record<string, Modal> = {}
  constructor() {
  }

  public createInstanceModal(id: string, options: ModalOptions = {}, instanceOptions: InstanceOptions = {}) {
    options = {
      ...options,
      onShow: () => {
        const element = document.querySelector('div[modal-backdrop]') as HTMLElement;
        if(element?.style) {
          element.style.display = "";
        }
      },
      onHide: () => {
        const element = document.querySelector('div[modal-backdrop]') as HTMLElement;
        if(element?.style) {
          element.style.display = "none";
        }
      }
    };
    const element = document.getElementById(id)
    // if (!(id in this.listIntancesModals)) {
    //   this.listIntancesModals = {
    //     ...this.listIntancesModals,
    //     [id]: new Modal(element, options, instanceOptions)
    //   }
    // }
    return new Modal(element, options, instanceOptions);
  }
}
