import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ngx-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit {

  @Input() routes: any[];

  constructor() { }

  ngOnInit(): void { }

}
