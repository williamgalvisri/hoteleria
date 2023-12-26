import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { AtomPropertyBase } from '@shared/components/utils/base-atoms';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'at-card',
  templateUrl: './card.atom.html',
  styleUrl: './card.atom.css',
})

export class CardAtom implements OnInit, AtomPropertyBase {
  @Input() id: string = '';
  @Input() width: 'xs' | 'base' = 'base';
  @Input() classesAditional: string = '';

  constructor() { }

  ngOnInit() { }
}
