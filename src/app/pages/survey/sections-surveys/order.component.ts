import {Component, Input} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';
import {SurveySectionsBusinessService} from '../../../business-controller/survey-sections-business.service';
import {NbToastrService} from '@nebular/theme';

@Component({
  template: `
    <div class="d-flex justify-content-center">
      <button nbButton ghost title="Subir orden" size="large" *ngIf="value.data.order > 1" (click)="ChangeOrder(value.data.id, 'down')">
        <nb-icon icon="arrow-circle-up-outline"></nb-icon>
      </button>
      <button nbButton ghost title="Bajar orden" size="large" *ngIf="value.data.order < value.total" (click)="ChangeOrder(value.data.id, 'up')">
        <nb-icon icon="arrow-circle-down-outline"></nb-icon>
      </button>
    </div>
  `,
})
export class OrderComponent implements ViewCell {
  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;  // This holds the entire row object

  constructor(
    private surveySectionsBS: SurveySectionsBusinessService,
    private toastrService: NbToastrService,
  ) {
  }

  ChangeOrder(id, direcction) {
    this.surveySectionsBS.ChangeOrder(id, direcction).then(x => {
      this.toastrService.success(null, x.message);

      if (this.value.refreshData)
        this.value.refreshData();
    });
  }
}
