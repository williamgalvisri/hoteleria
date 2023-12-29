import { Injectable } from '@angular/core';
// import { Resend } from 'resend';
import { from } from 'rxjs';
import { EmailPayload } from '../models/reserva.models';
import { HttpClient } from '@angular/common/http';

const API_KEY = 're_313EvDyg_8Q1P9TXaoCaoBCFt3G6ZynUJ';
@Injectable({providedIn: 'root'})
export class ReservaTemplateService {
  constructor(
    private httpClient: HttpClient
  ) { }
  async sendEmail(payload: EmailPayload) {
    // console.log('enviar')
    // return await new Resend(API_KEY).emails.send(payload)
  }

}
