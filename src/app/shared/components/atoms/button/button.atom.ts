import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'at-button',
  templateUrl: './button.atom.html',
  styleUrl: './button.atom.css'
})

export class ButtonAtom implements OnInit {
  @Input() type: 'primary' | 'alternative' | 'success' | 'danger' | 'warnning' = 'primary';
  @Input() size: 'xs' | 'sm' | 'base' = 'base';
  @Input() fullWidth: 'full' | 'none' = 'none';
  @Input() disabled: boolean =  false;
  constructor() { }

  ngOnInit() { }
}
