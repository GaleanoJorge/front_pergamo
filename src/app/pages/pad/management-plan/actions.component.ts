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
  <a nbTooltip="Ejecución plan de manejo"  nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ghost [routerLink]="'/pages/pad/assigned-management-plan/' + value.data.id+'/'+value.user.id">
  <nb-icon icon="menu-outline"></nb-icon>
</a>
  </div>
  `,
  styleUrls: ['./management-plan.component.scss'],
})
export class ActionsComponent implements ViewCell {
  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;  // This holds the entire row object
public today;


  constructor(
  ) {
  }

  async ngOnInit() {
    
    
  }
}