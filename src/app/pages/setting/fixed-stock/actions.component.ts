import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ViewCell } from 'ng2-smart-table';

@Component({
  template: `
    <div class="d-flex justify-content-center">

      <button  nbTooltip="Editar" nbTooltipPlacement="top" nbTooltipStatus="primary" ngxCheckPerms="update" nbButton ghost (click)="value.edit(value.data)">
        <nb-icon icon="edit-outline"></nb-icon>
      </button>

      <button nbTooltip="Agregar usuario" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ngxCheckPerms="delete" ghost (click)="value.user(value.data)">
        <nb-icon icon="people-outline"></nb-icon>
      </button>

      <button nbTooltip="Eliminar" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ngxCheckPerms="delete" ghost (click)="value.delete(value.data)">
        <nb-icon icon="trash-2-outline"></nb-icon>
      </button>

    </div>
  `,
})
export class ActionFixedComponent implements ViewCell {
  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;  // This holds the entire row object
}

