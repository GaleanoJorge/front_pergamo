import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { SectionalCouncilService } from '../../../business-controller/sectional-council.service';
import { StatusFieldComponent } from '../../components/status-field/status-field.component.js';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { ActionsComponent } from './actions.component';
import { ActivatedRoute } from '@angular/router';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { FormManagementPlanComponent } from './form-management-plan/form-management-plan.component';
import * as XLSX from 'ts-xlsx';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { CurrencyPipe } from '@angular/common';
import { date } from '@rxweb/reactive-form-validators';
import { ManagementPlanService } from '../../../business-controller/management-plan.service';
import { UserBusinessService } from '../../../business-controller/user-business.service';

@Component({
  selector: 'ngx-pad-list',
  templateUrl: './management-plan.component.html',
  styleUrls: ['./management-plan.component.scss'],
})
export class ManagementPlanComponent implements OnInit {

  public isSubmitted = false;
  public entity: string;
  public loading: boolean = false;
  public loading2: boolean = false;
  public category_id: number = null;
  public messageError: string = null;
  public title: string = 'Plan de manejo';
  public subtitle: string = '';
  public headerFields: any[] = ['Tipo de Atención', 'Frecuencia', 'Cantidad', 'Personal asistencial'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}, ${this.headerFields[2]}, ${this.headerFields[3]}, ${this.headerFields[4]}`;
  public icon: string = 'nb-star';
  public data = [];
  public arrayBuffer: any;
  public file: File;
  public admissions_id;
  public user_id;
  public user;
  public dialog;
  public currentRole;
  public selectedOptions: any[] = [];
  public result: any = null;
  


  @ViewChild(BaseTableComponent) table: BaseTableComponent;

  public settings = {
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
            'user':this.user,
            'edit': this.EditManagementPlan.bind(this),
            'delete': this.DeleteConfirmManagementPlan.bind(this),
            'refresh': this.RefreshData.bind(this),
            'currentRole': this.currentRole,
          };
        },
        renderComponent: ActionsComponent,
      },
      type_of_attention: {
        title: this.headerFields[0],
        type: 'string',
        valuePrepareFunction(value) {
          return value?.name;
        },
      },
      frequency: {
        title: this.headerFields[1],
        type: 'string',
        valuePrepareFunction(value) {
          return value?.name;
        },
      },
      quantity: {
        title: this.headerFields[2],
        type: 'string',
      },
      assigned_user: {
        title: this.headerFields[3],
        type: 'string',
        valuePrepareFunction(value) {
          return value?.firstname+' '+value.lastname;
        },
      },
    },
  };

  public routes = [
    {
      name: 'Pad',
      route: '../pad/list',
    },
    {
      name: 'Plan de manejo',
    },
  ];

  constructor(

    private formBuilder: FormBuilder,
    private dialogFormService: NbDialogService,
    private deleteConfirmService: NbDialogService,
    private toastService: NbToastrService,

    private currency: CurrencyPipe,
    private userBS: UserBusinessService,

    private authService: AuthService,
    private dialogService: NbDialogService,
    private managementPlanS: ManagementPlanService,
    private toastS: NbToastrService,
    private route: ActivatedRoute,

  ) {
  }
  public form: FormGroup;
  public ResponseManagementPlanForm: FormGroup;
  public RadicationManagementPlanForm: FormGroup;
  public status;
  public objetion_code_response: any[] = null;
  public objetion_response: any[] = null;
  public saved: any = null;
  




  async ngOnInit() {
 
    this.admissions_id = this.route.snapshot.params.id;
    this.user_id = this.route.snapshot.params.user;

    await this.userBS.GetUserById(this.user_id).then(x => {
      this.user=x;
    });
  }



  ConfirmAction(dialog: TemplateRef<any>) {
    this.dialog = this.dialogService.open(dialog);
  }



  RefreshData() {
    this.table.refresh();
  }

  NewManagementPlan() {
    this.dialogFormService.open(FormManagementPlanComponent, {
      context: {
        title: 'Crear plan de manejo',
        user:this.user,
        admissions_id:this.admissions_id,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditManagementPlan(data) {
    this.dialogFormService.open(FormManagementPlanComponent, {
      context: {
        title: 'Editar plan de manejo',
        data,
        saved: this.RefreshData.bind(this),
      },
    });
  }


  DeleteConfirmManagementPlan(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteManagementPlan.bind(this),
      },
    });
  }

  DeleteManagementPlan(data) {
      return this.managementPlanS.Delete(data.id).then(x => {
        this.table.refresh();
        return Promise.resolve(x.message);
      }).catch(x => {
        throw x;
      });
  }

}
