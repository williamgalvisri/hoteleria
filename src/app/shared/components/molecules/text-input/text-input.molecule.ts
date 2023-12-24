import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { InputAtom, InputAtomTypes } from '@shared/components/atoms/input/input.atom';
import { LabelAtom } from '@shared/components/atoms/label/label.atom';

@Component({
  standalone: true,
  imports: [LabelAtom, InputAtom],
  selector: 'ml-text-input',
  templateUrl: './text-input.molecule.html',
  styleUrl: './text-input.molecule.html'
})

export class TextMolecule implements OnInit {
  @Input() control: FormControl = new FormControl();
  @Input() id: string = '';
  @Input() label: string = '';


  get hasRequiredError() {
    return this.control.hasError('required');
  }

  constructor() {
  }

  ngOnInit() {
  }
}
