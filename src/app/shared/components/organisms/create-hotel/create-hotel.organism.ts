import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateHotelPayload } from '@infrastructure/payload/hotel.payload';
import { HotelRepository } from '@repositories/hotel/hotel.repository';
import { ButtonAtom } from '@shared/components/atoms/button/button.atom';
import { TextAreaMolecule } from '@shared/components/molecules/text-area-input/text-area-input.molecule';
import { TextMolecule } from '@shared/components/molecules/text-input/text-input.molecule';
import { GetFormControlPipe } from '@shared/pipes/get-form-control.pipe';
import { CreateHotelInterface } from './create-hotel.model';
import { RepositoryModule } from '@repositories/repository.module';

const COMPONENTS = [
  TextMolecule,
  TextAreaMolecule,
  ButtonAtom,
  GetFormControlPipe
];

const MODULE = [
  CommonModule,
  ReactiveFormsModule,
  RepositoryModule
];

@Component({
  standalone: true,
  selector: 'or-create-hotel',
  imports: [...MODULE, ...COMPONENTS],
  templateUrl: 'create-hotel.organism.html'
})

export class CreateHotelOrganism implements OnInit {
  createHotelFormGroup!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private hotelRepository: HotelRepository
  ) {

  }

  ngOnInit() {
    this.createHotelFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    })
    this.hotelRepository.getByIdHotel('o9RTN24pz8OZ40YaOee8').subscribe(console.log);
    this.hotelRepository.getAllHotels().subscribe(response => {
      console.log(response)
    })
  }

  createHotel() {
    // console.log(this.createHotelFormGroup.value);
    const values = this.createHotelFormGroup.value as CreateHotelInterface;
    const payload: CreateHotelPayload = {
      name: values.name,
      description: values.description
    }
    this.hotelRepository.createHotel(payload).subscribe((response) => {
      console.log(response);
    })
  }
}
