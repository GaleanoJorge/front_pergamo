import {Component, Input} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';

@Component({
  template: `
    <div class="d-flex justify-content-center">
      <button  nbTooltip="Editar" nbTooltipPlacement="top" nbTooltipStatus="primary" ngxCheckPerms="update" nbButton ghost (click)="value.edit(value.data)">
        <nb-icon icon="edit-outline"></nb-icon>
      </button>
      <button nbTooltip="Eliminar" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ngxCheckPerms="delete" ghost (click)="value.delete(value.data)">
        <nb-icon icon="trash-2-outline"></nb-icon>
      </button>
      <a nbTooltip="Portafolios" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton *ngIf="value.data.procedure_type_id==3" ghost [routerLink]="'/pages/setting/procedure-package/' + value.data.id" >
        <nb-icon icon="list-outline"></nb-icon>
      </a>
    </div>
  `,
})
export class ActionsProcedureComponent implements ViewCell {
  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;  // This holds the entire row object
}
