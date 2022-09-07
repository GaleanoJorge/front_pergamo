import { Component, OnInit, ViewChild, TemplateRef, Input } from '@angular/core';
import { SectionalCouncilService } from '../../../business-controller/sectional-council.service';
import { StatusFieldComponent } from '../../components/status-field/status-field.component.js';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { ActionsCIComponent } from './actions.component';
import { ActivatedRoute } from '@angular/router';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { FormConsentsInformedComponent } from './form-consents-informed/form-consents-informed.component';
import * as XLSX from 'ts-xlsx';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { CurrencyPipe } from '@angular/common';
import { date } from '@rxweb/reactive-form-validators';
import { ConsentsInformedService } from '../../../business-controller/consents-informed.service';
import { UserBusinessService } from '../../../business-controller/user-business.service';
import { TypeChPhysicalExam } from '../../../models/ch-type-ch-physical-exam';
import { PatientService } from '../../../business-controller/patient.service';
import { type } from 'os';
import { DateFormatPipe } from '../../../pipe/date-format.pipe';
import { RoleBusinessService } from '../../../business-controller/role-business.service';
import { Location } from '@angular/common';

@Component({
  selector: 'ngx-management-pad',
  templateUrl: './consents-informed.component.html',
  styleUrls: ['./consents-informed.component.scss'],
})
export class ConsentsInformedComponent implements OnInit {


  @Input() admissions: any = null;
  @Input() medical: boolean = false;
  @Input() patient: boolean = false;
  @Input() title: string = null;
  public isSubmitted = false;
  public entity: string;
  public loading: boolean = false;
  public loading2: boolean = false;
  public category_id: number = null;
  public messageError: string = null;
  public subtitle: string = '';
  public headerFields: any[] = ['Tipo de Atención', 'Frecuencia', 'Cantidad', 'Personal asistencial', 'Tipo de Consentimiento Informado', 'Ejecutado','Incumplidas'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}, ${this.headerFields[2]}, ${this.headerFields[3]}, ${this.headerFields[4]}`;
  public icon: string = 'nb-star';
  public data = [];
  public arrayBuffer: any;
  public file: File;
  public admissions_id;
  public user_id;
  public user;
  public dialog;
  public currentRole;
  public selectedOptions: any[] = [];
  public result: any = null;
  public settings;
  public currentRoleId;
  public roles;
  public user_logged;
  public admission_id;



  @ViewChild(BaseTableComponent) table: BaseTableComponent;

  public settings1 = {
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
            'user': this.user,
            'edit': this.EditConsentsInformed.bind(this),
            'assignedUser': this.AssignedUser.bind(this),
            'delete': this.DeleteConfirmConsentsInformed.bind(this),
            'refresh': this.RefreshData.bind(this),
            'admissions_id': this.admission_id,
          };
        },
        renderComponent: ActionsCIComponent,
      },
      type_consents: {
        title: this.headerFields[4],
        type: 'string',
        valuePrepareFunction(value) {
          return value?.name;
        },
      },
      assigned_user: {
        title: this.headerFields[0],
        type: 'string',
        valuePrepareFunction(value) {
          return value?.firstname+ ' ' +value.lastname ;
        },
      },
    },
  };

  public settings2 = {
    pager: {
      display: true,
      perPage: 30,
    },
    columns: {
      type_of_attention: {
        title: this.headerFields[0],
        type: 'string',
        valuePrepareFunction(value) {
          return value?.name;
        },
      },
      frequency: {
        title: this.headerFields[1],
        type: 'string',
        valuePrepareFunction(value) {
          return value?.name;
        },
      },
      quantity: {
        title: this.headerFields[2],
        type: 'string',
      },
    },
  };



  constructor(

    private formBuilder: FormBuilder,
    private dialogFormService: NbDialogService,
    private deleteConfirmService: NbDialogService,
    private toastService: NbToastrService,
    public datePipe: DateFormatPipe,

    private currency: CurrencyPipe,
    private userBS: UserBusinessService,
    private patienBS: PatientService,

    private authService: AuthService,
    private dialogService: NbDialogService,
    private ConsentsInformedS: ConsentsInformedService,
    private toastS: NbToastrService,
    private route: ActivatedRoute,
    public roleBS: RoleBusinessService,
    private location: Location,


  ) {
  }
  public form: FormGroup;
  public ResponseConsentsInformedForm: FormGroup;
  public RadicationConsentsInformedForm: FormGroup;
  public status;
  public objetion_code_response: any[] = null;
  public objetion_response: any[] = null;
  public saved: any = null;
  public routes;
  public assigned_user: any[];






  async ngOnInit() {
    this.currentRoleId = localStorage.getItem('role_id');
    this.user_id = this.route.snapshot.params.user;
    this.admission_id = this.route.snapshot.params.id;
    await this.roleBS.GetCollection({ id: this.currentRoleId  }).then(x => {
      this.roles = x;
    }).catch(x => { });
    this.user_logged= this.authService.GetUser().id;
      this.title = "Consentimientos Informados";
      this.entity="consents_informed_by_admissions/"+this.admission_id;
   
    if (this.admissions) {
      this.admissions_id = this.admissions;
      this.settings = this.settings2;
      this.user_id = this.patient;
    } else {
      this.admissions_id = this.route.snapshot.params.id;
      this.user_id = this.route.snapshot.params.user;
      this.settings = this.settings1;


      this.routes = [
        {
          name: 'Pad',
          route: '../pad/list',
        },
        {
          name: 'Plan de manejo',
        },
      ];
    }
    await this.patienBS.GetUserById(this.user_id).then(x => {
      this.user = x;
    });
  }
  back() {
    this.location.back();
  }



  ConfirmAction(dialog: TemplateRef<any>) {
    this.dialog = this.dialogService.open(dialog);
  }



  RefreshData() {
    this.table.refresh();
  }

  NewConsentsInformed() {
    this.dialogFormService.open(FormConsentsInformedComponent, {
      context: {
        title: 'Crear plan de manejo',
        assigned: true,
        user: this.user,
        medical: this.medical,
        admissions_id: this.admissions_id,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  AssignedUser(data) {
    this.dialogFormService.open(FormConsentsInformedComponent, {
      context: {
        title: 'Asignar personal asistencial',
        data,
        user: this.user,
        medical: this.medical,
        assigned: false,
        admissions_id: this.admissions_id,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditConsentsInformed(data) {
    this.dialogFormService.open(FormConsentsInformedComponent, {
      context: {
        title: 'Editar plan de manejo',
        data,
        saved: this.RefreshData.bind(this),
      },
    });
  }


  DeleteConfirmConsentsInformed(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteConsentsInformed.bind(this),
      },
    });
  }

  DeleteConsentsInformed(data) {
    return this.ConsentsInformedS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}
