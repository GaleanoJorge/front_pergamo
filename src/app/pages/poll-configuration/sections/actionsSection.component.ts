import {Component, Input} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';

@Component({
  template: `
    <div class="d-flex justify-content-center">
      <!--<button nbButton ghost >
      <a routerLink="../questions/{{value.data.id}}/{{value.data.name}}"><nb-icon icon="list-outline"></nb-icon></a>
      </button>-->
      <a nbButton ghost routerLink="/pages/pollconfiguration/sections/{{value.data.id}}/edit">
        <nb-icon icon="edit-outline"></nb-icon>
      </a>
      <button nbButton ghost (click)="value.delete(value.data)">
        <nb-icon icon="trash-2-outline"></nb-icon>
      </button>
    </div>
  `,
})
export class ActionsSectionComponent implements ViewCell {
  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;  // This holds the entire row object
}
