import { Component, Input } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import { environment } from '../../../../environments/environment.prod';

@Component({
  template: `
    <div >
      <a 
         href="{{this.link}}" target="_blank">
         Ver circular
      </a>
    </div>
  `,
})
export class StatsApprovalComponent implements ViewCell {

  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;  // This holds the entire row object
  public link: any;

  constructor() {
  }
  ngOnInit(): void {
    this.link = environment.storage + this.value.data.approval_file;
  }
}
