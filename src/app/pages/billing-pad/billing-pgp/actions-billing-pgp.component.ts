import { Component, Input, TemplateRef } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { ViewCell } from 'ng2-smart-table';
import { AuthStatusService } from '../../../business-controller/auth-status.service';
import { BillingPadService } from '../../../business-controller/billing-pad.service';

@Component({
    template: `
    <div class="d-flex justify-content-center">
      <button nbTooltip="Ver Admisiones" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ghost (click)="value.show(value.data)">
        <nb-icon icon="eye-outline"></nb-icon>
      </button>
      <button *ngIf="value.data.billing_pad_status_id == 2" nbTooltip="Anular factura" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ghost (click)="value.cancel(value.data)">
        <nb-icon icon="close-square-outline"></nb-icon>
      </button>
    </div>
  `,
    styleUrls: ['./billing-pgp.component.scss'],
})
export class ActionsBillingPgpComponent implements ViewCell {
    @Input() value: any;    // This hold the cell value
    @Input() rowData: any;  // This holds the entire row object


    public dialog;
    public auth_status: any[] = [];


    constructor(
        private dialogService: NbDialogService,
        private authStatusS: AuthStatusService,
        private BillingPadS: BillingPadService,

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
