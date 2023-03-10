import { Component, Input } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  template: `
    <div class="d-flex justify-content-center">
    <button nbTooltip="NO DISPONIBLE" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ghost (click)="value.returned(value.data)">
    <nb-icon icon="flip-2-outline"></nb-icon>
  </button>
      <button nbTooltip="DESPACHO" nbTooltipPlacement="top" nbTooltipStatus="primary"  ngxCheckPerms="update" nbButton ghost (click)="value.edit(value.data)">
        <nb-icon icon="arrowhead-up-outline"></nb-icon>
      </button> 
    </div>
  `,
})
export class ActionsAssReqPatientComponent implements ViewCell {
  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;  // This holds the entire row object
}
