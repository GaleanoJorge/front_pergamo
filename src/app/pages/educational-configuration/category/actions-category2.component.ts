import { Component, Input, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import { CategoryBusinessService } from '../../../business-controller/category-business.service';

@Component({
  template: `
    <div class="d-flex justify-content-center">
      <button nbButton ghost (click)="value.delete(value.data)">
        <nb-icon icon="trash-2-outline"></nb-icon>
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionsCategory2Component implements ViewCell {
  @Input() value: any;
  @Input() rowData: any;
}
