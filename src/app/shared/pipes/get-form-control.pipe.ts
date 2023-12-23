import { Pipe, PipeTransform } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Pipe({
  name: 'getControl',
  standalone: true
})

export class GetFormControlPipe implements PipeTransform {
  transform(key: any, formGroup: FormGroup): FormControl {
    return formGroup.get(key) as FormControl;
  }
}
