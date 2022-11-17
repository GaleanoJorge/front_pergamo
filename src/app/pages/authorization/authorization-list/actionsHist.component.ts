import { Component, Input, TemplateRef } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  template: `
  <div class="d-flex justify-content-center">
    <button *ngIf="!this.rowData.assigned_management_plan_id && !this.rowData.fixed_add_id" nbTooltip="Ver contenido de paquete autorizado" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ghost (click)="value.view(value.data)">
        <nb-icon icon="eye-outline"></nb-icon>
    </button>
  </div>
  
  `,
})
export class ActionsHistComponent implements ViewCell {
  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;  // This holds the entire row object



  constructor(
  ) {
  }
  ngOnInit() {
  }


}
