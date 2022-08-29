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
import { data } from 'jquery';
import { AuthService } from '../../../services/auth.service';
import { ChRecordService } from '../../../business-controller/ch_record.service';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { Actions4Component } from '../assigned-management-plan/actions.component';

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
      <button nbTooltip="Editar" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ghost (click)="value.edit(value.data)">
        <nb-icon icon="edit-outline"></nb-icon>
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
  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  public today;
  public show;

  public management_plan_id = null;
  public patient_id;
  public dialog;
  public user_id;
  public own_user;
  public ch_record;
  public currentRole;

  constructor(
    private dialogFormService: NbDialogService,
    private authService: AuthService,
    private chRecordS: ChRecordService,
    private router: Router,
    private toastService: NbToastrService,
  ) {
  }

  public settings_table = {
    pager: {
      display: true,
      perPage: 30,
    },
    columns: {
      actions: {
        title: 'Acciones',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
            'user': this.own_user,
            'refresh': this.RefreshData.bind(this),
            'openEF':this.NewChRecord.bind(this),
            'currentRole': this.currentRole,
            'edit': this.EditAssigned.bind(this),
          };
        },
        renderComponent: Actions4Component,
      },
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
      product: {
        title: 'Medicamento',
        type: 'string',
        valuePrepareFunction: (value, row) => {
          if (row.management_plan.product_id) {
            return row.management_plan.service_briefcase.manual_price.name;
          } else {
            return 'N.A.';
          }
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
          return row.management_plan.type_of_attention_id != 17 ? 'N.A.' : value;
        },
      },
    },
  };

  async ngOnInit() {
    this.management_plan_id = this.value.data.id;
    this.own_user = this.authService.GetUser();
  }

  ShowPreBilling(dialog: TemplateRef<any>, id) {
    this.patient_id = id;
    this.user_id = this.value.own_user.id;
    this.dialog = this.dialogFormService.open(dialog);
  }

  closeDialog() {
    this.dialog.close();
  }

  RefreshData() {
    this.table.refresh();
  }

  async NewChRecord(data) {
    await this.chRecordS.Save({
      status: 'ACTIVO',
      admissions_id: data.management_plan.admissions_id,
      assigned_management_plan: data.id,
      user_id: data.user_id,
      type_of_attention_id: data.management_plan.type_of_attention_id,
    }).then(x => {
      this.ch_record=x.data.ch_record.id;
      // this.openCHEF(data,this.ch_record)
      this.closeDialog();
      this.router.navigateByUrl('/pages/clinic-history/clinic-history-nursing-list/' + this.ch_record + '/'+ data.id);
      this.toastService.success('', x.message);
      this.RefreshData();
      
    }).catch(x => {
      // this.isSubmitted = false;
      // this.loading = false;
    });

  }

  EditAssigned(data) {
    // this.dialogFormService.open(FormAssignedManagementPlanComponent, {
    //   context: {
    //     title: 'Editar agendamiento',
    //     data,
    //     phone_consult: this.management[0].phone_consult,
    //     user: this.user,
    //     saved: this.RefreshData.bind(this),
    //   },
    // });
  }

}
