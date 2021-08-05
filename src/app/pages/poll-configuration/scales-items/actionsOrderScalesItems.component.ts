import {Component, Input, OnInit} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';

@Component({
  template: `
    <div class="d-flex justify-content-center">
      <button *ngIf="value.data.order>1" nbButton ghost (click)="value.up(value.data)">
        <nb-icon icon="arrow-circle-up-outline"></nb-icon>
      </button>
      <button *ngIf="value.data.order < value.total" nbButton ghost
              (click)="value.down(value.data)">
        <nb-icon icon="arrow-circle-down-outline"></nb-icon>
      </button>
    </div>
  `,
})
export class ActionsOrderScalesItemsComponent implements ViewCell {
  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;  // This holds the entire row object
}
