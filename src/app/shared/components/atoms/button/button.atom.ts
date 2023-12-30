import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AtomPropertyBase } from '@shared/components/utils/base-atoms';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'at-button',
  templateUrl: './button.atom.html',
  styleUrl: './button.atom.css'
})

export class ButtonAtom implements OnInit,AtomPropertyBase {
  @Input() type: 'primary' | 'alternative' | 'success' | 'danger' | 'warnning' = 'primary';
  @Input() size: 'xs' | 'sm' | 'base' = 'base';
  @Input() fullWidth: 'full' | 'none' = 'none';
  @Input() disabled: boolean =  false;
  @Input() id: string = ''
  @Input() loading: boolean = false;
  @Input() classesAditional: string = '';
  @Output() onClick = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit() { }

  clickButton() {
    this.onClick.emit(true)
  }
}
