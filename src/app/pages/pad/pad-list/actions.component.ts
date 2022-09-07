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
import { Actions4Component } from '../assigned-management-plan/actions.component';
import { AuthService } from '../../../services/auth.service';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { ChRecordService } from '../../../business-controller/ch_record.service';

@Component({
  template: `
  <div class="d-flex justify-content-center">
      <a *ngIf="value.currentRole != 2" nbTooltip="Admisiones" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton
          ghost [routerLink]="'/pages/pad/admissions-patient-pad/' + value.data.id+'/'+value.data.admissions[0].id">
          <nb-icon icon="menu-outline"></nb-icon>
      </a>
      <button *ngIf="value.currentRole == 2" nbTooltip="Ejecución plan de manejo" nbTooltipPlacement="top"
          nbTooltipStatus="primary" nbButton ghost (click)="closeDialog()"
          [routerLink]="'/pages/pad/management-plan/' + value.data.admissions[0].id+'/'+value.data.id">
          <nb-icon icon="menu-outline"></nb-icon>
      </button>
      <button *ngIf="value.currentRole == 2" nbTooltip="Próximos servicios" nbTooltipPlacement="top" nbTooltipStatus="primary"
          nbButton ghost (click)="ShowPreBilling(AssignedTable, value.data.id)">
          <nb-icon icon="eye-outline"></nb-icon>
      </button>
  </div>

  <ng-template #AssignedTable>
  <nb-card style="width: 100%;height: 100%;overflow: auto;">
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
  styleUrls: ['./pad-list.component.scss'],
})
export class Actions2Component implements ViewCell {
  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;  // This holds the entire row object
  @ViewChild(BaseTableComponent) table: BaseTableComponent;

  public management_id;
  public user_id;
  public patient_id;
  public dialog;
  public management_plan_id = null;
  public own_user;
  public ch_record;

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
            'currentRole': this.value.currentRole,
            'edit': this.EditAssigned.bind(this),
            'closeDialog': this.closeDialog.bind(this),
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
    this.user_id = this.value.user.id;
    this.own_user = this.authService.GetUser();
  }

  ShowPreBilling(dialog: TemplateRef<any>, id) {
    this.patient_id = id;
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
