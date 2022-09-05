import { Component, OnInit, ViewChild } from '@angular/core';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { StatusFieldComponent } from '../../components/status-field/status-field.component';
import { Actions2Component } from './actions.component';
import { CurrencyPipe } from '@angular/common';
import { FormHumanTalentRequestComponent } from './form-human-talent-request/form-human-talent-request.component';
import { HumanTalentRequestService } from '../../../business-controller/human-talent-request.service';
import { DateFormatPipe } from '../../../pipe/date-format.pipe';
import { RoleBusinessService } from '../../../business-controller/role-business.service';
import { AuthService } from '../../../services/auth.service';
import { FormUserComponent } from '../../setting/users/form-user/form-user.component';
import { HumanTalentRequestObservationService } from '../../../business-controller/human-talent-request-observation.service';


@Component({
  selector: 'ngx-human-talent-request',
  templateUrl: './human-talent-request-list.component.html',
  styleUrls: ['./human-talent-request-list.component.scss']
})
export class HumanTalentRequestListComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Solicitudes de personal';
  public subtitle: string = 'Gestión';
  public headerFields: any[] = ['TIPO DE PERSONAL A SOLICITAR','TIPO DE ATENCIÓN', 'IDENTIFICACIÓN PACIENTE', 'NOMBRE PACIENTE', 'ZONA', 'BARRIO', 'FECHA DE SOLICITUD', 'ESTADO', 'OBSERVACIONES', 'TELECONSULTA'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}`;
  public icon: string = 'nb-star';
  public data = [];
  public roles = [];
  public user: any = null;
  public human_talent_request_observation: any = [];
  public currentRole;
  public role2;

  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  public settings = {
    pager: {
      display: true,
      perPage: 10,
    },
    columns: {
      actions: {
        title: 'Acciones',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
            'role': this.currentRole,
            'edit': this.EditHumanTalentRequest.bind(this),
            'new': this.NewHumanTalentRequest.bind(this),
            'update': this.UpdateRequest.bind(this),
            'saved': this.RefreshData.bind(this),
            'human_talent_request_observation': this.human_talent_request_observation,
            'status': row.status == 'Creada' ? 0 : row.status == 'Aprobada PAD' ? 1 : row.status == 'Rechazada PAD' ? 2 : row.status == 'Aprobada TH' ? 3 : 4 /*Rechazada TH*/,

          };
        },
        renderComponent: Actions2Component,
      },
      status: {
        title: this.headerFields[7],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          if ( this.currentRole == 23 && value == 'Aprobada PAD') {
            return 'En proceso';
          } else {
            return value;
          }
        },

      },
      name: {
        title: this.headerFields[0],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          this.role2 = row.role_id;
          return value;
        },
      },
      management_plan: {
        title: this.headerFields[1],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.type_of_attention.name;
        },
      },
      identification: {
        title: this.headerFields[2],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return row.admissions.patients.identification;
        },
      },
      nombre: {
        title: this.headerFields[3],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return row.admissions.patients.firstname + ' ' + row.admissions.patients.lastname;
        },
      },
      locality: {
        title: this.headerFields[4],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          if (row.management_plan.phone_consult == 1) {
            return 'N.A.'
          } else {
            return row.admissions.patients.locality.name;
          }
        },
      },
      residence: {
        title: this.headerFields[5],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          if (row.management_plan.phone_consult == 1) {
            return 'N.A.'
          } else {
            return row.admissions.patients.residence.name;
          }
        },
      },
      phone_consult: {
        title: this.headerFields[9],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          if (row.management_plan.phone_consult == 1) {
            return 'SI';
          } else {
            return 'N.A.'
          }
        },
      },
      created_at: {
        title: this.headerFields[6],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return this.datePipe.transform2(value);
        },
      },
      observation: {
        title: this.headerFields[8],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value;
        },
      },
    },
  };

  public routes = [
    {
      name: 'Solicitudes de personal',
      route: '../../setting/account-receivable',
    },
  ];

  constructor(
    private HumanTalentRequestS: HumanTalentRequestService,
    private toastrService: NbToastrService,
    private dialogFormService: NbDialogService,
    private currency: CurrencyPipe,
    public datePipe: DateFormatPipe,
    public roleBS: RoleBusinessService,
    private deleteConfirmService: NbDialogService,
    private authService: AuthService,
    private HumanTalentRequestObservationS: HumanTalentRequestObservationService,

  ) {
  }

  async ngOnInit() {
    this.user = this.authService.GetUser();
    this.currentRole = this.authService.GetRole();
    this.HumanTalentRequestObservationS.GetCollection({
      category: 1,
    }).then(x => {
      this.human_talent_request_observation = x;
    });
  }

  RefreshData() {

    this.table.refresh();
  }

  NewHumanTalentRequest(data) {
    this.dialogFormService.open(FormUserComponent, {
      context: {
        title: 'Nuevo Personal',
        role2: data.role_id,
        isTH: data.id,
        saved: this.RefreshData.bind(this),
      },
      dialogClass: 'scroll'
    });
  }

  UpdateRequest(data, status) {
    this.HumanTalentRequestS.Update({
      id: data.id,
      observation: '',
      status: status,
    }).then(x => {
      this.toastrService.success(x.message, 'CORRECTO');
      this.RefreshData();
    });
  }

  EditHumanTalentRequest(data) {
    this.dialogFormService.open(FormHumanTalentRequestComponent, {
      context: {
        title: 'Editar cuenta de cobro',
        data,
        saved: this.RefreshData.bind(this),
      },
    });
  }


}
