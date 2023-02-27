import { Component, Input } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  template: `
  <div class="d-flex justify-content-center">
      <input type="number" min="0" pattern="^[0-9]+" nbInput fullWidth id="amount_provition" amount_provition [value]="value.amount_provition"
      (change)="value.onchange($event, value.data)" [disabled]="value.enabled" />
  </div>
  `,
  styleUrls: ['./prod-pharmacy-load-package.component.scss'],
})
export class AmountPharmacyLoadComponent implements ViewCell {
  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;
}
