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

@Component({
  template: `
  <div class="d-flex justify-content-center">
    <a nbTooltip="Registro en Historia Clinica" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ghost [routerLink]="'/pages/clinic-history/ch-record-list/' + value.user.admissions[0].id + '/' + value.data.id ">
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


  constructor(

  ) {
  }

  async ngOnInit() {

    this.today = new Date;

    let day = this.today.getDate();
let month = this.today.getMonth() + 1;
let year = this.today.getFullYear();

this.today=year+'-0'+month+'-'+day;


  }

}
