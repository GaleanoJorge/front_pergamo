import {Component, Input, ChangeDetectionStrategy} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';

@Component({
  template: `
    <div class="d-flex justify-content-center">
      <a nbButton ghost routerLink="/pages/educationalconfiguration/origin/{{value.data.id}}/edit">
        <nb-icon icon="edit-outline"></nb-icon>
      </a>
      <button nbButton ghost (click)="value.delete(value.data)">
        <nb-icon icon="trash-2-outline"></nb-icon>
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionsOriginComponent implements ViewCell {
  @Input() value: any;
  @Input() rowData: any;
}
