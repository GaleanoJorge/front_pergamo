import {Component, Input} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';

@Component({
  template: `
    <div class="d-flex justify-content-center">
      <a nbButton ghost [routerLink]="'/pages/survey/surveys/' + value.data.id + '/edit'">
        <nb-icon icon="edit-outline"></nb-icon>
      </a>
      <button nbButton ghost (click)="value.delete(value.data)">
        <nb-icon icon="trash-2-outline"></nb-icon>
      </button>
      <a nbButton ghost [routerLink]="'/pages/survey/surveys/' + value.data.id + '/scheduled-surveys'"
         title="Encuestas programadas">
        <nb-icon icon="calendar-outline"></nb-icon>
      </a>
      <ngx-actions-report-surveys [survey_id]="value.data.id"></ngx-actions-report-surveys>
    </div>
  `,
})
export class ActionsComponent implements ViewCell {
  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;  // This holds the entire row object
}
