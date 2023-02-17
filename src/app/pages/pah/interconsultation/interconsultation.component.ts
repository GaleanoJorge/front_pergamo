import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { SectionalCouncilService } from '../../../business-controller/sectional-council.service';
import { StatusFieldComponent } from '../../components/status-field/status-field.component.js';
import { NbToastrService, NbDialogService } from '@nebular/theme';
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
import { AssistanceSpecialService } from '../../../business-controller/assistance-special.service';
import { SuppliesView } from '../../pad/management-plan/supplies-view/supplies-view.component';
import { Actions5Component } from '../../clinic-history/ch-record-list/actions.component';

@Component({
  selector: 'ngx-interconsultation',
  templateUrl: './interconsultation.component.html',
  styleUrls: ['./interconsultation.component.scss'],
})
export class InterconsultationComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @ViewChild('formulations', { read: TemplateRef }) formulations: TemplateRef<HTMLElement>;
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
    /*09*/ 'Cant. Dispansada',
  ];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}, ${this.headerFields[2]}, ${this.headerFields[3]}, ${this.headerFields[4]}`;
  public routes = [];
  public data = [];
  public dialog;
  public admissions_id;
  public saved: any = null;
  public user;
  public actual_location;
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
  public specialty;
  public specialty_id;
  public show_labs = false;

  public disabled: boolean = false;
  public showButtom: boolean = false;
  static datePipe2: any;

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
          if (this.type_of_attention != -1 && row.status == 'ACTIVO') {
            this.showButtom = false;
          }
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
      created_at: {
        title: this.headerFields[0],
        width: 'string',
        valuePrepareFunction(value, row) {
          return InterconsultationComponent.datePipe2.transform4(row.created_at);
        },
      },
      updated_at: {
        title: this.headerFields[2],
        width: 'string',
        valuePrepareFunction(value, row) {
          return InterconsultationComponent.datePipe2.transform4(row.updated_at);
        },
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
            'refresh': this.closeDialog.bind(this),
          };
        },
        renderComponent: ActionsFormulationComponent,
      },

      created_at: {
        title: this.headerFields2[0],
        type: 'string',
        valuePrepareFunction(value) {
          return InterconsultationComponent.datePipe2.transform4(value);
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
      given_amount: {
        title: this.headerFields2[9],
        width: 'string',
        valuePrepareFunction(value, row) {
          if (row.pharmacy_product_request.many_pharmacy_request_shipping.length == 0) {
            return 0;
          } else {
            var a = 0;
            row.pharmacy_product_request.many_pharmacy_request_shipping.forEach(x => {
              a += x.amount;
            });
            return a;
          }
        },
      },
      observation: {
        title: this.headerFields2[7],
        width: 'string',
      },
    },
  };

  constructor(
    public datePipe: DateFormatPipe,
    private route: ActivatedRoute,
    private chRecordS: ChRecordService,
    private toastService: NbToastrService,
    private patientBS: PatientService,
    private dialogFormService: NbDialogService,
    private userBS: UserBusinessService,
    private dialogService: NbDialogService,
    private authService: AuthService,
    private admissionsS: AdmissionsService,
    private ChInterconsultationS: ChInterconsultationService,
    private location: Location,
    private AssistanceS: AssistanceSpecialService,
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
    InterconsultationComponent.datePipe2 = this.datePipe;
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
        this.actual_location = this.admissions[0].location[this.admissions[0].location.length - 1];
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
            this.showButtom = this.currentRole.id == 3 || this.currentRole.id == 8 || this.currentRole.id == 9 || this.currentRole.id == 14 ? true : false;
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

    if (this.currentRole.id == 14 || this.currentRole.id == 7) {
      this.AssistanceS.GetCollection({
        user_id: this.own_user.id,
        specialty_id: this.type_of_attention == -1 ? 137 : 0,
      }).then(x => {
        this.specialty = x;
        if (x.length == 0) {
          this.showButtom = false;
        }
      });
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

  NewChRecord(dialog: TemplateRef<any> = null) {
    // if (((this.currentRole.id == 14 || this.currentRole.id == 7) && dialog) && this.type_of_attention != -1) {
    //   this.specialty_id = null;
    //   this.showFormulations(dialog)
    // } else if (((this.currentRole.id == 14 || this.currentRole.id == 7) && !this.specialty_id) && this.type_of_attention != -1) {
    //   this.toastService.danger('Seleccione especialidad', 'ERROR');
    // } else {
    // }
      this.chRecordS
        .Save({
          status: 'ACTIVO',
          admissions_id: this.admissions_id,
          ch_interconsultation_id: this.ch_interconsultation_id,
          user_id: this.own_user.id,
          type_of_attention_id: this.type_of_attention,
          role: this.currentRole.id,
          specialty_id: this.type_of_attention == -1 && this.currentRole.id == 14 && this.showButtom ? 137 : null,
        })
        .then((x) => {
          this.toastService.success('', x.message);
          this.RefreshData();
          if (this.saved) {
            this.saved();
          }
          if (this.dialog) {
            this.closeDialog();
          }
        })
        .catch((x) => {
          this.toastService.danger(x, 'ERROR');
          this.isSubmitted = false;
          this.loading = false;
          if (this.dialog) {
            this.closeDialog();
          }
        });
  }

  EspecialtyChange($event) {
    this.specialty_id = $event;
  }

  suppliesView() {
    this.dialogFormService.open(SuppliesView, {
      context: {
        user: this.user,
        own_user: this.own_user,
        title: 'Suministros del paciente',
        admissions_id: this.admissions_id,
        is_hospitalary: true,
      },
    });
  }

}
