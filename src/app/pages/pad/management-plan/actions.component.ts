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
import { data } from 'jquery';

@Component({
  template: `
  <div class="d-flex justify-content-center" *ngIf="this.value.data">
      <a *ngIf="value.data.id && value.user.id" nbTooltip="Ejecución plan de manejo" nbTooltipPlacement="top"
          nbTooltipStatus="primary" nbButton ghost
          [routerLink]="'/pages/pad/assigned-management-plan/' + value.data.id+'/'+value.user.id">
          <nb-icon icon="menu-outline"></nb-icon>
      </a>
      <a *ngIf="value.data.admissions.id && value.user.id" nbTooltip="Consentimientos Informados" nbTooltipPlacement="top"
          nbTooltipStatus="primary" nbButton ghost
          [routerLink]="'/pages/pad/consents-informed/' + value.data.admissions.id+'/'+value.user.id">
          <nb-icon icon="file-text-outline"></nb-icon>
      </a>
      <a *ngIf="value.data.assigned_user_id==null" nbTooltip="Asignación de personal" nbTooltipPlacement="top"
          nbTooltipStatus="primary" nbButton ghost (click)="value.assignedUser(value.data)">
          <nb-icon icon="person-add-outline"></nb-icon>
      </a>
      <button *ngIf="value.currentRole == 2" nbTooltip="Próximos servicios" nbTooltipPlacement="top" nbTooltipStatus="primary"
          nbButton ghost (click)="ShowPreBilling(AssignedTable, value.data.admissions.patient_id)">
          <nb-icon icon="eye-outline"></nb-icon>
      </button>
  </div>

  <ng-template #AssignedTable>
  <nb-card style="max-width: 1400px;max-height: 600px;overflow: auto;">
    <nb-card-header>
      Próximos servicios
    </nb-card-header>
    <nb-card-body>
      <ngx-base-list [messageError]="messageError">
        <div content>
          <ngx-base-table
          subtitle="Servicios" 
          [settings]="this.settings_table" 
          entity="assigned_management_plan/getByUserPatient/{{this.user_id}}/{{patient_id}}?management_plan_id={{this.management_plan_id}}" 
          customData="assigned_management_plan">
    </ngx-base-table>
        </div>
      </ngx-base-list>
    </nb-card-body>

    <nb-card-footer class="d-flex justify-content-end">
      <button nbButton (click)="closeDialog()" type="button">Cerrar</button>
    </nb-card-footer>
  </nb-card>
</ng-template>
  `,
  styleUrls: ['./management-plan.component.scss'],
})
export class ActionsComponent implements ViewCell {
  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;  // This holds the entire row object
  public today;
  public show;

  public management_plan_id = null;
  public patient_id;
  public dialog;
  public user_id;

  constructor(
    private dialogFormService: NbDialogService,
  ) {
  }

  public settings_table = {
    pager: {
      display: true,
      perPage: 30,
    },
    columns: {
      type_of_attention: {
        title: 'Tipo de Atención',
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return row.management_plan.type_of_attention.name;
        },
      },
      manual_price: {
        title: 'Atención',
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return row.management_plan.procedure.manual_price.name;
        },
      },
      start_date: {
        title: 'Fecha de Inicio',
        type: 'string',
      },
      finish_date: {
        title: 'Fecha Final',
        type: 'string',
      },
      start_hour: {
        title: 'Hora de aplicación',
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return row.start_hour == "00:00:00" ? 'N.A.' : value;
        },
      },
    },
  };

  async ngOnInit() {
    this.management_plan_id = this.value.data.id;
  }

  ShowPreBilling(dialog: TemplateRef<any>, id) {
    this.patient_id = id;
    this.user_id = this.value.own_user.id;
    this.dialog = this.dialogFormService.open(dialog);
  }

  closeDialog() {
    this.dialog.close();
  }

}
