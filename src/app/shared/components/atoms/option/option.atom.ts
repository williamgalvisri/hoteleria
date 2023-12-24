import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'at-option',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './option.atom.html',
  styleUrl: './option.atom.css'
})

export class OptionAtom implements OnInit {
  @Input() title: string = '';
  @Input() id: string = '';
  @Input() name: string = '';
  @Input() value: string = '';
  @Input() control: FormControl = new FormControl();

  get selected() {
    return this.control.value;
  }
  constructor() { }

  ngOnInit() { }
}
