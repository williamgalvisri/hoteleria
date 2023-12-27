import { Pipe, PipeTransform } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { OptionType } from '@shared/components/atoms/select/model/select.model';

@Pipe({
  name: 'getTextFromOptions',
  standalone: true
})

export class GetTextFromOptionPipe implements PipeTransform {
  transform(key: any, options: OptionType[]): string {
    const find = options.find(x => x.value === key)?.text ?? 'N/A'
    return find
  }
}
