import { Component, Input } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  template: `
  <div class="d-flex justify-content-center">
  <nb-toggle formControlName="iva" iva
  (change)="value.onchange($event, value.data)"[disabled]="value.enabled" >
          </nb-toggle>
          
  </div>
  `,
  styleUrls: ['./prod-billing-package.component.scss'],
})
export class IvaBillingComponent implements ViewCell {
  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;
}
