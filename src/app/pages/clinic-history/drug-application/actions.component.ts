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
  <button *ngIf="this.rowData.disponibles != '0'" nbTooltip="APLICADO" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ghost (click)="value.used(value.data)">
    <nb-icon icon="checkmark"></nb-icon>
  </button>
  <!-- <button nbTooltip="DEVOLVER" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ghost (click)="value.returned(value.data)">
  <nb-icon icon="flip-2"></nb-icon>
  </button> 
  <button *ngIf="this.rowData.disponibles != '0'" nbTooltip="DAÑADO" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ghost (click)="value.damaged(value.data)">
  <nb-icon icon="close"></nb-icon>
  </button>
  -->
</div>
  `,
  styleUrls: ['./drug-application.component.scss'],
})
export class ActionsAplicationsComponent implements ViewCell {
  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;  // This holds the entire row object

  constructor(

  ) {
  }

  async ngOnInit() {

  }

}
