import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { LabelAtom } from '@shared/components/atoms/label/label.atom';
import { OptionType } from '@shared/components/atoms/select/model/select.model';
import { SelectAtom } from '@shared/components/atoms/select/select.atom';

@Component({
  standalone: true,
  imports: [LabelAtom, SelectAtom, CommonModule],
  selector: 'ml-select-input',
  templateUrl: './select-input.molecule.html',
  styleUrl: './select-input.molecule.html'
})

export class SelectMolecule implements OnInit {
  @Input() control: FormControl = new FormControl();
  @Input() id: string = '';
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() options: OptionType[] = [];
  @Input() selected: string = '';


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
