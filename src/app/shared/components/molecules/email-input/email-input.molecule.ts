import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { InputAtom, InputAtomTypes } from '@shared/components/atoms/input/input.atom';
import { LabelAtom } from '@shared/components/atoms/label/label.atom';

@Component({
  standalone: true,
  imports: [LabelAtom, InputAtom],
  selector: 'ml-email-input',
  templateUrl: './email-input.molecule.html',
  styleUrl: './email-input.molecule.html'
})

export class EmailMolecule implements OnInit {
  @Input() control: FormControl = new FormControl();

  get hasEmailError() {
    return this.control.hasError('email');
  }

  get hasRequiredError() {
    return this.control.hasError('required');
  }

  constructor() {
  }

  ngOnInit() {
  }
}
