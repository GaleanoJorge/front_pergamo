import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  template: `
    <div class="d-flex justify-content-center">
      <button nbTooltip="Editar" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ghost (click)="value.edit(rowData)">  
        <nb-icon icon="edit-outline"></nb-icon>
      </button>
      <button nbTooltip="Eliminar" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ghost (click)="value.delete(rowData)">
        <nb-icon icon="trash-2-outline"></nb-icon>
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionsExtraordinaryComponent implements ViewCell {
  @Input() value: any;
  @Input() rowData: any;
}
