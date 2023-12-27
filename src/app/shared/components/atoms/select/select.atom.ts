import { Component, Input, OnInit } from '@angular/core';
import { AtomPropertyBase } from '@shared/components/utils/base-atoms';
import { OptionType } from './model/select.model';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  selector: 'at-select',
  templateUrl: 'select.atom.html',
  styleUrl: './select.atom.css'
})

export class SelectAtom implements OnInit, AtomPropertyBase {
  @Input() id: string = '';
  @Input() classesAditional: string = '';
  @Input() placeholder: string = 'Selecciona una opción';
  @Input() options: OptionType[] = [];
  @Input() control: FormControl = new FormControl();
  @Input() selected: string | null = '';
  constructor() { }

  ngOnInit() { }
}
