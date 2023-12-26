import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { LabelAtom } from '@shared/components/atoms/label/label.atom';
import { TextAreaAtom } from '@shared/components/atoms/text-area/text-area.atom';

@Component({
  standalone: true,
  imports: [LabelAtom, TextAreaAtom, CommonModule],
  selector: 'ml-text-area-input',
  templateUrl: './text-area-input.molecule.html',
  styleUrl: './text-area-input.molecule.html'
})

export class TextAreaMolecule implements OnInit {
  @Input() control: FormControl = new FormControl();
  @Input() placeholder: string = '';
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
