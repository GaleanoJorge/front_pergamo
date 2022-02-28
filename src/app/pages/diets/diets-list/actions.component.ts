import {Component, Input} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';

@Component({
  template: `
    <div class="d-flex justify-content-center">
      <button nbTooltip="PLATOS" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ghost (click)="value.edit(value.data)">
        <nb-icon icon="eye-outline"></nb-icon>
      </button>
      <button nbTooltip="DESPACHAR" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ghost (click)="value.delete(value.data)">
        <nb-icon icon="checkmark-square-outline"></nb-icon>
      </button>
    </div>
  `,
})
export class Actions2Component implements ViewCell {
  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;  // This holds the entire row object

}
