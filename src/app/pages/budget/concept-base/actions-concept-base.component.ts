import {Component, Input} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';

@Component({
  template: `
    <div class="d-flex justify-content-center">
      <a ngxCheckPerms="update" nbButton ghost [routerLink]="'/pages/budget/concepts/' + value.data.id + '/edit'" [queryParams]="{
        municipality_id: value.data.municipality_id
      }">
        <nb-icon icon="edit-outline"></nb-icon>
      </a>
      <button ngxCheckPerms="delete" nbButton ghost (click)="value.delete(value.data)">
        <nb-icon icon="trash-2-outline"></nb-icon>
      </button>
    </div>
  `,
})
export class ActionsConceptBaseComponent implements ViewCell {
  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;  // This holds the entire row object
}
