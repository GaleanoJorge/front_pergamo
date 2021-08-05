import { Component, OnInit, Input } from '@angular/core';
import { Item } from '../../../models/item';

@Component({
  selector: 'ngx-dynamic-item',
  templateUrl: './dynamic-item.component.html',
  styleUrls: ['./dynamic-item.component.scss']
})
export class DynamicItemComponent implements OnInit {

  @Input() items: Item[];

  constructor() { }

  ngOnInit(): void {
  }

}
