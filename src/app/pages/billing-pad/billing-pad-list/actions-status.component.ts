import { Component, Input, TemplateRef } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { ViewCell } from 'ng2-smart-table';
import { AuthStatusService } from '../../../business-controller/auth-status.service';

@Component({
    template: `
    <div class="d-flex justify-content-center">
      <button nbTooltip="Gestionar servicios" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ghost [routerLink]="'single-location-capacity/' + value.data.admissions_id">
        <nb-icon icon="options-2-outline"></nb-icon>
      </button>
    </div>
  `,
    styleUrls: ['./pre-billing-pad-list.component.scss'],
})
export class ActionsStatusComponent implements ViewCell {
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

        console.log(this.rowData);
        console.log(this.value);


    }

    ConfirmAction(dialog: TemplateRef<any>) {
        this.dialog = this.dialogService.open(dialog);
        this.GetResponseParam()
    }

    GetResponseParam() {

    }

}
