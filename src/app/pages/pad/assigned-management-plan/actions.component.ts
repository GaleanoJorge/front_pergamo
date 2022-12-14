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
    <button *ngIf="!isIOS && value.currentRole == 2 && ((today >= value.data.start_date && today <= value.data.finish_date && value.data.management_plan.type_of_attention_id!=17 && value.data.management_plan.type_of_attention_id!=12)||value.data.allow_redo == 1)" (click)="click()" nbTooltip="Registro en Historia Clinica" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ghost [routerLink]="'/pages/clinic-history/ch-record-list/' + rowData.management_plan.admissions_id + '/' + value.data.id + '/' + rowData.management_plan.type_of_attention_id" >
    <nb-icon icon="folder-add-outline"></nb-icon>
    </button>

    <button *ngIf="isIOS && value.currentRole == 2 && ((today >= start && today <= finish && value.data.management_plan.type_of_attention_id!=17 && value.data.management_plan.type_of_attention_id!=12)||value.data.allow_redo == 1)" (click)="click()" nbTooltip="Registro en Historia Clinica" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ghost [routerLink]="'/pages/clinic-history/ch-record-list/' + rowData.management_plan.admissions_id + '/' + value.data.id + '/' + rowData.management_plan.type_of_attention_id" >
    <nb-icon icon="folder-add-outline"></nb-icon>
    </button> 

    <a *ngIf="value.currentRole == 2 && (firsthour > hournow && endhour < hournow && value.data.management_plan.type_of_attention_id==17)" nbTooltip="Registro en Historia Clinica Enfermeria" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ghost [routerLink]="'/pages/clinic-history/ch-record-list/' + rowData.management_plan.admissions_id + '/' + value.data.id + '/' + rowData.management_plan.type_of_attention_id">
    <nb-icon icon="folder-add-outline"></nb-icon>
  </a>

  <a *ngIf="value.currentRole == 2 && ( today >= start && today <= finish && value.data.management_plan.type_of_attention_id==17)" nbTooltip="Registro en Historia Clinica Enfermeria" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ghost [routerLink]="'/pages/clinic-history/ch-record-list/' + rowData.management_plan.admissions_id + '/' + value.data.id + '/' + rowData.management_plan.type_of_attention_id">
  <nb-icon icon="folder-add-outline"></nb-icon>
</a>

    <a *ngIf="value.currentRole == 2 && (start <= today2 && finish >= today2 && value.data.management_plan.type_of_attention_id==12)" nbTooltip="Registro en Historia Clinica Enfermeria" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ghost [routerLink]="'/pages/clinic-history/ch-record-list/' + rowData.management_plan.admissions_id + '/' + value.data.id + '/' + rowData.management_plan.type_of_attention_id">
    <nb-icon icon="folder-add-outline"></nb-icon>
  </a>
  <button *ngIf="value.data.ch_record.length > 0" nbTooltip="Ver Registro Historia Clinica" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ghost (click)="viewHC()" >
      <nb-icon icon="file-add"></nb-icon>
    </button>
  <button *ngIf="value.currentRole == 1" nbTooltip="Editar" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ghost (click)="value.edit(value.data)">
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
  public first_date_temp;
  public final_date_temp;
  public enddate;
  public startdate;
  public now;
  public showBotton: boolean = false;
  public isIOS;


  constructor(
    private datePipe: DateFormatPipe,
    private viewHCS: ChRecordService,
    private toastService: NbToastrService,
  ) {
  }

  async ngOnInit() {
    this.isIOS = this.iOS();
    this.today = new Date();
   
    if (this.isIOS) {
     
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
      this.today2= new Date().getTime();
      this.hournow =  this.today.getHours() + ':' + this.today.getMinutes() + ':' + this.today.getSeconds();
      this.firsthour = this.first_date_temp.getHours() + ':' + this.first_date_temp.getMinutes() + ':' + this.first_date_temp.getSeconds();
      this.endhour = this.final_date_temp.getHours() + ':' + this.final_date_temp.getMinutes() + ':' + this.final_date_temp.getSeconds();
      var start= this.value.data.start_date+' '+ this.value.data.start_hour;
      var finish= this.value.data.finish_date+' '+ this.value.data.finish_hour;
      this.start = new Date(start).getTime();
      this.finish = new Date(finish).getTime();
      console.log(this.start);
      console.log(this.finish);
      console.log(this.today2);
    } else {
      if (this.isIOS) {
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

    if (this.isIOS) {
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
