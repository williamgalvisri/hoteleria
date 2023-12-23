import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonAtom } from '@shared/components/atoms/button/button.atom';
import { CardAtom } from '@shared/components/atoms/card/card.atom';
import { InputAtom } from '@shared/components/atoms/input/input.atom';
import { EmailMolecule } from '@shared/components/molecules/email-input/email-input.molecule';
import { PasswordInputMolecule } from '@shared/components/molecules/password-input/password-input.molecule';
import { GetFormControlPipe } from '@shared/pipes/get-form-control.pipe';

const COMPONENTS = [
  InputAtom,
  ButtonAtom,
  CardAtom,
  EmailMolecule,
  PasswordInputMolecule,
  GetFormControlPipe
];

const MODULE = [
  CommonModule,
  ReactiveFormsModule
];

@Component({
  standalone: true,
  imports: [...COMPONENTS, ...MODULE],
  selector: 'or-login-form',
  templateUrl: './login-form.organism.html',
  styleUrl: './login-form.organism.css'
})

export class LoginFormOrganism implements OnInit {
  formGroup!: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  login() {
    console.log(this.formGroup.value)
  }
}
