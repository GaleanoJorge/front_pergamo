import { Component, OnInit, ViewChild, TemplateRef, Input } from '@angular/core';
import { SectionalCouncilService } from '../../../business-controller/sectional-council.service';
import { StatusFieldComponent } from '../../components/status-field/status-field.component.js';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { ActionsComponent } from './actions.component';
import { ActivatedRoute, Router } from '@angular/router';
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
import { SuppliesView } from './supplies-view/supplies-view.component';
import { Location } from '@angular/common';
import { AdmissionsService } from '../../../business-controller/admissions.service';

@Component({
  selector: 'ngx-management-pad',
  templateUrl: './management-plan.component.html',
  styleUrls: ['./management-plan.component.scss'],
})
export class ManagementPlanComponent implements OnInit {


  @Input() admissions: any = null;
  @Input() medical: number = 0;
  @Input() patient: boolean = false;
  @Input() title: string = null;
  public isSubmitted = false;
  public entity: string;
  public loading: boolean = false;
  public loading2: boolean = false;
  public category_id: number = null;
  public messageError: string = null;
  public subtitle: string = '';
  public headerFields: any[] = ['Servicio', 'Frecuencia', 'Cantidad agendada', 'Personal asistencial', 'Consecutivo de admisión - Ambito - Programa', 'Ejecutado', 'Incumplidas', 'Medicamento'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}, ${this.headerFields[2]}, ${this.headerFields[3]}, ${this.headerFields[4]}`;
  public icon: string = 'nb-star';
  public data = [];
  public arrayBuffer: any;
  public file: File;
  public admissions_id;
  public admissions1;
  public user_id;
  public user;
  public own_user;
  public dialog;
  public currentRole;
  public selectedOptions: any[] = [];
  public result: any = null;
  public settings;
  public currentRoleId;
  public roles;
  public user_logged;
  public ambito;
  public type_id;
  public valor: any = null;


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
          if (row.type_of_attention_id) {
            this.valor = true;
          } else {
            this.valor = false;
          };
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
            'user': this.own_user,
            'currentRole': this.currentRole.role_type_id,
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
            'own_user': this.own_user,
            'edit': this.EditManagementPlan.bind(this),
            'assignedUser': this.AssignedUser.bind(this),
            'delete': this.DeleteConfirmManagementPlan.bind(this),
            'refresh': this.RefreshData.bind(this),
            'currentRole': this.currentRole.role_type_id,
          };
        },
        renderComponent: ActionsComponent,
      },
      admissions: {
        title: this.headerFields[4],
        type: 'string',
        valuePrepareFunction(value) {
          return value?.consecutive + ' - ' + value.location[0].scope_of_attention.name + ' - ' + value.location[0].program.name;
        },
      },
      type_of_attention: {
        title: this.headerFields[0],
        type: 'string',
        width: '25%',
        valuePrepareFunction(value, row) {
          return value?.name + ' - ' + row.procedure.manual_price.name;
        },
      },
      service_briefcase: {
        title: this.headerFields[7],
        type: 'string',
        valuePrepareFunction(value, row) {
          if (row.type_of_attention_id == 17) {
            return value?.manual_price.name;
          } else {
            return "N/A"
          }
        },
        "show": this.valor,
      },
      quantity: {
        title: this.headerFields[2],
        type: 'string',
        valuePrepareFunction(value, row) {
          if (row.type_of_attention_id == 17) {
            return row.number_doses;
          } else {
            return value;
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

          return value;

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
    private admissionS: AdmissionsService,
    private patienBS: PatientService,

    private authService: AuthService,
    private dialogService: NbDialogService,
    private managementPlanS: ManagementPlanService,
    private toastS: NbToastrService,
    private route: ActivatedRoute,
    public roleBS: RoleBusinessService,
    private router: Router,
    private location: Location,

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


  back() {
    this.location.back();
  }





  async ngOnInit() {

    if (this.settings1.columns["service_briefcase"].hasOwnProperty("show")) {
      if (this.settings1.columns["service_briefcase"].show == false) {
        delete this.settings1.columns["service_briefcase"];

      }
    }

    if (this.admissions) {
      this.admissions_id = this.admissions;
      this.settings = this.settings2;
      this.user_id = this.patient;
    } else {
      this.admissions_id = this.route.snapshot.params.id;
      this.user_id = this.route.snapshot.params.user;
      this.settings = this.settings1;

      await this.admissionS.GetCollection({ admissions_id: this.admissions_id }).then(x => {
        this.admissions1 = x;
      });



      this.own_user = this.authService.GetUser();
      var curr = this.authService.GetRole();
      this.currentRole = this.own_user.roles.find(x => {
        return x.id == curr;
      });
      this.currentRoleId = this.currentRole.id;
      this.user_id = this.route.snapshot.params.user;
      await this.roleBS.GetCollection({ id: this.currentRoleId }).then(x => {
        this.roles = x;
      }).catch(x => { });
      this.user_logged = this.authService.GetUser().id;
      if (this.currentRole.role_type_id != 2 && this.title == null) {
        this.admissions_id = this.route.snapshot.params.id;
        this.title = "Plan de manejo paciente " + this.admissions1[0].location[0].scope_of_attention.name;
        this.entity = "management_plan_by_patient/" + this.user_id + "/" + 0 + "?admission_id=" + this.admissions_id;
      } else if (this.medical == 1) {
        this.title = "Plan de manejo paciente " + this.admissions1[0].location[0].scope_of_attention.name;
        this.entity = "management_plan_by_patient/" + this.patient + "/" + 0;
      } else {
        this.title = "Servicios a Ejecutar";
        this.entity = "management_plan_by_patient/" + this.user_id + "/" + this.user_logged;
      }



      this.routes = [
        {
          name: 'Pad',
          route: '/pages/pad/list',

        },
        {
          name: 'Plan de manejo',
          route: '/pages/pad/management-plan/' + this.admissions_id + '/' + this.user_id,
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
        admissions1:this.admissions1,
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
        medical: 0,
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
        edit: 1,
        user: this.user,
        medical: 0,
        admissions_id: this.admissions_id,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  suppliesView() {
    this.dialogFormService.open(SuppliesView, {
      context: {
        user: this.user,
        own_user: this.own_user,
        title: 'Suministros del paciente',
        admissions_id: this.admissions_id,
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
