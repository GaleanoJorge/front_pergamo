import { Component, Input, TemplateRef } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ViewCell } from 'ng2-smart-table';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { GlossResponseService } from '../../../business-controller/gloss-response.service';
import { ObjetionCodeResponseService } from '../../../business-controller/objetion-code-response.service';
import { ObjetionResponseService } from '../../../business-controller/objetion-response.service';
import { CurrencyPipe } from '@angular/common';
import { GlossRadicationService } from '../../../business-controller/gloss-radication.service';
import { GlossService } from '../../../business-controller/gloss.service';
import { date } from '@rxweb/reactive-form-validators';
import { DateFormatPipe } from '../../../pipe/date-format.pipe';
import { timeStamp } from 'console';
import { ChRecordService } from '../../../business-controller/ch_record.service';

@Component({
  template: `
  <div class="d-flex justify-content-center">
    <button nbTooltip="Registro en Historia Clinica" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ghost [routerLink]="'/pages/pah/interconsultation/' + value.admission_id + '/' + value.data.id + '/' + (value.data.type_of_attention_id != null ? value.data.type_of_attention_id : -1)" >
    <nb-icon icon="folder-add-outline"></nb-icon>
    </button>
  </div>
  `,
  styleUrls: ['./instance-admission.component.scss'],
})
export class Actions4Component implements ViewCell {
  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;  // This holds the entire row object

  public today;
  public today2;
  public start;
  public hournow;
  public firsthour;
  public endhour;
  public date;
  public finish;
  public firstdate;
  public first_date_temp;
  public final_date_temp;
  public enddate;
  public showBotton: boolean = false;


  constructor(
    private datePipe: DateFormatPipe,
    private viewHCS: ChRecordService,
    private toastService: NbToastrService,
  ) {
  }

  async ngOnInit() {

  }
}
