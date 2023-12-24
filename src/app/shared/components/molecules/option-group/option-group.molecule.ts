import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { OptionGroupModel } from './option-group.model';
import { OptionAtom } from '@shared/components/atoms/option/option.atom';

@Component({
  standalone: true,
  imports:[OptionAtom],
  selector: 'ml-option-group',
  templateUrl: './option-group.molecule.html',
  styleUrl: './option-group.molecule.css'
})

export class OptionGroupMolecule implements OnInit {
  @Input() control: FormControl = new FormControl();
  @Input() options: OptionGroupModel[] = []
  constructor() { }

  ngOnInit() { }
}
