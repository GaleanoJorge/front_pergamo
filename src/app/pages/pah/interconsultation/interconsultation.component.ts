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
    'Fecha de registro',
    'Personal Asistencial',
    'Fecha de atención',
    'Estado',
  ];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}, ${this.headerFields[2]}, ${this.headerFields[3]}, ${this.headerFields[4]}`;
  public routes = [];
  public data = [];
  public admissions_id;
  public saved: any = null;
  public user;
  public admissions;
  public own_user;
  public currentRole;
  public done;
  public role_user;
  public ch_interconsultation_id;
  public type_of_attention;
  public assigned;
  public show_labs = false;

  public disabled: boolean = false;
  public showButtom: boolean = true;

  @ViewChild(BaseTableComponent) table: BaseTableComponent;

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
            assigned: this.ch_interconsultation_id,
            user: this.user,
            refresh: this.RefreshData.bind(this),
          };
        },
        renderComponent: Actions5Component,
      },
      date_attention: {
        title: this.headerFields[0],
        width: 'string',
      },
      user: {
        title: this.headerFields[1],
        width: 'string',
        valuePrepareFunction(value, row) {
          return value?.firstname + ' ' + value.lastname;
        },
      },
      date_finish: {
        title: this.headerFields[2],
        width: 'string',
      },
      status: {
        title: this.headerFields[3],
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

    var curr = this.authService.GetRole();
    this.currentRole = this.authService.GetUser().roles.find(x => {
        return x.id == curr;
    });

    if (this.currentRole.role_type_id == 1) {
      this.showButtom = false;
    }

    await this.admissionsS
      .GetCollection({ admissions_id: this.admissions_id })
      .then((x) => {
        this.admissions = x;
      });

    this.own_user = this.authService.GetUser();

    await this.patientBS
      .GetUserById(this.admissions[0].patient_id)
      .then((x) => {
        this.user = x;
      });

      if(this.type_of_attention == 16){
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
