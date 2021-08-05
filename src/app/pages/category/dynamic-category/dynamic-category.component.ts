import { Component, OnInit, Input } from '@angular/core';
import { Category } from '../../../models/category';

@Component({
  selector: 'ngx-dynamic-category',
  templateUrl: './dynamic-category.component.html',
  styleUrls: ['./dynamic-category.component.scss']
})
export class DynamicCategoryComponent implements OnInit {

  @Input() categories: Category[];

  constructor() { }

  ngOnInit(): void { }

}
