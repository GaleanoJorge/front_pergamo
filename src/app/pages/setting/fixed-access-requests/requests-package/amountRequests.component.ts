import { Component, Input } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  template: `
  <div class="d-flex justify-content-center">
      <input type="number" nbInput fullWidth id="amount" amount [value]="value.amount"
      (change)="value.onchange($event, value.data)" [disabled]="value.enabled" />
  </div>
  `,
  styleUrls: ['./requests-package.component.scss'],
})
export class AmountRequestsComponent implements ViewCell {
  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;
}