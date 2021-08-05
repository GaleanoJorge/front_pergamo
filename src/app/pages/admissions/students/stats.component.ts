import {Component, Input} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';

@Component({
  template: `
    <div style="display: flex; justify-content: center">
      <a nbButton status="info" size="small" *ngIf="value.amount.cant"
         [routerLink]="'/pages/admissions/students/course/' + value.data.id" [queryParams]="{
        status: value.amount.inscription_status_id
      }">
        {{ value.amount.cant }}
      </a>
      <button disabled nbButton size="small" *ngIf="!value.amount.cant">
        {{ value.amount.cant }}
      </button>
    </div>
  `,
})
export class StatsComponent implements ViewCell {

  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;  // This holds the entire row object

  constructor() {
  }
}
