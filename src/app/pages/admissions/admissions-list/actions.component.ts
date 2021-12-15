import {Component, Input} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';

@Component({
  template: `
    <div class="d-flex justify-content-center">
      <a nbTooltip="Editar" nbTooltipPlacement="top" nbTooltipStatus="primary" ngxCheckPerms="update" nbButton ghost [routerLink]="'../../admissions/patient/' + value.data.id+ '/edit'">
        <nb-icon icon="edit-outline"></nb-icon>
      </a>
      <a nbTooltip="Ingresos del paciente" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton nbButton ghost [routerLink]="'../../admissions/admissions-patient/' + value.data.id">
      <nb-icon icon="list-outline"></nb-icon>
    </a>
    </div>
  `,
})
export class ActionsComponent implements ViewCell {
  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;  // This holds the entire row object
}
