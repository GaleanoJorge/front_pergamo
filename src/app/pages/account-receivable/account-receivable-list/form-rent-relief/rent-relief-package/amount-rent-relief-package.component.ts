import {Component, Input} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';

@Component({
  template: `
  <div class="d-flex justify-content-center">
      <div class="currency_sign">$</div>
      <input type="number" nbInput fullWidth id="amount" amount [value]="value.amount"
      (change)="value.onchange($event, value.data)" [disabled]="value.enabled" />
  </div>
  `,
  styleUrls: ['./rent-relief-package.component.scss'],
})
export class AmountRentReliefPackageComponent implements ViewCell {
  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;
}
