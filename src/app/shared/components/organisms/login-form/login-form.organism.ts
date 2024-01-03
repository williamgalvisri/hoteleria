import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonAtom } from '@shared/components/atoms/button/button.atom';
import { CardAtom } from '@shared/components/atoms/card/card.atom';
import { InputAtom } from '@shared/components/atoms/input/input.atom';
import { OptionAtom } from '@shared/components/atoms/option/option.atom';
import { EmailMolecule } from '@shared/components/molecules/email-input/email-input.molecule';
import { OptionGroupModel } from '@shared/components/molecules/option-group/option-group.model';
import { OptionGroupMolecule } from '@shared/components/molecules/option-group/option-group.molecule';
import { PasswordInputMolecule } from '@shared/components/molecules/password-input/password-input.molecule';
import { GetFormControlPipe } from '@shared/pipes/get-form-control.pipe';
import { LoginForm, UserTypeEnum } from './login-form.model';
import { LabelAtom } from '@shared/components/atoms/label/label.atom';

const COMPONENTS = [
  InputAtom,
  ButtonAtom,
  CardAtom,
  OptionGroupMolecule,
  EmailMolecule,
  PasswordInputMolecule,
  GetFormControlPipe,
  LabelAtom
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
  loginFormGroup!: FormGroup;
  optionsUserType: OptionGroupModel[] = []

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    this.optionsUserType = [
    // {
    //   value: UserTypeEnum.TRAVELER,
    //   name: 'userType',
    //   label: 'Viajero'
    // },
    {
      value: UserTypeEnum.AGENT,
      name: 'userType',
      label: 'Agente'
    }];
  }

  ngOnInit() {
    this.loginFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      userType: [UserTypeEnum.AGENT]
    });
  }

  login() {
    const values: LoginForm = this.loginFormGroup.value;
    if(UserTypeEnum.AGENT === values.userType) {
      // navigate to admin component
      this.router.navigate(['/admin'])
    } else if(UserTypeEnum.TRAVELER === values.userType)  {
      // navigate to reserva
      this.router.navigate(['/reserva'])
    }
  }

  goToReserva(){
    this.router.navigate(['reserva'])
  }
}
