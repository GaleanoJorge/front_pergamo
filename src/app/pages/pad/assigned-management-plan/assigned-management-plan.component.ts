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
import { ChRecordService } from '../../../business-controller/ch_record.service';
import { ClinicHistoryNursingListComponent } from '../../clinic-history/clinic-history-nursing-list/clinic-history-nursing-list.component';
import { Location } from '@angular/common';

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
  public headerFields: any[] = ['Fecha de inicio', 'Fecha Final', 'Fecha de ejecución', 'Personal asistencial'];
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
  public own_user;
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
            'user': this.own_user,
            'refresh': this.RefreshData.bind(this),
            'openEF':this.NewChRecord.bind(this),
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
      nombre_completo: {
        title: this.headerFields[3],
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
            'user': this.own_user,
            'refresh': this.RefreshData.bind(this),
            'currentRole': this.currentRole,
            'openEF':this.NewChRecord.bind(this),
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
      nombre_completo: {
        title: this.headerFields[3],
        type: 'string',
      },
    },
  };

  public routes = [
    {
      name: 'Pad',
      route: '/pages/pad/list',
    },
    {
      name: 'Plan de manejo',
      route: '/pages/pad/management-plan',
    },
    {
      name: 'Ejecución de plan de manejo',
      route: '/pages/pad/assigned-management-plan',
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
    private ManagementS: ManagementPlanService,

    private authService: AuthService,
    private dialogService: NbDialogService,
    private toastS: NbToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private chRecordS: ChRecordService,
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
  public user_logged;
  public management;
  public semaphore;
  public ch_record;






  async ngOnInit() {
    this.management_id = this.route.snapshot.params.management_id;
    this.own_user = this.authService.GetUser();
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
  back() {
    this.location.back();
  };

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
      this.router.navigateByUrl('/pages/clinic-history/clinic-history-nursing-list/' + this.ch_record + '/'+ data.id);
      this.toastService.success('', x.message);
      this.RefreshData();
      if (this.saved) {
        this.saved();
      }
    }).catch(x => {
      this.isSubmitted = false;
      this.loading = false;
    });

  }

  openCHEF(data,ch_record?) {
    this.dialogFormService.open(ClinicHistoryNursingListComponent, {
      context: {
        // title: 'Editar agendamiento',
        data,
        ch_record2:ch_record,
        user: this.user,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  RefreshData() {
    this.table.refresh();
  }

}
