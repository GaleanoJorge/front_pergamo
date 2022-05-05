import { Component, Input, TemplateRef } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';


@Component({
  template: `
  <div class="d-flex justify-content-center">
      <button nbTooltip="Adjuntar Planilla seguridad" nbTooltipPlacement="top" nbTooltipStatus="primary"
          ngxCheckPerms="update" nbButton ghost (click)="value.edit(value.data)">
          <nb-icon icon="paper-plane-outline"></nb-icon>
      </button>
      <button nbTooltip="Pagar" nbTooltipPlacement="top" nbTooltipStatus="primary" ngxCheckPerms="update" nbButton ghost
          (click)="value.edit(value.data)">
          <nb-icon icon="diagonal-arrow-right-up-outline"></nb-icon>
      </button>
      <button nbTooltip="Ver soportes" nbTooltipPlacement="top" nbTooltipStatus="primary" ngxCheckPerms="update" nbButton ghost
          (click)="value.view(value.data)">
          <nb-icon icon="eye-outline"></nb-icon>
      </button>
      <div *ngIf="value.data.gross_value_activities > 50 && value.data.has_retention == 0">
          <button nbTooltip="Alivios de Renta" nbTooltipPlacement="top" nbTooltipStatus="primary" ngxCheckPerms="update" nbButton ghost
              (click)="value.rent(value.data)">
              <nb-icon icon="trending-down-outline"></nb-icon>
          </button>
      </div>
      <a nbTooltip="Ver actividades" ngxCheckPerms="create" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton
          ghost [routerLink]="'/pages/account-receivable/bill-user-activity/' + value.data.id">
          <nb-icon icon="archive-outline"></nb-icon>
      </a>
  </div>
  `,
  styleUrls: ['./account-receivable-list.component.scss'],
})
export class Actions2Component implements ViewCell {
  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;  // This holds the entire row object



  constructor(

  ) {
  }

  async ngOnInit() {

  }


}
