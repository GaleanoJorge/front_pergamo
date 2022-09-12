import { Component, Input } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  template: `
    <div class="d-flex justify-content-center">
      <button nbTooltip="Ver agendas" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ghost
        [routerLink]="'/pages/scheduling/medical-diary/medical/' + value.data.assistance_id + '/' + value.data.id">
        <nb-icon icon="grid-outline"></nb-icon>
      </button>
      <button
        nbTooltip="Asignar CUPS" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ghost 
        (click)="value.assign(value.data)">
        <nb-icon icon="camera-outline"></nb-icon>
      </button>
    </div>
  `,
})
export class ActionsMedicalDiaryComponent implements ViewCell {
  @Input() value: any; // This hold the cell value
  @Input() rowData: any; // This holds the entire row object
}
