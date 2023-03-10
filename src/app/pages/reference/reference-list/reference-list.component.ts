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
import { ReferenceStatusService } from '../../../business-controller/reference-status.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { json } from '@rxweb/reactive-form-validators';


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
    /*19*/ 'NIVEL RÉGIMEN REFERIDO',
  ];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}`;
  public icon: string = 'nb-star';
  public data = [];
  public roles = [];
  public user: any = null;
  public reference_status: any = null;
  public form: FormGroup;
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
          if (row.reference_status_id == 3) {
            var c = (row.acceptance_date != null ? new Date(row.acceptance_date).getTime() :  new Date().getTime());
            var d = new Date().getTime();
        
            var e =(d - c) / (60 * 60 * 1000);
        
            return e <= 6 ? value.name : 'TIEMPO DE ESPERA FINALIZADO';
          } else {
            return value.name;
          }
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
            return row.patient.firstname ? row.patient.firstname : '' + ' ' + row.patient.lastname ? row.patient.lastname : '';
          }
        },
      },
      age: {
        title: this.headerFields[4],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          if (row.identification) {
            return row.age + ' AÑOS';
          } else {
            return row.patient.age + ' AÑOS';
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
      request_regime_level: {
        title: this.headerFields[19],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return 'NIVEL ' + value;
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
    private formBuilder: FormBuilder,
    private ReferenceStatusS: ReferenceStatusService,
    private authService: AuthService,

  ) {
  }

  async ngOnInit() {
    this.user = this.authService.GetUser();
    var curr = this.authService.GetRole();
    this.currentRole = this.user.roles.find(x => {
      return x.id == curr;
    });

    this.ReferenceStatusS.GetCollection({
      arr: JSON.stringify([1,2,3]),
    }).then(x => {
      this.reference_status = x;
    });

    this.form = this.formBuilder.group({
      reference_status_id: ['', []],
    });

    this.form.get('reference_status_id').valueChanges.subscribe(val => {
      this.changeEntity()
    });
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
        flat_id: data.acceptance_flat_id,
        pavilion_id: data.acceptance_pavilion_id,
        bed_id: data.acceptance_bed_id,
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
        reference_id: data.id,
        admission_route_id: data.acceptance_admission_route_id,
        flat_id: data.acceptance_flat_id,
        pavilion_id: data.acceptance_pavilion_id,
        bed_id: data.acceptance_bed_id,
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
        campus_id: data.acceptance_campus_id,
        user_id: data.patient_id ? data.patient_id : data.id,
        admission_data: dat,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  changeEntity() {
    this.table.changeEntity(`reference?role_id=${this.currentRole.id}&reference_status_id=${this.form.controls.reference_status_id.value}`, 'reference')
  }

}
