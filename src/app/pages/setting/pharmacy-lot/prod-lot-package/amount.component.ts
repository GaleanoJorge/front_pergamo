import { Component, Input } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  template: `
  <div class="d-flex justify-content-center">
      <input type="number" nbInput fullWidth id="amount_total" amount_total [value]="value.amount_total"
      (change)="value.onchange($event, value.data)" [disabled]="value.enabled" />
  </div>
  `,
})
export class AmountComponent implements ViewCell {
  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;
}
