import {Component, Input} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';

@Component({
  template: `
    <div >
      <a 
         [routerLink]="'/pages/admissions/students-massive/course-massive/' + value.data.id">
        {{ value.data.course }}
      </a>
    </div>
  `,
})
export class StatsMassiveComponent implements ViewCell {

  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;  // This holds the entire row object

  constructor() {
  }
}
