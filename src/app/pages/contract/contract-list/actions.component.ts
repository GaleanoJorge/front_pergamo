import {Component, Input} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';

@Component({
  template: `
    <div class="d-flex justify-content-center">
      <button nbButton nbTooltip="Editar" nbTooltipPlacement="top" nbTooltipStatus="primary" ghost (click)="value.edit(value.data)">
        <nb-icon icon="edit-outline"></nb-icon>
      </button>
      <button nbButton nbTooltip="Eliminar" nbTooltipPlacement="top" nbTooltipStatus="primary" ghost (click)="value.delete(value.data)">
        <nb-icon icon="trash-2-outline"></nb-icon>
      </button>
      <a nbButton  nbTooltip="Portafolios" nbTooltipPlacement="top" nbTooltipStatus="primary" ghost [routerLink]="'/pages/contract/briefcase/' + value.data.id" title="Portafolios">
        <nb-icon icon="list-outline"></nb-icon>
      </a>
      <a nbButton  nbTooltip="Archivos del contrato" nbTooltipPlacement="top" nbTooltipStatus="primary" ghost [routerLink]="'/pages/contract/file-contract/' + value.data.id" title="Archivos del contrato">
        <nb-icon icon="archive-outline"></nb-icon>
      </a>
    </div>
  `,
})
export class Actions2Component implements ViewCell {
  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;  // This holds the entire row object

}
