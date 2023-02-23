import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserBusinessService } from '../../../business-controller/user-business.service';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { ActivatedRoute, Params } from '@angular/router';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { Actions5Component } from './actions.component';
import { ChRecordService } from '../../../business-controller/ch_record.service';
import { AuthService } from '../../../services/auth.service';
import { PatientService } from '../../../business-controller/patient.service';
import { AdmissionsService } from '../../../business-controller/admissions.service';
import { DateFormatPipe } from '../../../pipe/date-format.pipe';
import { Location } from '@angular/common';
import { AssignedManagementPlanService } from '../../../business-controller/assigned-management-plan.service';
import { MedicalDiaryDaysService } from '../../../business-controller/medical_diary_days.service';
import { required } from '@rxweb/reactive-form-validators';
import { SuppliesView } from '../../pad/management-plan/supplies-view/supplies-view.component';
import { ChRecordSelectComponent } from './ch-record-select/ch-record-select.component';

@Component({
  selector: 'ngx-ch-record-list',
  templateUrl: './ch-record-list.component.html',
  styleUrls: ['./ch-record-list.component.scss'],
})
export class ChRecordListComponent implements OnInit {
  linearMode = true;
  public isSubmitted = false;
  public entity: string;
  public loading: boolean = false;
  public loading2: boolean = false;
  public category_id: number = null;
  public messageError: string = null;
  public title = 'Registo Historia Clinica';
  public subtitle: string = '';
  public headerFields: any[] = [
    'Fecha de registro',
    'Personal Asistencial',
    'Fecha de atención',
    'Estado',
  ];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}, ${this.headerFields[2]}, ${this.headerFields[3]}, ${this.headerFields[4]}`;
  public routes = [];
  public data = [];
  public admissions_id;
  public actual_location;
  public external_consult_id;
  public external_consult: any[] = [];
  public assistance_special: any[] = [];
  public saved: any = null;
  public dialog;
  public user;
  public admissions;
  public own_user;
  public done;
  public role_user;
  public assigned_management_plan;
  public type_of_attention;
  public assigned;
  public currentRole;
  public show_labs = false;
  public form: FormGroup;
  static datePipe2: any;

  public disabled: boolean = false;
  public showButtom: boolean = true;

  public selectedSpeciality = null;

  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @ViewChild('masiveAuth', { read: TemplateRef }) masiveAuth: TemplateRef<HTMLElement>;


  toggleLinearMode() {
    this.linearMode = !this.linearMode;
  }
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
          if (row.status == 'ACTIVO' || row.status == null) {
            this.showButtom = false;
          }
          // DATA FROM HERE GOES TO renderComponent
          return {
            data: row,
            assigned: this.assigned_management_plan,
            user: this.user,
            refresh: this.RefreshData.bind(this),
          };
        },
        renderComponent: Actions5Component,
      },
      created_at: {
        title: this.headerFields[0],
        width: 'string',
        valuePrepareFunction(value, row) {
          return ChRecordListComponent.datePipe2.transform4(value);
        },
      },
      user: {
        title: this.headerFields[1],
        width: 'string',
        valuePrepareFunction(value, row) {
          return value?.firstname + ' ' + value.lastname;
        },
      },
      updated_at: {
        title: this.headerFields[2],
        width: 'string',
        valuePrepareFunction(value, row) {
          return ChRecordListComponent.datePipe2.transform4(value);
        },
      },
      status: {
        title: this.headerFields[3],
        width: 'string',
      },
    },
  };

  constructor(
    private route: ActivatedRoute,
    private dialogFormService: NbDialogService,
    private chRecordS: ChRecordService,
    private toastService: NbToastrService,
    private patientBS: PatientService,
    private formBuilder: FormBuilder,
    private userBS: UserBusinessService,
    private dialogService: NbDialogService,
    private MedicalDiaryDays: MedicalDiaryDaysService,
    private authService: AuthService,
    private admissionsS: AdmissionsService,
    public datePipe: DateFormatPipe,
    private location: Location,
    public assignedService: AssignedManagementPlanService
  ) {
    this.routes = [
      {
        name: 'Pacientes',
        route: '../../list',
      },
      {
        name: 'Registro Histotia Clinica',
        route: '../../clinic-history/' + this.route.snapshot.params.user_id,
      },
    ];
  }

  GetParams() {
    return {
      admissions_id: this.route.snapshot.params.id,
    };
  }

  async ngOnInit() {
    ChRecordListComponent.datePipe2 = this.datePipe;
    Number((this.admissions_id = this.route.snapshot.params.id));
    var curr = this.authService.GetRole();
    this.currentRole = this.authService.GetUser().roles.find(x => {
      return x.id == curr;
    });
    if (this.route.snapshot.queryParams.ext_con) {
      this.type_of_attention = -2;
      this.external_consult_id = this.route.snapshot.params.id2;
      this.entity = `ch_record/byadmission/${this.admissions_id}/${this.external_consult_id}?ext_con=${this.route.snapshot.queryParams.ext_con}`;
      await this.MedicalDiaryDays.GetOne(this.external_consult_id)
        .then((x) => {
          this.external_consult = x;
        })
        .catch((x) => {
          this.toastService.warning('', 'Agenda no encontrada');
        });

      this.form = this.formBuilder.group({
        speciality_id: [
          null,
          Validators.compose([Validators.required]),
        ],
      });
    } else {
      this.assigned_management_plan = this.route.snapshot.params.id2;
      this.type_of_attention = this.route.snapshot.params.id3;
      this.entity = `ch_record/byadmission/${this.admissions_id}/${this.assigned_management_plan}`;
      if (this.type_of_attention == 16) {
        await this.assignedService
          .GetCollection({
            assigned_management_plan_id: this.assigned_management_plan,
          })
          .then((x) => {
            this.assigned = x;
            if (
              this.assigned[0].management_plan.management_procedure.length > 0
            ) {
              this.show_labs = true;
            }
          });
      }
    }

    await this.admissionsS
      .GetCollection({ admissions_id: this.admissions_id })
      .then((x) => {
        this.admissions = x;
        this.actual_location = this.admissions[0].location[this.admissions[0].location.length - 1];
      });

    this.own_user = this.authService.GetUser();

    await this.patientBS
      .GetUserById(this.admissions[0].patient_id)
      .then((x) => {
        this.user = x;
      });
  }

  back() {
    this.location.back();
  }

  RefreshData() {
    this.table.refresh();
  }

  CreateChRecord() {
    let userData = JSON.parse(localStorage.getItem('user'));
    if (+localStorage.getItem('role_id') == 14 && userData.assistance.length > 1 && userData.assistance[0].assistance_special.length > 1) {
      this.dialogFormService.open(ChRecordSelectComponent, {
        context: {
          title: 'Creación de historia clínica',
          executeAction: this.NewChRecord.bind(this),
          textConfirm: "Crear"
        }
      })
    }else{
      this.selectedSpeciality = userData.assistance.length > 1 && userData.assistance[0].assistance_special.length > 0 ? userData.assistance[0].assistance_special[0].specialty_id : null;
      this.NewChRecord();
    }
  }

  NewChRecord(arg = null) {
    this.chRecordS
      .Save({
        status: 'ACTIVO',
        admissions_id: this.admissions_id,
        assigned_management_plan: this.assigned_management_plan,
        role_id: +localStorage.getItem('role_id'),
        medical_diary_days_id: this.external_consult_id
          ? this.external_consult_id
          : null,
        user_id: this.own_user.id,
        type_of_attention_id: this.type_of_attention,
        isExternalConsultation: (this.external_consult && this.external_consult.length > 0),
        //procedureName: (this.external_consult && this.external_consult.length > 0) ? this.external_consult[0].services_briefcase.manual_price.procedure.name : null,
        speciality_id: this.route.snapshot.queryParams.ext_con ? this.form?.value.speciality_id : null,
        speciality: arg ? arg:this.selectedSpeciality
      })
      .then((x) => {
        if (x.data.assistance_special) {
          this.toastService.warning(x.message, 'ERROR');
          this.assistance_special = x.data.assistance_special;
          this.ConfirmActions();
        } else {
          this.assistance_special = null;
          this.dialog?.close();
          this.toastService.success('', x.message);
          this.RefreshData();
          if (this.saved) {
            this.saved();
          }
        }
      })
      .catch((x) => {
        this.toastService.danger(x.message, 'ERROR');
        this.isSubmitted = false;
        this.loading = false;
      });
  }

  ConfirmActions() {
    this.dialog = this.dialogFormService.open(this.masiveAuth);
  }

  suppliesView() {
    this.dialogFormService.open(SuppliesView, {
      context: {
        user: this.user,
        own_user: this.own_user,
        title: 'Suministros del paciente',
        admissions_id: this.admissions_id,
        is_hospitalary: this.actual_location.flat ? true : false,
      },
    });
  }
}
