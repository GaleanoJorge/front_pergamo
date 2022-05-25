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
  public headerFields: any[] = [ 'TIPO DE PERSONAL A SOLICITAR','IDENTIFICACIÓN PACIENTE','NOMBRE PACIENTE','ZONA','BARRIO','FECHA DE SOLICITUD', 'ESTADO', 'OBSERVACIONES'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}`;
  public icon: string = 'nb-star';
  public data = [];
  public roles = [];
  public user;
  public currentRole;
  public role2;
  public id_htr;
  public status;

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
          this.id_htr=row.id;
          this.status=row.status;
          return {
            'data': row,
            'edit': this.EditHumanTalentRequest.bind(this),
            'new': this.NewHumanTalentRequest.bind(this),
            'saved': this.RefreshData.bind(this),
            'status':this.status=='Creada'?0:1,

          };
        },
        renderComponent: Actions2Component,
      },
      name: {
        title: this.headerFields[0],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          this.role2=row.role_id;
          return value;
        },
      },
      identification: {
        title: this.headerFields[1],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return row.admissions.patients.identification;
        },
      },
      nombre: {
        title: this.headerFields[2],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return row.admissions.patients.firstname +' '+ row.admissions.patients.lastname;
        },
      },
      locality: {
        title: this.headerFields[3],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return row.admissions.patients.locality.name;
        },
      },
      residence: {
        title: this.headerFields[4],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return row.admissions.patients.residence.name;
        },
      },
      created_at: {
        title: this.headerFields[5],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return this.datePipe.transform2(value);
        },
      },
      status: {
        title: this.headerFields[6],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value;
        },
        
      },
      observation: {
        title: this.headerFields[7],
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

  
  ) {
  }

 async ngOnInit() {
    this.user = this.authService.GetUser();
    this.currentRole = this.authService.GetRole();

  }

  RefreshData() {

    this.table.refresh();
  }

  NewHumanTalentRequest() {
    this.dialogFormService.open(FormUserComponent, {
      context: {
        title: 'Nuevo Personal',
        role2: this.role2, 
        isTH: this.id_htr, 
        saved: this.RefreshData.bind(this),
      },
      dialogClass: 'scroll'
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
