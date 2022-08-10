import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NbDialogRef, NbDialogService, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlossService } from '../../../../business-controller/gloss.service';
import { UserBusinessService } from '../../../../business-controller/user-business.service';
import { PacMonitoringService } from '../../../../business-controller/pac-monitoring.service';
import { DiagnosisService } from '../../../../business-controller/diagnosis.service';
import { ObjetionResponseService } from '../../../../business-controller/objetion-response.service';
import { BaseTableComponent } from '../../../components/base-table/base-table.component';
import { AuthStatusService } from '../../../../business-controller/auth-status.service';
import { AuthorizationService } from '../../../../business-controller/authorization.service';
import { ActionsDocumentComponent } from '../actions2.component';
import { ActionsAuthNumberComponent } from '../actions-auth-number.component';
import { AuthService } from '../../../../services/auth.service';


@Component({
  selector: 'ngx-historic-authorization',
  templateUrl: './historic-authorization.component.html',
  styleUrls: ['./historic-authorization.component.scss'],
})
export class HistoricAuthorizationListComponent implements OnInit {

  public isSubmitted = false;
  public loading: boolean = false;
  public category_id: number = null;
  public messageError: string = null;
  public title: string = 'AUTORIZACIONES: PENDIENTES';
  public subtitle: string = 'Gestión';
  public headerFields: any[] = [
                              'Procedimiento',
                              'Número de autorización', 
                              'Tipo de documento', 
                              'Número de documento', 
                              'Nombre completo', 
                              'Email', 
                              'Providencia, Vereda o Municipio', 
                              'Barrio', 
                              'Dirección', 
                              'Estado', 
                              'Observación', 
                              'Fecha de creación',
                              'Evidencia',
                            ];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}, ${this.headerFields[2]}, ${this.headerFields[3]}, ${this.headerFields[4]}`;
  public icon: string = 'nb-star';
  public data = [];
  public auth_status;
  public auth_statusM;
  public arrayBuffer: any;
  public user_id;
  public user;
  public dialog;
  public currentRole;
  public showdiv: boolean = null;
  public show;
  public done = true;

  public selectedOptions: any[] = [];
  public result: any = null;
  public diagnosis: any[] = [];
  public profesionals: any[] = [];


  @ViewChild(BaseTableComponent) table: BaseTableComponent;


  private readonly newProperty = 'custom';

  public settings = {
    pager: {
      display: true,
      perPage: 30,
    },
    columns: {
      id: {
        title: 'ID',
        type: 'string',
      },
      services_briefcase: {
        title: this.headerFields[0],
        type: 'string',
        valuePrepareFunction(value) {
          return value?.manual_price.name;
        },
      },
      auth_number: {
        title: this.headerFields[1],
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          if (this.done) {

            this.currentRole = this.authS.GetRole();
            this.done = false
          }
          return {
            'data': row,
            'enabled': this.currentRole == 1 ? false : true,
            'amount': row.auth_number,
            'onchange': (input, row: any) => this.onAmountChange(input, row),
          }
        },
        renderComponent: ActionsAuthNumberComponent,
      },
      'identification_type': {
        title: this.headerFields[2],
        type: 'string',
        valuePrepareFunction(value, row) {
          return row.admissions.patients.identification_type.name;
        },
      },
      'identification': {
        title: this.headerFields[3],
        type: 'string',
        valuePrepareFunction(value, row) {
          return row.admissions.patients.identification;
        },
      },
      nombre_completo: {
        title: this.headerFields[4],
        type: 'string',
      },
      'email': {
        title: this.headerFields[5],
        type: 'string',
        valuePrepareFunction(value, row) {
          return row.admissions.patients.email;
        },
      },
      'residence_municipality': {
        title: this.headerFields[6],
        type: 'string',
        valuePrepareFunction(value, row) {
          return row.admissions.patients.residence_municipality.name;
        },
      },
      'residence': {
        title: this.headerFields[7],
        type: 'string',
        valuePrepareFunction(value, row) {
          return row.admissions.patients.residence.name;
        },
      },
      residence_address: {
        title: this.headerFields[8],
        type: 'string',
        valuePrepareFunction(value, row) {
          return row.admissions.patients.residence_address;
        },
      },
      auth_status: {
        title: this.headerFields[9],
        type: 'string',
        valuePrepareFunction(value) {
          return value?.name
        }
      },
      observation: {
        title: this.headerFields[10],
        type: 'string',
        valuePrepareFunction(value) {
          if (value) {
            return value;
          } else {
            return '--';
          }
        },
      },
      date: {
        title: this.headerFields[11],
        type: 'string',
      },
      'file_auth': {
        title: this.headerFields[12],
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
          };
        },
        renderComponent: ActionsDocumentComponent,
      },
    },
  };

  public routes = [
    {
      name: 'Autorizaciones',
      route: './',
    },
  ];

  constructor(
    private authS: AuthService,
    private authStatusS: AuthStatusService,
    private authorizationS: AuthorizationService,
    private toastS: NbToastrService,
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
    await this.authStatusS.GetCollection().then(x => {
      x.splice(0, 2);
      this.auth_status = x;
    });
  }

  RefreshData() {
    this.done = true;
    this.table.refresh();
  }

  ChangeGlossStatus(status) {
    this.status = status;
    this.table.changeEntity(`authorization/Historic/${this.status}`, 'authorization');
  }

  onAmountChange(input, row) {

    if (input.target.value != '') {
      this.authorizationS.Update({
        id: row.id,
        auth_number: input.target.value,
      }).then(x => {
        this.toastS.success('', x.message);
        this.RefreshData();
      }).catch(x => {

      });
    }
  }
}
