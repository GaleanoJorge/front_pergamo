import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';


@Component({
  template: `
    <div>
      <span>{{rowData.program}} : {{rowData.finish_date}}</span>
    </div>
  `,
})
export class ConcatPrograms implements ViewCell, OnInit {

  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;  // This holds the entire row object

  constructor(
  ) {
  }

  ngOnInit() {
    console.log('rowData', this.rowData);
    
  }

  

}
