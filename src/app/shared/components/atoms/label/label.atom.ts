import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'at-label',
  templateUrl: './label.atom.html'
})

export class LabelAtom implements OnInit {
  @Input() for: string = '';
  @Input() size: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '4xl' = 'sm';
  @Input() classesAditional: string = '';

  constructor() { }

  ngOnInit() { }
}
