import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { Hotel } from '@models/hotel.model';
import { ButtonAtom } from '@shared/components/atoms/button/button.atom';
import { InputAtom } from '@shared/components/atoms/input/input.atom';
import { LabelAtom } from '@shared/components/atoms/label/label.atom';
import { OptionType } from '@shared/components/atoms/select/model/select.model';
import { Modal } from 'flowbite';

@Component({
  standalone: true,
  imports: [
    RouterOutlet,
    ButtonAtom,
    LabelAtom,
    InputAtom,
  ],
  selector: 'pg-reseva',
  templateUrl: './reserva.page.html',
  styleUrl: './reserva.page.css'
})

export class ReservaPage implements OnInit {
  formReservaInstanceModal!: Modal;
  allowPersonOption: OptionType[] = [];
  citiesOptions: OptionType[] = [];
  hotels: Hotel[] = [];
  isLoadigFilter: boolean = false;
  trySearchHotel: boolean = false;

  filterFormGroup!: FormGroup;
  constructor(
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  goToLogin() {
    this.router.navigate(['login'])
  }

}
