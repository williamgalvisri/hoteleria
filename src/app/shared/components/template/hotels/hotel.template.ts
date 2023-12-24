import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Hotel } from '@models/hotel.model';
import { ButtonAtom } from '@shared/components/atoms/button/button.atom';
import { CardAtom } from '@shared/components/atoms/card/card.atom';
import { LabelAtom } from '@shared/components/atoms/label/label.atom';

@Component({
  standalone: true,
  selector: 'tp-hotel',
  imports: [ButtonAtom, LabelAtom, CardAtom, CommonModule],
  templateUrl: './hotel.template.html',
  styleUrl: './hotel.template.css'
})

export class HotelTemplate implements OnInit {
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
    {
      name: 'Hotel 1',
      id: '1',
      description: 'Este es un hotel maravilloso con vista al mar',
      active: true,
    },
    {
      name: 'Hotel 1',
      id: '1',
      description: 'Este es un hotel maravilloso con vista al mar',
      active: true,
    },
    {
      name: 'Hotel 1',
      id: '1',
      description: 'Este es un hotel maravilloso con vista al mar',
      active: true,
    },
    {
      name: 'Hotel 1',
      id: '1',
      description: 'Este es un hotel maravilloso con vista al mar',
      active: true,
    },
    {
      name: 'Hotel 1',
      id: '1',
      description: 'Este es un hotel maravilloso con vista al mar',
      active: true,
    },
    {
      name: 'Hotel 1',
      id: '1',
      description: 'Este es un hotel maravilloso con vista al mar',
      active: true,
    },
    {
      name: 'Hotel 1',
      id: '1',
      description: 'Este es un hotel maravilloso con vista al mar',
      active: true,
    },{
      name: 'Hotel 1',
      id: '1',
      description: 'Este es un hotel maravilloso con vista al mar',
      active: true,
    },
    {
      name: 'Hotel 1',
      id: '1',
      description: 'Este es un hotel maravilloso con vista al mar',
      active: true,
    },
    {
      name: 'Hotel 1',
      id: '1',
      description: 'Este es un hotel maravilloso con vista al mar',
      active: true,
    },
    {
      name: 'Hotel 1',
      id: '1',
      description: 'Este es un hotel maravilloso con vista al mar',
      active: true,
    },
  ]
  constructor() { }

  ngOnInit() { }
}
