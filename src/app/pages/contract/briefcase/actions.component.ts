import { Component, Input } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  template: `
    <div class="d-flex justify-content-center">
      <button nbButton  nbTooltip="Editar" *ngIf="value.role_permisos.includes(2)" nbTooltipPlacement="top" nbTooltipStatus="primary" ghost (click)="value.edit(value.data)">
        <nb-icon icon="edit-outline"></nb-icon>
      </button>
      <button nbButton nbTooltip="Eliminar" *ngIf="value.role_permisos.includes(4)" nbTooltipPlacement="top" nbTooltipStatus="primary"ghost (click)="value.delete(value.data)">
        <nb-icon icon="trash-2-outline"></nb-icon>
      </button>
      <a nbTooltip="Asignación de servicios" *ngIf="value.role_permisos.includes(2)" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ghost [routerLink]="'/pages/contract/services-briefcase/' + value.data.id" >
        <nb-icon icon="list-outline"></nb-icon>
      </a>
      <a nbButton nbTooltip="Detalle de portafolio" nbTooltipPlacement="top" nbTooltipStatus="primary" ghost [routerLink]="'/pages/contract/detail-services/' + value.data.id" >
      <nb-icon icon="grid-outline"></nb-icon>
      </a>
    </div>
  `,
})
export class ActionsComponent implements ViewCell {
  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;  // This holds the entire row object

  GoGroup(course_id) {

  }
}
