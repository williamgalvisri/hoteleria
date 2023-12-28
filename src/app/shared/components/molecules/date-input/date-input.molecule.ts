import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { InputAtom, InputAtomTypes } from '@shared/components/atoms/input/input.atom';
import { LabelAtom } from '@shared/components/atoms/label/label.atom';

@Component({
  standalone: true,
  imports: [LabelAtom, InputAtom, CommonModule],
  selector: 'ml-date-input',
  templateUrl: './date-input.molecule.html',
  styleUrl: './date-input.molecule.html'
})

export class DateMolecule implements OnInit {
  @Input() control: FormControl = new FormControl();
  @Input() id: string = '';
  @Input() label: string = '';


  get hasRequiredError() {
    return this.control.hasError('required');
  }

  get isRequired() {
    return this.control.hasValidator(Validators.required)
  }

  constructor() {
  }

  ngOnInit() {
  }
}
