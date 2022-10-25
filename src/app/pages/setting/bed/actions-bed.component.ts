import {Component, Input} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';

@Component({
  template: `
    <div class="d-flex justify-content-center">
      <button *ngIf="this.value.data.status_bed_id != 2" nbTooltip="Editar" nbTooltipPlacement="top" nbTooltipStatus="primary"  ngxCheckPerms="update" nbButton ghost (click)="value.edit(value.data)">
        <nb-icon icon="edit-outline"></nb-icon>
      </button>
      <button *ngIf="this.value.data.status_bed_id != 2" nbTooltip="Eliminar" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ngxCheckPerms="delete" ghost (click)="value.delete(value.data)">
        <nb-icon icon="trash-2-outline"></nb-icon>
      </button>
    </div>
  `,
})
export class ActionsBedComponent implements ViewCell {
  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;  // This holds the entire row object
}
