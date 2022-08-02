import { Component, OnInit, ViewChild, TemplateRef, Input } from '@angular/core';
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
import { TypeChPhysicalExam } from '../../../models/ch-type-ch-physical-exam';
import { PatientService } from '../../../business-controller/patient.service';
import { type } from 'os';
import { ActionsSemaphore2Component } from './actions-semaphore.component';
import { DateFormatPipe } from '../../../pipe/date-format.pipe';
import { RoleBusinessService } from '../../../business-controller/role-business.service';

@Component({
  selector: 'ngx-management-pad',
  templateUrl: './management-plan.component.html',
  styleUrls: ['./management-plan.component.scss'],
})
export class ManagementPlanComponent implements OnInit {


  @Input() admissions: any = null;
  @Input() medical: number=0;
  @Input() patient: boolean = false;
  @Input() title: string = null;
  public isSubmitted = false;
  public entity: string;
  public loading: boolean = false;
  public loading2: boolean = false;
  public category_id: number = null;
  public messageError: string = null;
  public subtitle: string = '';
  public headerFields: any[] = ['Tipo de Atención', 'Frecuencia', 'Cantidad', 'Personal asistencial', 'Consecutivo de admisión - Ambito - Programa', 'Ejecutado','Incumplidas'];
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
  public settings;
  public currentRoleId;
  public roles;
  public user_logged;



  @ViewChild(BaseTableComponent) table: BaseTableComponent;

  public settings1 = {
    pager: {
      display: true,
      perPage: 30,
    },
    columns: {
      semaphore: {
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
          };
        },
        renderComponent: ActionsSemaphore2Component,
      },
      actions: {
        title: 'Acciones',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
            'user': this.user,
            'edit': this.EditManagementPlan.bind(this),
            'assignedUser': this.AssignedUser.bind(this),
            'delete': this.DeleteConfirmManagementPlan.bind(this),
            'refresh': this.RefreshData.bind(this),
            'currentRole': this.currentRole,
          };
        },
        renderComponent: ActionsComponent,
      },
      admissions: {
        title: this.headerFields[4],
        type: 'string',
        valuePrepareFunction(value) {
          return value?.consecutive+' - '+ value.location[0].scope_of_attention.name+' - '+ value.location[0].program.name;
        },
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
        valuePrepareFunction(value,row) {
          if(row.type_of_attention_id==17){
            return row.number_doses;
          }else{
            return value;
          }
        },
      },
      assigned_user: {
        title: this.headerFields[3],
        type: 'string',
        valuePrepareFunction(value) {
          if (value) {
            return value?.firstname + ' ' + value.lastname;
          } else {
            return 'Sin asignación';
          }
        },
      },
      not_executed: {
        title: this.headerFields[5],
        type: 'string',
        valuePrepareFunction(value, row) {
          if (value == -1) {
            return '--';
          } else {
            return row.created - value;
          }
        },
      },
      incumplidas: {
        title: this.headerFields[6],
        type: 'string',
        valuePrepareFunction(value, row) {
         
            return  value;
          
        },
      },
    },
  };

  public settings2 = {
    pager: {
      display: true,
      perPage: 30,
    },
    columns: {
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
    },
  };



  constructor(

    private formBuilder: FormBuilder,
    private dialogFormService: NbDialogService,
    private deleteConfirmService: NbDialogService,
    private toastService: NbToastrService,
    public datePipe: DateFormatPipe,

    private currency: CurrencyPipe,
    private userBS: UserBusinessService,
    private patienBS: PatientService,

    private authService: AuthService,
    private dialogService: NbDialogService,
    private managementPlanS: ManagementPlanService,
    private toastS: NbToastrService,
    private route: ActivatedRoute,
    public roleBS: RoleBusinessService,


  ) {
  }
  public form: FormGroup;
  public ResponseManagementPlanForm: FormGroup;
  public RadicationManagementPlanForm: FormGroup;
  public status;
  public objetion_code_response: any[] = null;
  public objetion_response: any[] = null;
  public saved: any = null;
  public routes;
  public assigned_user: any[];






  async ngOnInit() {
    this.currentRoleId = localStorage.getItem('role_id');
    this.user_id = this.route.snapshot.params.user;
    await this.roleBS.GetCollection({ id: this.currentRoleId  }).then(x => {
      this.roles = x;
    }).catch(x => { });
    this.user_logged= this.authService.GetUser().id;
    if (this.roles[0].role_type_id != 2 && this.title==null) {
      this.admissions_id = this.route.snapshot.params.id;
      this.title = "Agendamiento Plan de atención domiciliario";
      this.entity="management_plan_by_patient/"+this.user_id+"/"+0+"?admission_id="+this.admissions_id;
    }else if(this.medical==1){
      this.title = "Agendamiento Plan de atención domiciliario";
      this.entity="management_plan_by_patient/"+this.patient+"/"+0;
    }else{
      this.title = "Servicios a Ejecutar";
      this.entity="management_plan_by_patient/"+this.user_id+"/"+this.user_logged;
    }
    if (this.admissions) {
      this.admissions_id = this.admissions;
      this.settings = this.settings2;
      this.user_id = this.patient;
    } else {
      this.admissions_id = this.route.snapshot.params.id;
      this.user_id = this.route.snapshot.params.user;
      this.settings = this.settings1;


      this.routes = [
        {
          name: 'Pad',
          route: '../pad/list',
        },
        {
          name: 'Plan de manejo',
        },
      ];
    }
    await this.patienBS.GetUserById(this.user_id).then(x => {
      this.user = x;
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
        assigned: true,
        user: this.user,
        medical: this.medical,
        admissions_id: this.admissions_id,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  AssignedUser(data) {
    this.dialogFormService.open(FormManagementPlanComponent, {
      context: {
        title: 'Asignar personal asistencial',
        data,
        user: this.user,
        medical: this.medical,
        assigned: false,
        admissions_id: this.admissions_id,
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
