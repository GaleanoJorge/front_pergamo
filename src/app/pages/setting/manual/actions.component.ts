import {Component, Input} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';

@Component({
  template: `
    <div class="d-flex justify-content-center">
      <button nbButton nbTooltip="Asociar procedimientos a manual tarifario" nbTooltipPlacement="top" nbTooltipStatus="primary"  ghost (click)="value.procedure(value.data)" title="Asociar procedimientos a manual tarifario">
        <nb-icon icon="file-outline"></nb-icon>
      </button>
      <button nbButton nbTooltip="Ver detalle de procedimientos asociados" nbTooltipPlacement="top" nbTooltipStatus="primary" ghost (click)="value.procedurelist(value.data)" title="Ver detalle de procedimientos asociados">
        <nb-icon icon="list-outline"></nb-icon>
      </button>
      <button  ngxCheckPerms="update" nbButton nbTooltip="Editar" nbTooltipPlacement="top" nbTooltipStatus="primary"  ghost (click)="value.edit(value.data)">
        <nb-icon icon="edit-outline"></nb-icon>
      </button>
      <button nbButton nbTooltip="Eliminar" nbTooltipPlacement="top" nbTooltipStatus="primary" ngxCheckPerms="delete" ghost (click)="value.delete(value.data)">
        <nb-icon icon="trash-2-outline"></nb-icon>
      </button>
    </div>
  `,
})
export class ActionsManualComponent implements ViewCell {
  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;  // This holds the entire row object
}
