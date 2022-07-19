import { Component, Input, TemplateRef } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { ViewCell } from 'ng2-smart-table';
import { AuthStatusService } from '../../../business-controller/auth-status.service';

@Component({
    template: `
    <div class="d-flex justify-content-center">
      <a nbTooltip="Portafolios" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ghost [routerLink]="'/pages/billing-pad/billing-pad-briefcase/' + value.data.id">
        <nb-icon icon="options-2-outline"></nb-icon>
      </a>
    </div>
  `,
    styleUrls: ['./billing-pad-contracts.component.scss'],
})
export class ActionsBillingPadContracsComponent implements ViewCell {
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
