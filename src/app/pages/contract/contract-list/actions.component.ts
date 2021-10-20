import {Component, Input} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';

@Component({
  template: `
    <div class="d-flex justify-content-center">
      <button nbButton ghost (click)="value.edit(value.data)">
        <nb-icon icon="edit-outline"></nb-icon>
      </button>
      <button nbButton ghost (click)="value.delete(value.data)">
        <nb-icon icon="trash-2-outline"></nb-icon>
      </button>
      <a nbButton ghost [routerLink]="'/pages/contract/services-briefcase/' + value.data.id" title="Asignación de catalogo">
        <nb-icon icon="list-outline"></nb-icon>
      </a>
      <a nbButton ghost [routerLink]="'/pages/contract/file-contract/' + value.data.id" title="Archivos del contrato">
        <nb-icon icon="archive-outline"></nb-icon>
      </a>
    </div>
  `,
})
export class Actions2Component implements ViewCell {
  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;  // This holds the entire row object

  GoGroup(course_id) {

  }
}
