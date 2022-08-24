import { Component, Input } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  template: `
  <div class="d-flex justify-content-center">
      <input type="text"  oninput="this.value = this.value.toUpperCase()" nbInput fullWidth id="lot" lot [value]="value.lot"
      (change)="value.onchange($event, value.data)" [disabled]="value.enabled" />
  </div>
  `,
})
export class LotComponent implements ViewCell {
  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;
}
