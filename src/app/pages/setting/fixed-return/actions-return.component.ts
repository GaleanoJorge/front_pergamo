import {Component, Input} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';

@Component({
  template: `
  <div class="d-flex justify-content-center">
  <button *ngIf="value.data.status!='ACEPTADO'" nbTooltip="ACEPTAR" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ghost (click)="value.edit(value.data)">
    <nb-icon icon="arrowhead-up-outline"></nb-icon>
  </button>

  <!-- <button nbTooltip="ELIMINAR" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ghost (click)="value.delete(value.data)">
    <nb-icon icon="trash-2-outline"></nb-icon>
  </button> -->
</div>
`,
})
export class ActionsReturnSedComponent implements ViewCell {
  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;  // This holds the entire row object

}
