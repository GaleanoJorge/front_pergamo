import {Component, Input} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';

@Component({
  template: `
    <a nbButton ghost [routerLink]="'/pages/budget/reports/summary-' + value.type"
        [queryParams]="{ subprogram_id: value.data.subprogram_id }"
    >
      {{ value.data.subprogram }}
    </a>
  `,
})
export class LinkSubprogramsComponent implements ViewCell {
  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;  // This holds the entire row object
}
