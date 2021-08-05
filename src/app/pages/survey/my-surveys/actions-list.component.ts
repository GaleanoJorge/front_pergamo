import {Component, Input} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';

@Component({
  template: `
    <div class="d-flex justify-content-center">
      <a nbButton ghost *ngIf="value.data.resolve_sections === value.data.tot_sections"
         routerLink="/pages/survey/summary-surveys/{{encriptId(this.value.data.id)}}">
        <nb-icon icon="checkmark-circle-outline"></nb-icon>
      </a>
      <a nbButton ghost *ngIf="value.data.survey_valid && value.data.resolve_sections < value.data.tot_sections"
         routerLink="/pages/survey/surveys/{{encriptId(this.value.data.id)}}">
        <nb-icon icon="clock-outline"></nb-icon>
      </a>
    </div>
  `,
})
export class ActionsListComponent implements ViewCell {
  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;  // This holds the entire row object

  public encriptId(id) {
    return btoa(id);
  }
}
