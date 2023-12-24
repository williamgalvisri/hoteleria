import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'at-card',
  templateUrl: './card.atom.html'
})

export class CardAtom implements OnInit {
  @Input() width: 'xs' | 'base' = 'base'
  constructor() { }

  ngOnInit() { }
}
