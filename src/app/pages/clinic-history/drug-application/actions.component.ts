import { Component, Input } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  template: `
<div class="d-flex justify-content-center">
  <button *ngIf="this.rowData.disponibles != '0'" nbTooltip="APLICAR" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ghost (click)="value.used(value.data)">
    <nb-icon icon="checkmark"></nb-icon>
  </button>
  <!-- <button nbTooltip="DEVOLVER" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ghost (click)="value.returned(value.data)">
  <nb-icon icon="flip-2"></nb-icon>
  </button> 
  <button *ngIf="this.rowData.disponibles != '0'" nbTooltip="DAÑADO" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ghost (click)="value.damaged(value.data)">
  <nb-icon icon="close"></nb-icon>
  </button>
  -->
</div>
  `,
  styleUrls: ['./drug-application.component.scss'],
})
export class ActionsAplicationsComponent implements ViewCell {
  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;  // This holds the entire row object

  constructor(

  ) {
  }

  async ngOnInit() {

  }

}
