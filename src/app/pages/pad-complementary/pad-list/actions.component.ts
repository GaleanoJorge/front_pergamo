import { Component, Input, TemplateRef } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { FormGroup, Validators, FormBuilder, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ViewCell } from 'ng2-smart-table';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { GlossResponseService } from '../../../business-controller/gloss-response.service';
import { ObjetionCodeResponseService } from '../../../business-controller/objetion-code-response.service';
import { ObjetionResponseService } from '../../../business-controller/objetion-response.service';
import { CurrencyPipe, Time } from '@angular/common';
import { GlossRadicationService } from '../../../business-controller/gloss-radication.service';
import { GlossService } from '../../../business-controller/gloss.service';
import { date } from '@rxweb/reactive-form-validators';
import { DiagnosisService } from '../../../business-controller/diagnosis.service';
import { UserBusinessService } from '../../../business-controller/user-business.service';
import { time } from 'console';
import { PacMonitoringService } from '../../../business-controller/pac-monitoring.service';

@Component({
    template: `
    <div class="d-flex justify-content-center">
        <a *ngIf="this.edit==false" nbTooltip="Diligenciar seguimiento
        " nbTooltipPlacement="top" nbTooltipStatus="primary" ngxCheckPerms="read" nbButton ghost
            (click)="value.confirm(value.data)">
            <nb-icon icon="checkmark-square-outline"></nb-icon>
        </a>
        <button *ngIf="this.edit==true" nbTooltip="Editar" nbTooltipPlacement="top" nbTooltipStatus="primary"
            ngxCheckPerms="update" nbButton ghost (click)="value.edit(value.data);">
            <nb-icon icon="edit-outline"></nb-icon>
        </button>
    </div>
  `,
    styleUrls: ['./pad-complementary-list.component.scss'],
})
export class Actions2Component implements ViewCell {
    @Input() value: any;    // This hold the cell value
    @Input() rowData: any;  // This holds the entire row object

    public form: FormGroup
    public dialog;
    public diagnosis: any[] = [];
    public profesionals: any[] = [];
    public diagnosis_id;
    public profesional_id;
    public loading: boolean = true;
    public isSubmitted: boolean = false;
    public saved: any = null;
    public monitorings: any[] = [];
    public edit: boolean = false;


    constructor(
        private route: ActivatedRoute,
        private toastService: NbToastrService,
        private formBuilder: FormBuilder,
        private dialogService: NbDialogService,
        private pacMonitoringService: PacMonitoringService,
        private DiagnosisS: DiagnosisService,
        private objetionResponseS: ObjetionResponseService,
        private UserBS: UserBusinessService,

    ) {
    }

    async ngOnInit() {
        if (this.rowData.admissions) {
            if (this.rowData.admissions[this.rowData.admissions.length - 1].discharge_date != "0000-00-00 00:00:00") {
                this.edit = true;
            } else {
                this.edit = false;
            }
        } else if (this.rowData.pac_monitoring) {
            this.edit = true
        } else {
            this.edit = false;
        }

    }

    ConfirmAction(dialog: TemplateRef<any>) {
        this.dialog = this.dialogService.open(dialog);
        this.GetResponseParam()
    }

    GetResponseParam() {

    }
   
}
