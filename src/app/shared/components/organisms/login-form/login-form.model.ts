import { FormControl } from "@angular/forms";

export enum UserTypeEnum {
  TRAVELER = 'traveler',
  AGENT = 'agent'
}


export interface LoginForm {
  email: string;
  password: string;
  userType: string;
}
