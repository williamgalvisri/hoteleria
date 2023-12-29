import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class BreadcrumService {
  idsBreadCrum: Record<string, string> = {}
  constructor() {

  }

  setIdBreadCrum(id: string, key: string) {
    this.idsBreadCrum = {...this.idsBreadCrum, [key]: id}
  }

}
