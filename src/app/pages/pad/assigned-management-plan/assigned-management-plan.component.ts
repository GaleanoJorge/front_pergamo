import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { SectionalCouncilService } from '../../../business-controller/sectional-council.service';
import { StatusFieldComponent } from '../../components/status-field/status-field.component.js';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { Actions4Component } from './actions.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import * as XLSX from 'ts-xlsx';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { CurrencyPipe } from '@angular/common';
import { date } from '@rxweb/reactive-form-validators';
import { UserBusinessService } from '../../../business-controller/user-business.service';
import { PatientService } from '../../../business-controller/patient.service';
import { ManagementPlanService } from '../../../business-controller/management-plan.service';
import { FormAssignedManagementPlanComponent } from './form-assigned-management-plan/form-assigned-management-plan.component';
import { ActionsSemaphoreComponent } from './actions-semaphore.component';
import { DateFormatPipe } from '../../../pipe/date-format.pipe';
import { FixedPlanComponent } from './fixed-plan/fixed-plan.component';

@Component({
  selector: 'ngx-assigned-management-plan',
  templateUrl: './assigned-management-plan.component.html',
  styleUrls: ['./assigned-management-plan.component.scss'],
})
export class AssignedManagementPlanComponent implements OnInit {

  public isSubmitted = false;
  public entity: string;
  public loading: boolean = false;
  public loading2: boolean = false;
  public category_id: number = null;
  public messageError: string = null;
  public title: string = 'Ejecución Plan de manejo';
  public subtitle: string = '';
  public headerFields: any[] = ['Fecha de inicio', 'Fecha Final', 'Fecha de ejecución'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}, ${this.headerFields[2]}, ${this.headerFields[3]}, ${this.headerFields[4]}`;
  public icon: string = 'nb-star';
  public data = [];
  public arrayBuffer: any;
  public file: File;
  public management_id;
  public user_id;
  public user = null;
  public dialog;
  public currentRole;
  public settings;
  public selectedOptions: any[] = [];
  public result: any = null;

  public dynamicQueryParameter;



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
            'getDate': this.statusSemaphor.bind(this),

          };
        },
        renderComponent: ActionsSemaphoreComponent,
      },
      actions: {
        title: 'Acciones',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
            'user': this.user,
            'refresh': this.RefreshData.bind(this),
            'currentRole': this.currentRole,
            'edit': this.EditAssigned.bind(this),
          };
        },
        renderComponent: Actions4Component,
      },
      start_date: {
        title: this.headerFields[0],
        type: 'string',
      },
      finish_date: {
        title: this.headerFields[1],
        type: 'string',
      },
      execution_date: {
        title: this.headerFields[2],
        type: 'string',
      },
    },
  };

  public settings2 = {
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
            'getDate': this.statusSemaphor.bind(this),
          };
        },
        renderComponent: ActionsSemaphoreComponent,
      },
      actions: {
        title: 'Acciones',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
            'user': this.user,
            'refresh': this.RefreshData.bind(this),
            'currentRole': this.currentRole,
            'edit': this.EditAssigned.bind(this),
          };
        },
        renderComponent: Actions4Component,
      },
      start_date: {
        title: this.headerFields[0],
        type: 'string',
      },
      start_hour: {
        title: 'Hora de aplicación',
        type: 'string',
      },
      finish_date: {
        title: this.headerFields[1],
        type: 'string',
      },
      execution_date: {
        title: this.headerFields[2],
        type: 'string',
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
    {
      name: 'Ejecución de plan de manejo',
    },
  ];

  constructor(

    private formBuilder: FormBuilder,
    private dialogFormService: NbDialogService,
    private deleteConfirmService: NbDialogService,
    private toastService: NbToastrService,
    public datePipe: DateFormatPipe,

    private currency: CurrencyPipe,
    private patientBS: PatientService,
    private userBS: UserBusinessService,
    private ManagementS: ManagementPlanService,

    private authService: AuthService,
    private dialogService: NbDialogService,
    private toastS: NbToastrService,
    private route: ActivatedRoute,
    private router: Router,

  ) {
  }
  public form: FormGroup;
  public ResponseManagementPlanForm: FormGroup;
  public RadicationManagementPlanForm: FormGroup;
  public status;
  public objetion_code_response: any[] = null;
  public objetion_response: any[] = null;
  public saved: any = null;
  public user_logged;
  public management;
  public semaphore;






  async ngOnInit() {
    this.management_id = this.route.snapshot.params.management_id;
    await this.ManagementS.GetCollection({ management_id: this.management_id }).then(x => {
      this.management = x;
    });
    if (this.management[0].type_of_attention_id == 17) {
      this.settings = this.settings2;
    } else {
      this.settings = this.settings1;
    }
    this.user = this.authService.GetUser();
    if(this.user.roles[0].role_type_id==2){
      // this.user_logged= this.authService.GetUser().id;
      this.user_logged=0;

    }else{
      this.user_logged=0;
    }

    this.user_id = this.route.snapshot.params.user;

    await this.patientBS.GetUserById(this.user_id).then(x => {
      this.user = x;
      this.entity = "assigned_management_plan/" + this.management_id + "/" + this.user_logged + "?patient=" + this.user.admissions[0].id;
    });
  }

  statusSemaphor(data) {
    var today = new Date().getTime();
    var finish = new Date(data.finish_date+" 24:00").getTime();
    var start = new Date(data.start_date).getTime();
    var execution = new Date(data.execution_date).getTime();



    if(data.allow_redo == 1) {
      this.semaphore = 5;
    } else if (today < start) {
      this.semaphore = 1;
    } else if (today <= finish && today >= start && isNaN(execution)) {
      this.semaphore = 2;
    } else if (isNaN(execution) && today > finish) {
      this.semaphore = 4;
    } else if (execution != NaN) {
      this.semaphore = 3;
    }
    return this.semaphore
  }



  ConfirmAction(dialog: TemplateRef<any>) {
    this.dialog = this.dialogService.open(dialog);
  }


  EditAssigned(data) {
    this.dialogFormService.open(FormAssignedManagementPlanComponent, {
      context: {
        title: 'Editar agendamiento',
        data,
        phone_consult: this.management[0].phone_consult,
        user: this.user,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  NewSolicitudFixed() {
    this.dialogFormService.open(FixedPlanComponent, {
      context: {
        title: 'Solicitud activo fijo',
        admissions:this.user.admissions[0].id,
        // user: this.user,
        // medical: this.medical,
        // admissions_id: this.admissions_id,
        // saved: this.RefreshData.bind(this),
      },
    });
  }



  RefreshData() {
    this.table.refresh();
  }

}
