import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { InputAtom, InputAtomTypes } from '@shared/components/atoms/input/input.atom';
import { LabelAtom } from '@shared/components/atoms/label/label.atom';

@Component({
  standalone: true,
  imports: [LabelAtom, InputAtom],
  selector: 'ml-password-input',
  templateUrl: './password-input.molecule.html',
  styleUrl: './password-input.molecule.html'
})

export class PasswordInputMolecule implements OnInit {
  @Input() control: FormControl = new FormControl();

  get hasRequiredError() {
    return this.control.hasError('required')
  }

  get hasMinLengthError() {
    return this.control.hasError('minlength')
  }

  constructor() {

  }

  ngOnInit() {;
  }
}
