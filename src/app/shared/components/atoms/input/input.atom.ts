import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

export type InputAtomTypes = 'text' | 'password' | 'email' | 'number';

@Component({
  standalone: true,
  selector: 'at-input',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './input.atom.html',
  styleUrl: './input.atom.css'
})

export class InputAtom implements OnInit {
  @Input() id: string = '';
  @Input() name: string = '';
  @Input() placeholder: string = '';
  @Input() type: InputAtomTypes = 'text';
  @Input() control: FormControl  =  new FormControl()

  constructor() { }

  ngOnInit() { }
}
