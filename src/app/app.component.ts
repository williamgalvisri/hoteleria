import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HotelRepository } from '@repositories/hotel/hotel.repository';
import { RepositoryModule } from '@repositories/repository.module';
import { InputAtom } from '@shared/components/atoms/input/input.atom';
import { ButtonAtom } from '@shared/components/atoms/button/button.atom';
import { CardAtom } from '@shared/components/atoms/card/card.atom';
import { initFlowbite } from 'flowbite';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  constructor(){}

  ngOnInit(): void {
    initFlowbite();
  }


}
