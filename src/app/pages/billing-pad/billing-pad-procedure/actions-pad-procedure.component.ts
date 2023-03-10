import { Component, Input, TemplateRef } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { ViewCell } from 'ng2-smart-table';
import { AuthStatusService } from '../../../business-controller/auth-status.service';

@Component({
    template: `
    <div class="d-flex justify-content-center" style="align-items: center;">
    <div nbTooltip="{{this.tooltip}}" nbTooltipStatus="primary" *ngIf="this.value.route == 2" class = "cuadro" 
        [style]="this.semaphore == 0 ? 'background-color: #FF0000;' : 
        this.semaphore == 1 ? 'background-color: #7A39BB;' : 
        this.semaphore == 2 ? 'background-color: #44E431;' : 
        this.semaphore == 3 ? 'background-color: #FBE336;' : 
        'background-color: #54bcc1' "
        >
    </div>
        <button *ngIf="value.data.auth_package.length > 0" nbTooltip="VER CONTENIDO" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ghost (click)="value.show(value.data, value.route)">
            <nb-icon icon="eye-outline"></nb-icon>
        </button>
    </div>
  `,
    styleUrls: ['./billing-pad-procedure.component.scss'],
})
export class ActionsPadProcedureComponent implements ViewCell {
    @Input() value: any;    // This hold the cell value
    @Input() rowData: any;  // This holds the entire row object


    public dialog;
    public auth_status: any[] = [];
    public semaphore: any;
    public tooltip: any;


    constructor(
        private dialogService: NbDialogService,
        private authStatusS: AuthStatusService,

    ) {
    }

    async ngOnInit() {
        this.semaphore = this.getByStatus(this.value.data);
    }

    getByStatus(data: any) {
        var response = 0;
        if (data.assigned_management_plan != null) {
            if (data.assigned_management_plan.execution_date == "0000-00-00 00:00:00") {
                response = 0;
                this.tooltip = 'Sin ejecutar';
            } else if (data.billing_pad_status == 'FACTURADA') {
                response = 2;
                this.tooltip = 'Facturado';
            } else if (data.auth_status_id != 3) {
                response = 1;
                this.tooltip = 'Sin autorizar';
            } else if (data.assigned_management_plan.approved != 1) {
                response = 4;
                this.tooltip = 'Sin aprobar';
            } else {
                response = 3;
                this.tooltip = 'Por facturar';
            }
        } else if (data.ch_interconsultation != null) {
            var a = data.ch_interconsultation.many_ch_record;
            var b = a.find(item => item.created_at == data.created_at)
            if (b && b.date_finish == "0000-00-00 00:00:00") {
                response = 0;
                this.tooltip = 'Sin ejecutar';
            } else if (data.billing_pad_status == 'FACTURADA') {
                response = 2;
                this.tooltip = 'Facturado';
            } else if (data.auth_status_id != 3) {
                response = 1;
                this.tooltip = 'Sin autorizar';
            // } else if (data.assigned_management_plan.approved != 1) {
            //     response = 4;
            //     this.tooltip = 'Sin aprobar';
            } else {
                response = 3;
                this.tooltip = 'Por facturar';
            }
        } else {
            if (data.pendientes) {
                if (data.billing_pad_status == 'FACTURADA') {
                    response = 2;
                    this.tooltip = 'Facturado';
                } else if (data.auth_status_id != 3) {
                    response = 1;
                    this.tooltip = 'Sin autorizar';
                } else if (data.pendientes > 0 && !data.location_id) {
                    response = 4;
                    this.tooltip = 'Sin aprobar: ' + data.pendientes;
                } else {
                    response = 3;
                    this.tooltip = 'Por facturar';
                }
            } else {
                if (data.billing_pad_status == 'FACTURADA') {
                    response = 2;
                    this.tooltip = 'Facturado';
                } else if (data.auth_status_id != 3) {
                    response = 1;
                    this.tooltip = 'Sin autorizar';
                } else {
                    response = 3;
                    this.tooltip = 'Por facturar';
                }
            }
        }
        return response;
    }

    ConfirmAction(dialog: TemplateRef<any>) {
        this.dialog = this.dialogService.open(dialog);
        this.GetResponseParam()
    }

    GetResponseParam() {

    }

}
