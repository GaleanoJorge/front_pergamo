import { Component, OnInit, ViewChild } from '@angular/core';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { Actions2Component } from './actions.component';
import { CurrencyPipe } from '@angular/common';
import { FormReferenceComponent } from './form-reference/form-reference.component';
import { DateFormatPipe } from '../../../pipe/date-format.pipe';
import { RoleBusinessService } from '../../../business-controller/role-business.service';
import { AuthService } from '../../../services/auth.service';
import { FormUserComponent } from '../../setting/users/form-user/form-user.component';
import { FormPatientDataComponent } from '../../admissions/patient-data/form-admissions-patient/form-patient-data.component';


@Component({
  selector: 'ngx-reference-list',
  templateUrl: './reference-list.component.html',
  styleUrls: ['./reference-list.component.scss']
})
export class ReferenceListComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'REFERENCIA Y CONTRAREFERENCIA';
  public subtitle: string = 'Gestión';
  public headerFields: any[] = [
    /*0*/  'ESTADO',
    /*1*/  'TIPO DE DOCUMENTO',
    /*2*/  'DOCUMENTO',
    /*3*/  'NOMBRE',
    /*4*/  'EDAD',
    /*5*/  'INTENCIÓN',
    /*6*/  'FECHA DE PRESENTACIÓN',
    /*7*/  'GÉNERO',
    /*8*/  'PROCEDIMIENTO',
    /*9*/  'EAPB',
    /*10*/ 'DIAGNÓSTICO',
    /*11*/ 'IPS DE PROCEDENCIA',
    /*12*/ 'TIPO DE ESTANCIA',
    /*13*/ 'SEDE REFERIDA',
    /*14*/ 'RÉGIMEN REFERIDO',
    /*15*/ 'MEDIO TECNOLÓGICO REFERIDO',
    /*16*/ 'AMBITO REFERIDO',
    /*17*/ 'ESPACIALIDAD REFERIDA',
    /*18*/ 'PROGRAMA REFERIDO',
  ];
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
            'role': this.currentRole.id,
            'edit': this.EditReference.bind(this),
            'update': this.UpdateRequest.bind(this),
            'admission': this.NewAdmissionRequest.bind(this),
            'patient': this.NewPatientRequest.bind(this),
          };
        },
        renderComponent: Actions2Component,
      },
      reference_status: {
        title: this.headerFields[0],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.name;
        },
      },
      identification_type: {
        title: this.headerFields[1],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          if (value) {
            return value.code;
          } else {
            return row.patient.identification_type.code;
          }
        },
      },
      identification: {
        title: this.headerFields[2],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          if (value) {
            return value;
          } else {
            return row.patient.identification;
          }
        },
      },
      name: {
        title: this.headerFields[3],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          if (row.identification) {
            return row.firstname + ' ' + row.lastname;
          } else {
            return row.patient.firstname + ' ' + row.patient.lastname;
          }
        },
      },
      age: {
        title: this.headerFields[4],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          if (row.identification) {
            return row.age;
          } else {
            return row.patient.age;
          }
        },
      },
      gender: {
        title: this.headerFields[7],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          if (row.identification) {
            return row.gender.name;
          } else {
            return row.patient.gender.name;
          }
        },
      },
      intention: {
        title: this.headerFields[5],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value;
        },
      },
      presentation_date: {
        title: this.headerFields[6],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value;
        },
      },
      procedure: {
        title: this.headerFields[8],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.name;
        },
      },
      company: {
        title: this.headerFields[9],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.name;
        },
      },
      diagnosis: {
        title: this.headerFields[10],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.name;
        },
      },
      providers_of_health_services: {
        title: this.headerFields[11],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.name;
        },
      },
      stay_type: {
        title: this.headerFields[12],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.name;
        },
      },
      request_campus: {
        title: this.headerFields[13],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.name;
        },
      },
      request_regime: {
        title: this.headerFields[14],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.name;
        },
      },
      request_technological_medium: {
        title: this.headerFields[15],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.name;
        },
      },
      request_admission_route: {
        title: this.headerFields[16],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.name;
        },
      },
      request_specialty: {
        title: this.headerFields[17],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.name;
        },
      },
      request_program: {
        title: this.headerFields[18],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.name;
        },
      },
    },
  };

  public routes = [
    {
      name: 'Referencia y contrareferencia',
      route: '../../reference/list',
    },
  ];

  constructor(
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
    var curr = this.authService.GetRole();
    this.currentRole = this.user.roles.find(x => {
      return x.id == curr;
    });
    // this.ReferenceObservationS.GetCollection({
    //   category: 1,
    // }).then(x => {
    //   this.human_talent_request_observation = x;
    // });
  }

  RefreshData() {

    this.table.refresh();
  }

  NewReference() {
    this.dialogFormService.open(FormReferenceComponent, {
      context: {
        title: 'Nueva Referencia',
        route: 1,
        saved: this.RefreshData.bind(this),
      },
      dialogClass: 'scroll'
    });
  }

  UpdateRequest(data, status) {
    // this.ReferenceS.Update({
    //   id: data.id,
    //   observation: '',
    //   status: status,
    // }).then(x => {
    //   this.toastrService.success(x.message, 'CORRECTO');
    //   this.RefreshData();
    // });
  }

  EditReference(data, route) {
    this.dialogFormService.open(FormReferenceComponent, {
      context: {
        title: route == 1 ? 'Editar Referencia' : route == 2 ? 'Aprobar Referencia' : 'Rechazar Referencia',
        data,
        route: route,
        saved: this.RefreshData.bind(this),
        new_patient: this.NewPatientRequest.bind(this),
        new_admission: this.NewAdmissionRequest.bind(this),
      },
    });
  }

  NewPatientRequest(data, dat = null) {
    if (dat == null) {
      dat = {
        admission_route_id: data.acceptance_admission_route_id,
        program_id: data.acceptance_program_id,
        regime_id: data.acceptance_regime_id,
        eps: data.company_id,
        diagnosis: data.diagnosis_id,
      };
    }
    data.id = null;
    this.dialogFormService.open(FormUserComponent, {
      context: {
        title: 'Nuevo Personal',
        role2: 2,
        dat: dat,
        data: data,
        saved: this.NewAdmissionRequest.bind(this),
      },
      dialogClass: 'scroll'
    });
  }

  NewAdmissionRequest(data, dat = null) {
    if (dat == null) {
      dat = {
        admission_route_id: data.acceptance_admission_route_id,
        program_id: data.acceptance_program_id,
        regime_id: data.acceptance_regime_id,
        eps: data.company_id,
        diagnosis: data.diagnosis_id,
      };
    }

    this.dialogFormService.open(FormPatientDataComponent, {
      closeOnBackdropClick: false,
      closeOnEsc: false,
      context: {
        title: 'Crear nuevo ingreso',
        user_id: data.patient_id ? data.patient_id : data.id,
        admission_data: dat,
        saved: this.RefreshData.bind(this),
      },
    });
  }

}
