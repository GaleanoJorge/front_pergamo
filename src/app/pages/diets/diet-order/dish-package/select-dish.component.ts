import { Component, Input } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  template: `
    <div class="d-flex justify-content-center">
        <nb-checkbox [checked]="value.valid" *ngIf="value.valid" disabled></nb-checkbox>
    </div>
  `,
})
export class SelectDishComponent implements ViewCell {
  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;  // This holds the entire row object
}
