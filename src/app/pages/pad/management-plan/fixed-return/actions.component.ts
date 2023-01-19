import { Component, Input } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  template: `
    <div class="d-flex justify-content-center">
       <button nbTooltip="DEVOLVER" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ghost (click)="value.returned(value.data)">
        <nb-icon icon="flip-2-outline"></nb-icon>
      </button>
    </div>
  `,
})
export class ActionsRetuPatientComponent implements ViewCell {
  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;  // This holds the entire row object

}
