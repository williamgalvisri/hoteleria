import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  selector: 'at-text-area',
  templateUrl: 'text-area.atom.html',
  styleUrl: './text-area.atom.css'
})

export class TextAreaAtom implements OnInit {
  @Input() id: string = '';
  @Input() placeholder = '';
  @Input() rows: number = 4;
  @Input() classesAditional: string = '';
  @Input() control: FormControl = new FormControl()
  constructor() { }

  ngOnInit() { }
}
