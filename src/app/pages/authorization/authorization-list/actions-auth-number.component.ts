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
        <input type="text" nbInput fullWidth id="amount" amount [value]="value.amount"
        (change)="value.onchange($event, value.data)" [disabled]="value.enabled" />
    </div>
  `,
    styleUrls: ['./authorization-list.component.scss'],
})
export class ActionsAuthNumberComponent implements ViewCell {
    @Input() value: any;    // This hold the cell value
    @Input() rowData: any;  // This holds the entire row object

    // public disabled: boolean = true;

    constructor(

    ) {
    }

    async ngOnInit() {

        // if (this.rowData.auth_status_id == 2) {
        //     this.disabled =false
        // }
    }

   
}
