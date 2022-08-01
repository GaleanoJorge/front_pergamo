import {Component, Input} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';
@Component({
  template: `
    <div class="d-flex justify-content-center">
      <button nbTooltip="Eliminar" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ghost (click)="value.delete(value.data)">
        <nb-icon icon="trash-2-outline"></nb-icon>
      </button>
      <button nbTooltip="Editar" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ghost (click)="value.edit(value.data)">
        <nb-icon icon="edit-outline"></nb-icon>
      </button>
      <button *ngIf="value.data.manual_procedure_type_id==3 && ProcedurePackage" nbButton ghost [nbPopover]="templateRef" nbPopoverTrigger="hover">
        <nb-icon icon="info-outline"></nb-icon>
      </button>
      <a *ngIf="value.data.manual_procedure_type_id==3"  nbTooltip="Información del paquete" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ghost [routerLink]="'/pages/setting/manual/procedure-massive/procedure-package/' + value.data.id">
        <nb-icon icon="info-outline"></nb-icon>
      </a>
    </div>
    
  `,
})
export class ActionsComponentProcedure implements ViewCell {
  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;  // This holds the entire row object
  public ProcedurePackage:any[];

  constructor(
  ) {
  }

    
}
