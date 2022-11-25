import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { SectionalCouncilService } from '../../../business-controller/sectional-council.service';
import { StatusFieldComponent } from '../../components/status-field/status-field.component.js';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { ActionsPahApplicationsComponent } from './actions-pah-applications.component';
import { ActivatedRoute } from '@angular/router';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { FormPahApplicationsComponent } from './form-pah-applications/form-pah-applications.component';
import * as XLSX from 'ts-xlsx';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { UserBusinessService } from '../../../business-controller/user-business.service';
import { CurrencyPipe } from '@angular/common';
import { date } from '@rxweb/reactive-form-validators';
import { PatientService } from '../../../business-controller/patient.service';
import { RoleBusinessService } from '../../../business-controller/role-business.service';
import { CompanyService } from '../../../business-controller/company.service';
import { UserAgreementService } from '../../../business-controller/user-agreements.service';
import { threadId } from 'worker_threads';
import { DateFormatPipe } from '../../../pipe/date-format.pipe';
import { BedService } from '../../../business-controller/bed.service';
import { FlatService } from '../../../business-controller/flat.service';
import { PavilionService } from '../../../business-controller/pavilion.service';
import { Row } from '@syncfusion/ej2/grids';

@Component({
  selector: 'ngx-pah-applications',
  templateUrl: './pah-applications.component.html',
  styleUrls: ['./pah-applications.component.scss'],
})
export class PahApplicationsComponent implements OnInit {

