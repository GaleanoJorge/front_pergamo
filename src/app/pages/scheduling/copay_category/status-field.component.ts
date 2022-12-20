import {Component, Input} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';
import {UserBusinessService} from '../../../business-controller/user-business.service';

@Component({
  template: `
    <div>
      <div *ngIf="!value.aditional">
        <button *ngIf="userBs.CheckPermission(value.permission ? value.permission : 'update')" nbButton size="tiny"
               status="{{ value.data.status_id == 1 ? 'primary' : 'danger' }}"
               (click)="value.changeState(value.data)">
         {{ value.data.status.name }}
       </button>

        <button *ngIf="!userBs.CheckPermission(value.permission ? value.permission : 'update')" nbButton size="tiny"
                status="{{ value.data.status_id == 1 ? 'primary' : 'danger' }}"
                style="cursor: not-allowed">
          {{ value.data.status.name }}
        </button>
      </div>
      <div *ngIf="value.aditional">
        <button nbButton size="tiny"
               status="{{ value.data.status.id == 1 ? 'primary' : 'danger' }}"
              (click)="value.changeState(value.data)">
         {{ value.data.status.name }}
       </button>
      </div>
    </div>
  `,
})
export class StatusFieldComponent implements ViewCell {
  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;  // This holds the entire row object

  constructor(
    public userBs: UserBusinessService,
  ) {
  }
}
