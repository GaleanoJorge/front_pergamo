import { Component, Input } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  template: `
  <div class="d-flex justify-content-center">
      <input type="date" nbInput fullWidth id="expiration_date" expiration_date [value]="value.expiration_date"
      (change)="value.onchange($event, value.data)" [disabled]="value.enabled" />
  </div>
  `,
})
export class DateComponent implements ViewCell {
  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;
}
