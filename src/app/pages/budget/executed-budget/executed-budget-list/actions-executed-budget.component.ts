import {Component, Input} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';

@Component({
  template: `
    <div class="d-flex justify-content-center">
      <a ngxCheckPerms="update" title="Ejecutar presupuesto logístico" nbButton ghost
         [routerLink]="'/pages/budget/executed/' + value.data.id + '/logistic'">
        <nb-icon icon="layers-outline"></nb-icon>
      </a>

      <a ngxCheckPerms="update" title="Requerir tiquetes" nbButton ghost
         [routerLink]="'/pages/budget/executed/' + value.data.id + '/transport'">
        <nb-icon icon="car-outline"></nb-icon>
      </a>

      <a ngxCheckPerms="update" title="Detalle de tiquetes" nbButton ghost
         [routerLink]="'/pages/budget/executed/' + value.data.id + '/detailt-tickets'">
        <nb-icon icon="paper-plane-outline"></nb-icon>
      </a>

      <button *ngIf="!value.data.is_close" ngxCheckPerms="update" title="Cerrar presupuesto" nbButton ghost (click)="value.closeBudget(value.data)">
        <nb-icon icon="close-circle-outline"></nb-icon>
      </button>
    </div>
  `,
})
export class ActionsExecutedBudgetComponent implements ViewCell {
  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;  // This holds the entire row object
}
