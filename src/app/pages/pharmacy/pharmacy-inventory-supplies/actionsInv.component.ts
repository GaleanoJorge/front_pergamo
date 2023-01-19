import {Component, Input} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';

@Component({
  template: `
    <div class="d-flex justify-content-center">
      <button nbTooltip="ENVIO SEDES" nbTooltipPlacement="top" nbTooltipStatus="primary"  ngxCheckPerms="update" nbButton ghost (click)="value.edit(value.data)">
        <nb-icon icon="shopping-bag-outline"></nb-icon>
      </button>
      <!-- <button nbTooltip="PERSONAL ASISTENCIAL" nbTooltipPlacement="top" nbTooltipStatus="primary"  ngxCheckPerms="update" nbButton ghost (click)="value.edit1(value.data)">
      <nb-icon icon="person-outline"></nb-icon>
    </button> -->
     
    </div>
  `,
})
export class ActionsInvSupComponent implements ViewCell {
  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;  // This holds the entire row object
}
