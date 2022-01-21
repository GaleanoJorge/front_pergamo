import {Component, Input} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';

@Component({
  template: `
    <div class="d-flex justify-content-center">
      <button nbTooltip="Editar" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ghost (click)="value.edit(value.data)">
        <nb-icon icon="edit-outline"></nb-icon>
      </button>
      <button nbTooltip="Eliminar" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ghost (click)="value.delete(value.data)">
        <nb-icon icon="trash-2-outline"></nb-icon>
      </button>
      <a nbTooltip="Portafolios" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ghost [routerLink]="'/pages/contract/briefcase/' + value.data.id" title="Portafolios">
        <nb-icon icon="list-outline"></nb-icon>
      </a>
      <a  nbTooltip="Poliza" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ghost [routerLink]="'/pages/contract/policy/' + value.data.id" title="Póliza">
        <nb-icon icon="book-open-outline"></nb-icon>
      </a>
      <a nbTooltip="Archivos del contrato" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ghost [routerLink]="'/pages/contract/file-contract/' + value.data.id" title="Archivos del contrato">
        <nb-icon icon="archive-outline"></nb-icon>
      </a>
    </div>
  `,
})
export class Actions2Component implements ViewCell {
  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;  // This holds the entire row object

}
