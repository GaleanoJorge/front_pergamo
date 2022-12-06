import { UserBusinessService } from '../../../business-controller/user-business.service';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { ActivatedRoute } from '@angular/router';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { Actions5Component } from './actions.component';
import { ChRecordService } from '../../../business-controller/ch_record.service';
import { AuthService } from '../../../services/auth.service';
import { PatientService } from '../../../business-controller/patient.service';
import { AdmissionsService } from '../../../business-controller/admissions.service';
import { DateFormatPipe } from '../../../pipe/date-format.pipe';
import { Location } from '@angular/common';
import PouchDB from 'pouchdb-browser';
import { AssignedManagementPlanService } from '../../../business-controller/assigned-management-plan.service';

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
    'Fecha de Registro',
    'Personal Asistencial',
    'Fecha de Atención',
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
  public done;
  public role_user;
  public assigned_management_plan;
  public type_of_attention;
  public assigned;
  public show_labs = false;
  public ch_record_list = null;
  public navigation: boolean;
  public id_table;

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
            assigned: this.assigned_management_plan,
            user: this.user,
            refresh: this.RefreshData.bind(this),
            navigation: this.navigation,
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
    this.admissions_id = this.route.snapshot.params.id;
    this.assigned_management_plan = this.route.snapshot.params.id2;
    this.type_of_attention = this.route.snapshot.params.id3;
    this.navigation = navigator.onLine;
    this.id_table= "ch_record_list_"+this.admissions_id;
    if (navigator.onLine) {
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
      this.entity="ch_record/byadmission/"+this.admissions_id +"/"+this.assigned_management_plan;
    } else {
      var entry = 'ch_record_list_'+this.admissions_id;
      let dataTable = new PouchDB(entry);
      await dataTable
        .get(entry, function (err, doc) {
          if (err) {
            console.log(err);
          }
        })
        .then((x) => {
          this.ch_record_list = x.data;
        });
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
        assigned_management_plan: this.assigned_management_plan,
        user_id: this.own_user.id,
        type_of_attention_id: this.type_of_attention,
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
