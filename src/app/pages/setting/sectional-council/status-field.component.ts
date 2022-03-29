import {Component, Input} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';

@Component({
  template: `
    <div>
      <button nbButton size="tiny" status="{{ value.data.status_id == 1 ? 'info' : 'danger' }}"
              (click)="value.changeState(value.data)">
        {{ value.data.status.name }}
      </button>
    </div>
  `,
})
export class StatusFieldComponent implements ViewCell {
  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;  // This holds the entire row object
}
