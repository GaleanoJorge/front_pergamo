import { Component, Input, TemplateRef } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { ViewCell } from 'ng2-smart-table';
import { AuthStatusService } from '../../../business-controller/auth-status.service';

@Component({
    template: `
    <div class="d-flex justify-content-center">
      <button nbTooltip="PROCEDIMIENTOS" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ghost [routerLink]="'/pages/billing-pad/billing-pad-procedure/' + value.data.admissions_id + '/' + value.data.id">
        <nb-icon icon="archive-outline"></nb-icon>
      </button>
      <button *ngIf="value.data.billing_pad_status_id == 2" nbTooltip="VER FACTURACIÓN" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ghost (click)="value.show(value.data)">
          <nb-icon icon="eye-outline"></nb-icon>
      </button>
    </div>
  `,
    styleUrls: ['./billing-admission.component.scss'],
})
export class ActionsBillingComponent implements ViewCell {
    @Input() value: any;    // This hold the cell value
    @Input() rowData: any;  // This holds the entire row object


    public dialog;
    public auth_status: any[] = [];


    constructor(
        private dialogService: NbDialogService,
        private authStatusS: AuthStatusService,

    ) {
    }

    async ngOnInit() {
    }

    ConfirmAction(dialog: TemplateRef<any>) {
        this.dialog = this.dialogService.open(dialog);
        this.GetResponseParam()
    }

    GetResponseParam() {

    }

}
