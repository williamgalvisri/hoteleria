import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RepositoryModule } from '@repositories/repository.module';
import { ButtonAtom } from '@shared/components/atoms/button/button.atom';
import { CardAtom } from '@shared/components/atoms/card/card.atom';
import { InputAtom } from '@shared/components/atoms/input/input.atom';
import { EmailMolecule } from '@shared/components/molecules/email-input/email-input.molecule';
import { PasswordInputMolecule } from '@shared/components/molecules/password-input/password-input.molecule';
import { LoginFormOrganism } from '@shared/components/organisms/login-form/login-form.organism';
import { GetFormControlPipe } from '@shared/pipes/get-form-control.pipe';


const COMPONENTS = [
  ButtonAtom,
  LoginFormOrganism
];


@Component({
  selector: 'pg-login',
  standalone: true,
  imports: [...COMPONENTS],
  templateUrl: './login.page.html',
  styleUrl: './login.page.css'
})

export class LoginPage implements OnInit {
  darkMode: boolean = false;

  constructor(private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.hasDarkMode()
  }

  hasDarkMode() {
    if (localStorage['color-theme'] === 'dark' ) {
      this.darkMode = false;
      document.documentElement.classList.add('dark');
    } else {
      this.darkMode = true;
      document.documentElement.classList.remove('dark');
    }
  }

  activateDarkMode(value: boolean){
    this.darkMode = !value;
    if (localStorage.getItem('color-theme')) {
      if (localStorage.getItem('color-theme') === 'light') {
          document.documentElement.classList.add('dark');
          localStorage.setItem('color-theme', 'dark');
      } else {
          document.documentElement.classList.remove('dark');
          localStorage.setItem('color-theme', 'light');
      }
    } else {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
            this.darkMode = false;
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
            this.darkMode = true;
        }
    }
  }
}