  public isSubmitted = false;
  public entity: string;
  public entity2: string;
  public loading: boolean = false;
  public loading2: boolean = false;
  public category_id: number = null;
  public messageError: string = null;
  public title: string = 'Programación de aplicaciones';
  public subtitle: string = 'Gestión';
  public headerFields: any[] = [
    /*00*/  'Piso',
    /*01*/  'Pabellón',
    /*02*/  'Cama',
    /*03*/  'Producto',
    /*04*/  'Dosis',
    /*05*/  'Fecha Aplicación',
    /*06*/  'Hora Aplicación',
    /*07*/  'Fecha Ejecución',
    /*08*/  'Identificación',
    /*09*/  'Nombre',
    /*10*/  'Edad',
  ];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}, ${this.headerFields[2]}, ${this.headerFields[3]}, ${this.headerFields[4]}`;
  public icon: string = 'nb-star';
  public data = [];
  public arrayBuffer: any;
  public file: File;
  public user_id;
  public patient_id;
  public user;
  public patients: any;
  public dialog;
  public show = false;
  public currentRole;
  public selectedOptions: any[] = [];
  public company: any[] = [];
  public result: any = null;
  public eps_id = null;
  public campus_id;
  public flat_id = 0;
  public pavilion_id = 0;
  public bed_id = 0;
  public flat;
  public pavilion;
  public bed;


  @ViewChild(BaseTableComponent) table: BaseTableComponent;

  public settings = {
    pager: {
      display: true,
      perPage: 30,
    },
    columns: {
      // semaphore: {
      //   title: '',
      //   type: 'custom',
      //   valuePrepareFunction: (value, row) => {
      //     // DATA FROM HERE GOES TO renderComponent
      //     return {
      //       'data': row,
      //       'user': this.user,
      //       'currentRole': this.currentRole.role_type_id,
      //     };
      //   },
      //   renderComponent: ActionsSemaphore2Component,
      // },
      actions: {
        title: 'Acciones',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'route': 1,
            'data': row,
            'user': this.user,
            'currentRole': this.currentRole.role_type_id,
            'management': this.patients,
            'refresh': this.RefreshData.bind(this),
          };
        },
        renderComponent: ActionsPahApplicationsComponent,
      },
      identification: {
        title: this.headerFields[8],
        type: 'string',
        valuePrepareFunction(value, row) {
          return row.management_plan.admissions.patients.identification_type.code + ' - ' + row.management_plan.admissions.patients.identification;
        },
      },
      nombre_completo: {
        title: this.headerFields[9],
        type: 'string',
        valuePrepareFunction(value, row) {
          var a = row.management_plan.admissions.patients.firstname ? row.management_plan.admissions.patients.firstname : '';
          var b = row.management_plan.admissions.patients.middlefirstname ? row.management_plan.admissions.patients.middlefirstname : '';
          var c = row.management_plan.admissions.patients.lastname ? row.management_plan.admissions.patients.lastname : '';
          var d = row.management_plan.admissions.patients.middlelastname ? row.management_plan.admissions.patients.middlelastname : '';
          return a + ' ' + b + ' ' + c + ' ' + d;
        },
      },
      birthday: {
        title: this.headerFields[10],
        type: 'string',
        valuePrepareFunction(value, row) {
          var date = new Date(row.management_plan.admissions.patients.birthday.substring(0, 10));
          var ageDifMs = Date.now() - date.getTime();
          var ageDate = new Date(ageDifMs); // miliseconds from epoch
          return Math.abs(ageDate.getUTCFullYear() - 1970) + " AÑOS";
        },
      },
      flat: {
        title: this.headerFields[0],
        type: 'string',
        valuePrepareFunction(value, row) {
          return row.management_plan.admissions.location[row.management_plan.admissions.location.length-1].flat.name;
        },
      },
      pavilion: {
        title: this.headerFields[1],
        type: 'string',
        valuePrepareFunction(value, row) {
          return row.management_plan.admissions.location[row.management_plan.admissions.location.length-1].pavilion.name;
        },
      },
      bed: {
        title: this.headerFields[2],
        type: 'string',
        valuePrepareFunction(value, row) {
          return row.management_plan.admissions.location[row.management_plan.admissions.location.length-1].bed.name;
        },
      },
      service_briefcase: {
        title: this.headerFields[3],
        type: 'string',
        valuePrepareFunction(value, row) {
          return row.management_plan.service_briefcase.manual_price.product.description;
        },
      },
      dosage_administer: {
        title: this.headerFields[4],
        type: 'string',
        valuePrepareFunction(value, row) {
          return row.management_plan.dosage_administer + ' ' + (row.management_plan.service_briefcase.manual_price.product.multidose_concentration ? row.management_plan.service_briefcase.manual_price.product.multidose_concentration.name : row.management_plan.service_briefcase.manual_price.product.measurement_units.code);
        },
      },
      start_date: {
        title: this.headerFields[5],
        type: 'string',
        valuePrepareFunction(value, row) {
          return value;
        },
      },
      start_hour: {
        title: this.headerFields[6],
        type: 'string',
        valuePrepareFunction(value, row) {
          return value;
        },
      },
      execution_date: {
        title: this.headerFields[7],
        type: 'string',
        valuePrepareFunction(value, row) {
          return value;
        },
      },
    },
  };

  public routes = [
    {
      name: 'Pah',
      route: '../list',
    },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private FlatS: FlatService,
    private PavilionS: PavilionService,
    private BedS: BedService,
    private authService: AuthService,
    private dialogService: NbDialogService,
    public roleBS: RoleBusinessService,
    private toastService: NbToastrService,
  ) {
  }
  public form: FormGroup;
  public ResponseGlossForm: FormGroup;
  public RadicationGlossForm: FormGroup;
  public status;
  public objetion_code_response: any[] = null;
  public objetion_response: any[] = null;
  public saved: any = null;



  async ngOnInit() {
    this.user = this.authService.GetUser();
    this.user_id = this.user.id;
    this.campus_id = +localStorage.getItem('campus');
    var curr = this.authService.GetRole();
    this.currentRole = this.user.roles.find(x => {
      return x.id == curr;
    });

    this.FlatS.GetFlatByCampus(this.campus_id).then(x => {
      this.flat = x;
      this.show = true;
    });

    var a = new Date().getFullYear() + '-' + (+((new Date().getMonth() + 1)) >= 10 ? (new Date().getMonth() + 1) : ('0'+(new Date().getMonth() + 1))) + '-' + (+(new Date().getDate()) >= 10 ? new Date().getDate() : ('0'+new Date().getDate()));

    this.form = this.formBuilder.group({
      flat: ['', []],
      pavilion: ['', []],
      bed: ['', []],
      start_date: [a, []],
      finish_date: [a, []],
    });

    this.form.get('start_date').valueChanges.subscribe(val => {
      this.changeEntity()
    });
    this.form.get('finish_date').valueChanges.subscribe(val => {
      this.changeEntity()
    });
  }

  ConfirmAction(dialog: TemplateRef<any>) {
    this.dialog = this.dialogService.open(dialog);
  }

  RefreshData() {
    this.table.refresh();
  }

  changeSemaphore($event: any) {
    this.table.changeEntity(this.entity + '&semaphore=' + $event, 'patients');
  }

  changeFlat(flat_id) {
    this.flat_id = flat_id;
    this.pavilion_id = 0;
    this.bed_id = 0;
    this.form.patchValue({
      pavilion: '',
      bed: '',
    });
    this.changeEntity();
    if (flat_id != 0) {
      return this.PavilionS.GetPavilionByFlat(flat_id).then(x => {
        this.pavilion = x;
      });
    }
  }

  changePavilion(pavilion_id) {
    this.pavilion_id = pavilion_id;
    this.bed_id = 0;
    this.form.patchValue({
      bed: '',
    });
    this.changeEntity();
    if (pavilion_id != 0) {
      return this.BedS.GetCollection({
        bed_or_office: 1,
        pavilion_id: pavilion_id,
      }).then(x => {
        if (x.length > 0) {
          this.bed = x;
        } else {
          this.toastService.warning('', 'No se encontraron camas disponibles para la localización y el procedimiento seleccionado')
        }
      });
    }
  }

  changeBed(bed_id) {
    this.bed_id = bed_id;
    this.changeEntity();
  }

  changeEntity() {
    this.table.changeEntity('assigned_management_plan/getByPah/' + this.campus_id + '/' + this.flat_id + '/' + this.pavilion_id + '/' + this.bed_id + '?start_date=' + this.form.controls.start_date.value + '&finish_date=' + this.form.controls.finish_date.value + '', 'assigned_management_plan')
  }
}
