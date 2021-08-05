import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-table-lms-integration',
  templateUrl: './table-lms-integration.component.html',
  styleUrls: ['./table-lms-integration.component.scss']
})
export class TableLmsIntegrationComponent implements OnInit {

  @Input() settings: any;
  @Input() source: any;

  constructor() { }

  ngOnInit(): void {
  }

}
