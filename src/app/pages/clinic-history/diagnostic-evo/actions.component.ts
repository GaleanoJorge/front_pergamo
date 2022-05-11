import {Component, Input} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';

@Component({
  template: `
    <div class="d-flex justify-content-center">
    </div>
    `,
    //<nb-checkbox [checked]="value.valid" (checkedChange)="value.selection($event, value.data)" ></nb-checkbox>
})
export class Actions13Component implements ViewCell {
  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;  // This holds the entire row object
}
