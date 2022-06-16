import { Component, Input } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  template: `
  <div class="d-flex justify-content-center">
      <input type="number" nbInput fullWidth id="amount_damaged" amount_damaged [value]="value.amount_damaged"
      (change)="value.onchange($event, value.data)" [disabled]="value.enabled" />
  </div>
  `,
  styleUrls: ['./income-package.component.scss'],
})
export class AmountDamagedComponent implements ViewCell {
  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;
}