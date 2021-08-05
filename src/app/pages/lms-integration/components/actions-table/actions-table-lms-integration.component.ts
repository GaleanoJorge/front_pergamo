import {Component, Input} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';

@Component({
  template: `
    <div class="d-flex justify-content-center" *ngIf="value.btndetail || value.btnCompetence">
      <button nbButton status="primary" *ngIf="value.btndetail" (click)="value.detail(value.data)" [title]="value.titleDetail">
        <nb-icon icon="eye-outline"></nb-icon>
      </button>
      <button (click)="value.competences(value.data)" nbButton status="primary" title="Competencias" *ngIf="value.btnCompetence">
        <nb-icon icon="checkmark-square-outline"></nb-icon>
      </button>
    </div>
    <div class="d-flex justify-content-center" *ngIf="!value.btndetail && !value.btnCompetence">
    </div>
  `,
})
export class ActionsTableLmsIntegrationComponent implements ViewCell {
  @Input() value: any;
  @Input() rowData: any;
}
