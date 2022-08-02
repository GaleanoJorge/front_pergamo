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
    <a *ngIf="value.currentRole!=2" nbTooltip="Admisiones" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ghost [routerLink]="'/pages/pad/admissions-patient-pad/' + value.data.admissions[0].id+'/'+value.data.id">
      <nb-icon icon="menu-outline"></nb-icon>
    </a>
    <a *ngIf="value.currentRole==2" nbTooltip="Ejecución plan de manejo" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ghost [routerLink]="'/pages/pad/management-plan/' + value.data.admissions[0].id+'/'+value.data.id">
    <nb-icon icon="menu-outline"></nb-icon>
  </a>
  </div>
  

  `,
  styleUrls: ['./pad-list.component.scss'],
})
export class Actions2Component implements ViewCell {
  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;  // This holds the entire row object

  public management_id;

 

  constructor(
   
  ) {
  }

  async ngOnInit() {
// console.log(this.value);
    }

  

}
