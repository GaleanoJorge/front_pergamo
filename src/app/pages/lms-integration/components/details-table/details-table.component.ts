import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-details-table',
  templateUrl: './details-table.component.html',
  styleUrls: ['./details-table.component.scss'],
})
export class DetailsTableComponent implements OnInit {

  @Input() processData: any;

  constructor() { }

  ngOnInit(): void {
  }

}
