import {Component, Input} from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import {ViewCell} from 'ng2-smart-table';

@Component({
  template: `
    <div class="d-flex justify-content-center">
      <button nbTooltip="Eliminar" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ghost (click)="value.delete(value.data)">
        <nb-icon icon="trash-2-outline"></nb-icon>
      </button>
    </div>
  `,
})
export class ActionsComponentProduct implements ViewCell {
  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;  // This holds the entire row object
  constructor(
    private dialogService: NbDialogService,
  ) {
  }
}
