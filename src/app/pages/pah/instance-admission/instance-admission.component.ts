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
import { FormInstanceAdmissionComponent } from './form-instance-admission/form-instance-admission.component';
import { ActionsSemaphoreComponent } from './actions-semaphore.component';
import { DateFormatPipe } from '../../../pipe/date-format.pipe';
import { ChRecordService } from '../../../business-controller/ch_record.service';
import { ClinicHistoryNursingListComponent } from '../../clinic-history/clinic-history-nursing-list/clinic-history-nursing-list.component';
import { Location } from '@angular/common';
import { AdmissionsService } from '../../../business-controller/admissions.service';

@Component({
  selector: 'ngx-instance-admission',
  templateUrl: './instance-admission.component.html',
  styleUrls: ['./instance-admission.component.scss'],
})
export class InstanceAdmissionComponent implements OnInit {

  public isSubmitted = false;
  public entity: string;
  public loading: boolean = false;
  public loading2: boolean = false;
  public category_id: number = null;
  public messageError: string = null;
  public title: string = 'Evoluciones de Hospitalización';
  public subtitle: string = '';
  public headerFields: any[] = [
    /*00*/ 'Servicio',
    /*01*/ 'Evoluciones',
  ];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}, ${this.headerFields[2]}, ${this.headerFields[3]}, ${this.headerFields[4]}`;
  public icon: string = 'nb-star';
  public data = [];
  public arrayBuffer: any;
  public file: File;
  public admission_id;
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
      // semaphore: {
      //   type: 'custom',
      //   valuePrepareFunction: (value, row) => {
      //     // DATA FROM HERE GOES TO renderComponent
      //     return {
      //       'data': row,
      //       'getDate': this.statusSemaphor.bind(this),

      //     };
      //   },
      //   renderComponent: ActionsSemaphoreComponent,
      // },
      actions: {
        title: 'Acciones',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
            'user': this.own_user,
            'admission_id': this.admission_id,
            'refresh': this.RefreshData.bind(this),
            'currentRole': this.currentRole.role_type_id,
          };
        },
        renderComponent: Actions4Component,
      },
      services_briefcase: {
        title: this.headerFields[0],
        type: 'string',
        valuePrepareFunction: (value) => {
          return value.manual_price.procedure.name;
        },
      },
      evolutions: {
        title: this.headerFields[1],
        type: 'string',
        valuePrepareFunction: (value) => {
          if (value) {
            return value;
          } else {
            return 0;
          }
        },
      },
    },
  };

  public routes = [
    {
      name: 'Pah',
      route: '/pages/pah/list',
    },
    {
      name: 'Instancias de hospitalización',
      route: '/pages/pah/instance-admission',
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
    private AdmissionsS: AdmissionsService,
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
  public show_labs = false;






  async ngOnInit() {
    this.admission_id = this.route.snapshot.params.admission_id;
    this.own_user = this.authService.GetUser();
    var curr = this.authService.GetRole();
    this.currentRole = this.authService.GetUser().roles.find(x => {
      return x.id == curr;
    });

    this.AdmissionsS.GetCollection({
      admissions_id: this.admission_id
    }).then(x => {
      this.user = x[0]['patients'];
    });

    this.settings = this.settings1;

    this.entity = 'ch_interconsultation?admissions_id=' + this.admission_id + '&ambulatory_medical_order=1';


  }
  back() {
    this.location.back();
  };

  RefreshData() {
    this.table.refresh();
  }

}
