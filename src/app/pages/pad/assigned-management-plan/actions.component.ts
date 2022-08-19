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
    <a *ngIf="(today >= value.data.start_date && today <= value.data.finish_date && value.data.management_plan.type_of_attention_id!=17)||value.data.allow_redo == 1" nbTooltip="Registro en Historia Clinica" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ghost [routerLink]="'/pages/clinic-history/ch-record-list/' + rowData.management_plan.admissions_id + '/' + value.data.id + '/' + rowData.management_plan.type_of_attention_id" >
    <nb-icon icon="folder-add-outline"></nb-icon>
    </a>
    <a *ngIf=" firsthour > hournow && endhour < hournow && value.data.management_plan.type_of_attention_id==17" nbTooltip="Registro en Historia Clinica Enfermeria" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ghost (click)="value.openEF(value.data)">
    <nb-icon icon="folder-add-outline"></nb-icon>
  </a>
  <button nbTooltip="Editar" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ghost (click)="value.edit(value.data)">
  <nb-icon icon="edit-outline"></nb-icon>
</button>
  </div>
  `,
  styleUrls: ['./assigned-management-plan.component.scss'],
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
  public enddate;
  public showBotton: boolean = false;


  constructor(
    private datePipe: DateFormatPipe,
    private viewHCS: ChRecordService,

  ) {
  }

  async ngOnInit() {

    this.today = new Date;
    this.today2 = new Date;
    this.date = this.value.data.start_date + ' ' + this.value.data.start_hour;
    // console.log(this.rowData);
    // console.log(this.value);



    var firstdate = new Date(new Date(this.date).setHours(new Date(this.date).getHours() + 3));
    var enddate = new Date(new Date(this.date).setHours(new Date(this.date).getHours() - 3));
    this.hournow = this.today2.getTime();
    this.firsthour = firstdate.getTime();
    this.endhour = enddate.getTime();
    this.start = this.value.data.start_date.split('-');
    this.finish = this.value.data.finish_date.split('-');
    let day = this.today.getDate();
    let month = this.today.getMonth() + 1;
    let year = this.today.getFullYear();

    this.today = this.datePipe.transform2(this.today);

  }

}
