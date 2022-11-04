import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ViewCell } from 'ng2-smart-table';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { GlossResponseService } from '../../../business-controller/gloss-response.service';
import { ObjetionCodeResponseService } from '../../../business-controller/objetion-code-response.service';
import { ObjetionResponseService } from '../../../business-controller/objetion-response.service';
import { CurrencyPipe } from '@angular/common';
import { GlossRadicationService } from '../../../business-controller/gloss-radication.service';
import { GlossService } from '../../../business-controller/gloss.service';
import { date } from '@rxweb/reactive-form-validators';
import { AuthService } from '../../../services/auth.service';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { ChRecordService } from '../../../business-controller/ch_record.service';
import { ChTypeService } from '../../../business-controller/ch-type.service';
import { DateFormatPipe } from '../../../pipe/date-format.pipe';

@Component({
  template: `
  <div class="d-flex justify-content-center">
    <a *ngIf="value.currentRole == 2 && (firsthour > hournow && endhour < hournow && value.data.management_plan.type_of_attention_id==17)" nbTooltip="Registro en Historia Clinica Enfermeria" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ghost [routerLink]="'/pages/clinic-history/ch-record-list/' + rowData.management_plan.admissions_id + '/' + value.data.id + '/' + rowData.management_plan.type_of_attention_id">
      <nb-icon icon="folder-add-outline"></nb-icon>
    </a>

    <a *ngIf="value.currentRole == 2 && ( today >= start && today <= finish && value.data.management_plan.type_of_attention_id==17)" nbTooltip="Registro en Historia Clinica Enfermeria" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ghost [routerLink]="'/pages/clinic-history/ch-record-list/' + rowData.management_plan.admissions_id + '/' + value.data.id + '/' + rowData.management_plan.type_of_attention_id">
      <nb-icon icon="folder-add-outline"></nb-icon>
    </a>
  </div>
  `,
  styleUrls: ['./pah-applications.component.scss'],
})
export class ActionsPahApplicationsComponent implements ViewCell {
  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;  // This holds the entire row object
  @ViewChild(BaseTableComponent) table: BaseTableComponent;

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
  public startdate;
  public now;
  public showBotton: boolean = false;

  constructor(
    private datePipe: DateFormatPipe,
    private viewHCS: ChRecordService,
    private toastService: NbToastrService,
  ) {
  }

  async ngOnInit() {
    var isIOS = this.iOS();
    this.today = new Date();
   
    if (isIOS) {
     
      this.today = this.datePipe.transform2(this.today);
      this.today = this.today.replace(/-/g, "/");
      this.start = this.value.data.start_date.replace(/-/g, "/");
      this.finish = this.value.data.finish_date.replace(/-/g, "/");
    } else {
      this.today = new Date;
      this.today2 = new Date;
      this.date = this.value.data.start_date + ' ' + this.value.data.start_hour;
      this.first_date_temp = this.today.getFullYear() + '-' + (this.today.getMonth() + 1) + '-' + this.today.getDate() + ' ' + this.value.data.start_hour;
      this.final_date_temp = this.today.getFullYear() + '-' + (this.today.getMonth() + 1) + '-' + this.today.getDate() + ' ' + this.value.data.finish_hour;
      // console.log(this.rowData);
      // console.log(this.value);



    }



    if (this.value.data.management_plan.type_of_attention_id == 12) {
      var firstdate = new Date(new Date(this.first_date_temp));
      var enddate = new Date(new Date(this.final_date_temp));
      if (firstdate > enddate) {
        this.final_date_temp = this.today.getFullYear() + '-' + (this.today.getMonth() + 1) + '-' + (this.today.getDate() + 1) + ' ' + this.value.data.finish_hour;
        enddate = new Date(new Date(this.final_date_temp));
      }
      this.hournow = this.today2;
      this.firsthour = firstdate;
      this.endhour = enddate;
      this.start = new Date(this.value.data.start_date);
      this.finish = new Date(this.value.data.finish_date);
    } else {
      if (isIOS) {
        this.today2 = new Date;
        this.date = this.value.data.start_date + ' ' + this.value.data.start_hour;
        this.first_date_temp = this.today.getFullYear() + '-' + (this.today.getMonth() + 1) + '-' + this.today.getDate() + ' ' + this.value.data.start_hour;
        this.final_date_temp = this.today.getFullYear() + '-' + (this.today.getMonth() + 1) + '-' + this.today.getDate() + ' ' + this.value.data.finish_hour;
        var firstdate = new Date(new Date(this.date).setHours(new Date(this.date).getHours() + 3));
        var enddate = new Date(new Date(this.date).setHours(new Date(this.date).getHours() - 3));
      this.hournow = this.datePipe.transform2(this.today2);
      this.firsthour = this.datePipe.transform2(firstdate);
      this.endhour = this.datePipe.transform2(enddate);


        this.now= this.hournow.replace(/-/g, "/");
        this.startdate=this.firsthour.replace(/-/g, "/");
        this.enddate=this.endhour.replace(/-/g, "/");

      } else {
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
      }
   
    }

    var a = this.firsthour < this.hournow;
    var b = this.endhour >= this.hournow;
    var c = this.start <= this.today2;
    var d = this.finish >= this.today2;

    if (isIOS) {
      this.today = this.today;
    } else {
      this.today = this.datePipe.transform2(this.today);
    }


  }

  viewHC() {
    var offset = 0;
    var i = 0;
    this.value.data.ch_record.forEach(element => {
      if (element.status == 'CERRADO') {
        offset = i;
      }
      i++;
    });
    this.viewHCS.ViewHC(this.value.data.ch_record[offset].id).then(x => {

      //this.loadingDownload = false;
      if (this.value.closeDialog) {
        this.value.closeDialog();
      }
      this.toastService.success('', x.message);
      window.open(x.url, '_blank');

    }).catch(x => {
      this.toastService.danger(x, 'Error');
      // this.isSubmitted = false;
      // this.loading = false;
    });
  }

  click() {
    if (this.value.closeDialog) {
      this.value.closeDialog();
    }
  }

  openEF(data) {
    if (this.value.closeDialog) {
      this.value.closeDialog();
    }
    this.value.openEF(data)
  }

  iOS() {
    return [
      'iPad Simulator',
      'iPhone Simulator',
      'iPod Simulator',
      'iPad',
      'iPhone',
      'iPod'
    ].includes(navigator.platform)
      // iPad on iOS 13 detection
      || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
  }

}
