import { Component, OnInit } from '@angular/core';
import { ButtonAtom } from '@shared/components/atoms/button/button.atom';
import { LabelAtom } from '@shared/components/atoms/label/label.atom';

@Component({
  standalone: true,
  imports: [LabelAtom, ButtonAtom, ],
  selector: 'tp-rooms',
  templateUrl: 'rooms.template.html'
})

export class RoomsTemplate implements OnInit {
  rooms: any[] = [];
  constructor() { }

  ngOnInit() { }
}
