import {Component, Input} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';

@Component({
  template: `
    <div class="d-flex justify-content-center">
      <button nbButton ghost (click)="value.procedure(value.data)" title="Asociar procedimientos a manual tarifario">
        <nb-icon icon="file-outline"></nb-icon>
      </button>
      <button nbButton ghost (click)="value.procedurelist(value.data)" title="Ver detalle de procedimientos asociados">
        <nb-icon icon="list-outline"></nb-icon>
      </button>
      <button  ngxCheckPerms="update" nbButton ghost (click)="value.edit(value.data)">
        <nb-icon icon="edit-outline"></nb-icon>
      </button>
      <button nbButton ngxCheckPerms="delete" ghost (click)="value.delete(value.data)">
        <nb-icon icon="trash-2-outline"></nb-icon>
      </button>
    </div>
  `,
})
export class ActionsManualComponent implements ViewCell {
  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;  // This holds the entire row object
}
