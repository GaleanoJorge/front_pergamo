import { Component, Input } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  template: `
  <div class="d-flex justify-content-center">
      <a nbTooltip="Servicios" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton
          ghost [routerLink]="'/pages/account-receivable/bill-user-activity-patient/' + value.data.id">
          <nb-icon icon="menu-outline"></nb-icon>
      </a>
  </div>
  `,
  styleUrls: ['./account-patient.component.scss'],
})
export class AccountPatientActionsComponent implements ViewCell {
  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;  // This holds the entire row object


  constructor(
  ) {
  }

  async ngOnInit() {
    }

}
