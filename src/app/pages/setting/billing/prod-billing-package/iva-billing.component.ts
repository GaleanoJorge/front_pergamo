import { Component, Input } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  template: `
  <div class="d-flex justify-content-center">
      <input nbInput fullWidth id="iva" iva [value]="value.iva"
      (change)="value.onchange($event, value.data)" [disabled]="value.enabled" />
  </div>
  `,
  styleUrls: ['./prod-billing-package.component.scss'],
})
export class IvaBillingComponent implements ViewCell {
  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;
}
