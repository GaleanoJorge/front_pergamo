import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { SectionalCouncilService } from '../../../business-controller/sectional-council.service';
import { StatusFieldComponent } from '../../components/status-field/status-field.component.js';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { Actions5Component } from './actions.component';
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
import { FormInterconsultationComponent } from './form-interconsultation/form-interconsultation.component';
import { DateFormatPipe } from '../../../pipe/date-format.pipe';
import { ChRecordService } from '../../../business-controller/ch_record.service';
import { ClinicHistoryNursingListComponent } from '../../clinic-history/clinic-history-nursing-list/clinic-history-nursing-list.component';
import { Location } from '@angular/common';
import { AdmissionsService } from '../../../business-controller/admissions.service';
import { ChInterconsultationService } from '../../../business-controller/ch-interconsultation.service';
import { count } from 'console';
import { ActionsFormulationComponent } from './actions-formulation.component';

@Component({
  selector: 'ngx-interconsultation',
  templateUrl: './interconsultation.component.html',
  styleUrls: ['./interconsultation.component.scss'],
})
export class InterconsultationComponent implements OnInit {

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
    /*00*/'Fecha de registro',
    /*01*/'Personal Asistencial',
    /*02*/'Fecha de atención',
    /*03*/'Estado',
    /*04*/'Tipo de Registro',
    /*05*/'N° registro',
  ];
  public headerFields2: any[] = [
    /*00*/ 'Fecha',
    /*01*/ 'Descripción',
    /*02*/ 'Dosis',
    /*03*/ 'Vía De Administración',
    /*04*/ 'Frecuencia Horaria ',
    /*05*/ 'Días De Tratamiento',
    /*06*/ 'Cant. Solic ',
    /*07*/ 'Observaciones',
    /*08*/ 'Medicamento',
  ];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}, ${this.headerFields[2]}, ${this.headerFields[3]}, ${this.headerFields[4]}`;
  public routes = [];
  public data = [];
  public dialog;
  public admissions_id;
  public saved: any = null;
  public user;
  public admissions;
  public available_roles;
  public own_user;
  public service;
  public ch_interconsultation;
  public currentRole;
  public done;
  public role_user;
  public ch_interconsultation_id;
  public type_of_attention;
  public assigned;
  public show_labs = false;

  public disabled: boolean = false;
  public showButtom: boolean = false;

  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @ViewChild('formulations', { read: TemplateRef }) formulations: TemplateRef<HTMLElement>;

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
          return {
            data: row,
            assigned: this.ch_interconsultation_id,
            user: this.user,
            refresh: this.RefreshData.bind(this),
          };
        },
        renderComponent: Actions5Component,
      },
      ch_type: {
        title: this.headerFields[4],
        width: 'string',
        valuePrepareFunction(value, row) {
          if (value) {
            return (value.name).toUpperCase();
          } else {
            return 'N.A.';
          }
        },
      },
      user: {
        title: this.headerFields[1],
        width: 'string',
        valuePrepareFunction(value, row) {
          return value?.firstname + ' ' + value.lastname;
        },
      },
      date_attention: {
        title: this.headerFields[0],
        width: 'string',
      },
      date_finish: {
        title: this.headerFields[2],
        width: 'string',
      },
      consecutive: {
        title: this.headerFields[5],
        width: 'string',
        valuePrepareFunction(value, row) {
          if (value) {
            return value;
          } else {
            return '-';
          }
        },
      },
      status: {
        title: this.headerFields[3],
        width: 'string',
      },
    },
  };

  public settings2 = {
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
            'admissions_id': this.admissions_id,
          };
        },
        renderComponent: ActionsFormulationComponent,
      },

      created_at: {
        title: this.headerFields2[0],
        type: 'string',
        valuePrepareFunction: (value) => {
          return this.datePipe.transform2(value);
        },
      },

      product_generic_id: {
        title: this.headerFields2[8],
        width: 'string',
        valuePrepareFunction(value, row) {
          if (value) {
            return row.product_generic.description;
          } else {
            return 'No aplica'
          }
        },

      },
      dose: {
        title: this.headerFields2[2],
        width: 'string',
        valuePrepareFunction(value, row) {
          return value + ' ' + (row.product_generic.multidose_concentration ? row.product_generic.multidose_concentration.name : row.product_generic.measurement_units.code);
        },
      },
      administration_route: {
        title: this.headerFields2[3],
        width: 'string',
        valuePrepareFunction(value, row) {
          return value.name;
        },

      },
      hourly_frequency: {
        title: this.headerFields2[4],
        width: 'string',
        valuePrepareFunction(value, row) {
          return 'CADA ' + value.value + ' ' + row.hourly_frequency.name;
        },
      },
      treatment_days: {
        title: this.headerFields2[5],
        width: 'string',
      },
      outpatient_formulation: {
        title: this.headerFields2[6],
        width: 'string',
      },
      observation: {
        title: this.headerFields2[7],
        width: 'string',
      },
    },
  };

  constructor(
    private route: ActivatedRoute,
    private chRecordS: ChRecordService,
    private toastService: NbToastrService,
    private patientBS: PatientService,
    private userBS: UserBusinessService,
    private dialogService: NbDialogService,
    private authService: AuthService,
    private admissionsS: AdmissionsService,
    private ChInterconsultationS: ChInterconsultationService,
    public datePipe: DateFormatPipe,
    private location: Location,
    // public assignedService: AssignedManagementPlanService
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
    this.admissions_id = this.route.snapshot.params.id;
    this.ch_interconsultation_id = this.route.snapshot.params.id2;
    this.type_of_attention = this.route.snapshot.params.id3;

    this.own_user = this.authService.GetUser();

    var curr = this.authService.GetRole();
    this.currentRole = this.authService.GetUser().roles.find(x => {
      return x.id == curr;
    });

    await this.admissionsS
      .GetCollection({ admissions_id: this.admissions_id })
      .then((x) => {
        this.admissions = x;
      });

    await this.ChInterconsultationS
      .GetCollection({ id: this.ch_interconsultation_id })
      .then((x) => {
        this.available_roles = x[0]['roles'];
      });

    await this.patientBS
      .GetUserById(this.admissions[0].patient_id)
      .then((x) => {
        this.user = x;
        var a = x['admissions'][x['admissions'].length - 1].ch_interconsultation;
        this.ch_interconsultation = a.find(item => item.id == this.ch_interconsultation_id);
        if (this.currentRole.role_type_id == 1) {
          this.showButtom = false;
        } else {
          if (this.available_roles.length > 0) {
            this.available_roles.forEach(element => {
              if (element.role_id == this.currentRole.id) {
                this.showButtom = true;
              }
            });
          } else {
            this.showButtom = this.currentRole.id == 3 || this.currentRole.id == 8 ? true : false;
          }
        }
        if ((this.ch_interconsultation.amount != null && this.ch_interconsultation.amount != 0) && (this.ch_interconsultation.amount <= this.ch_interconsultation.many_ch_record.length)) {
          this.showButtom = false;
        }
        this.service = this.ch_interconsultation.services_briefcase.manual_price.procedure.name;
      });

    if (this.type_of_attention == 16) {
      // await this.assignedService
      //   .GetCollection({
      //     assigned_management_plan_id: this.assigned_management_plan,
      //   })
      //   .then((x) => {
      //     this.assigned = x;
      //     if (this.assigned[0].management_plan.management_procedure.length > 0) {
      //       this.show_labs = true;
      //     }
      //   });
    }
  }

  back() {
    this.location.back();
  }

  RefreshData() {
    this.table.refresh();
  }

  showFormulations(dialog: TemplateRef<any>) {
    this.dialog = this.dialogService.open(dialog);
  }

  closeDialog() {
    this.dialog.close();
  }

  NewChRecord() {
    this.chRecordS
      .Save({
        status: 'ACTIVO',
        admissions_id: this.admissions_id,
        ch_interconsultation_id: this.ch_interconsultation_id,
        user_id: this.own_user.id,
        type_of_attention_id: this.type_of_attention,
        role: this.currentRole.id,
      })
      .then((x) => {
        this.toastService.success('', x.message);
        this.RefreshData();
        if (this.saved) {
          this.saved();
        }
      })
      .catch((x) => {
        this.toastService.danger(x, 'ERROR');
        this.isSubmitted = false;
        this.loading = false;
      });
  }

}
