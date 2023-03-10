import {Component, Input} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';

@Component({
  template: `
    <div class="d-flex justify-content-center">
      <button nbTooltip="Editar capacidad Instalada" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ghost [routerLink]="'single-location-capacity/' + value.data.id">
        <nb-icon icon="clipboard-outline"></nb-icon>
      </button>
      <button nbTooltip="Ver capacidad Instalada" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ghost (click)="value.show(value.data)">
        <nb-icon icon="eye-outline"></nb-icon>
      </button>
    </div>
  `,
})
export class ActionsLocationCapacityComponent implements ViewCell {
  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;  // This holds the entire row object

}
