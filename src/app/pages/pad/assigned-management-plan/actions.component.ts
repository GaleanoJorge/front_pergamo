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

@Component({
  template: `
  <div class="d-flex justify-content-center">
    <a *ngIf="today >= value.data.start_date && today <= value.data.finish_date" nbTooltip="Registro en Historia Clinica" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ghost [routerLink]="'/pages/clinic-history/ch-record-list/' + value.user.admissions[0].id + '/' + value.data.id ">
    <nb-icon icon="folder-add-outline"></nb-icon>
  </a>
  </div>
  `,
  styleUrls: ['./assigned-management-plan.component.scss'],
})
export class Actions4Component implements ViewCell {
  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;  // This holds the entire row object

  public today;
  public start;
  public finish;
  public showBotton: boolean = false;


  constructor(
    private datePipe: DateFormatPipe,

  ) {
  }

  async ngOnInit() {

    this.today = new Date;
    this.start = this.value.data.start_date.split('-');
    this.finish = this.value.data.finish_date.split('-');
    let day = this.today.getDate();
    let month = this.today.getMonth() + 1;
    let year = this.today.getFullYear();

    this.today = this.datePipe.transform2(this.today);

  }

}
