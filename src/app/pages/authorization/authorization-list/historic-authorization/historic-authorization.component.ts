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
  public headerFields: any[] = ['Tipo de documento', 'Número de documento', 'Nombre completo', 'Email', 'Providencia, Vereda o Municipio', 'Barrio', 'Dirección', 'Consecutivo de ingreso', 'ambito', 'Programa', 'Sede', 'Estado', 'Procedimiento', 'Número de autorización', 'Observación', 'Cantidad autorizada'];
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

  public selectedOptions: any[] = [];
  public result: any = null;
  public diagnosis: any[] = [];
  public profesionals: any[] = [];


  @ViewChild(BaseTableComponent) table: BaseTableComponent;


  public settings = {
    pager: {
      display: true,
      perPage: 30,
    },
    columns: {
      // actions: {
      //   title: 'Acciones',
      //   type: 'custom',
      //   valuePrepareFunction: (value, row) => {
      //     // DATA FROM HERE GOES TO renderComponent
      //     return {
      //       'data': row,
      //       'edit': this.EditPadComplementary.bind(this),
      //       'delete': this.DeleteConfirmPadComplementary.bind(this),
      //       'confirm': this.ConfirmAction.bind(this),
      //       'refresh': this.RefreshData.bind(this),
      //       'currentRole': this.currentRole,
      //     };
      //   },
      //   renderComponent: Actions2Component,
      // },
      // select: {
      //   title: this.headerFields[11],
      //   type: 'string',
      //   valuePrepareFunction: (value, row) => {
      //     if (row.auth_status_id == 2) {
      //       this.show = true;
      //     } else {
      //       this.show = false;
      //     }
      //     return {
      //       'data': row,
      //       'show': true,
      //       'select': this.auth_status,
      //       'status': (event, row: any) => this.SaveStatus(event, row),
      //     };
      //   },
      //   renderComponent: ActionsStatusComponent,
      // },
      services_briefcase: {
        title: this.headerFields[12],
        type: 'string',
        valuePrepareFunction(value) {
          return value?.name;
        },
      },
      auth_number: {
        title: this.headerFields[13],
        type: 'string',
      },
      authorized_amount: {
        title: this.headerFields[15],
        type: 'string',
        valuePrepareFunction(value) {
          if (value) {
            return value
          } else {
            return '--';
          }
        },
      },
      identification_type: {
        title: this.headerFields[0],
        type: 'string',
        valuePrepareFunction(value) {
          return value?.name;
        },
      },
      identification: {
        title: this.headerFields[1],
        type: 'string',
      },
      nombre_completo: {
        title: this.headerFields[2],
        type: 'string',
      },
      email: {
        title: this.headerFields[3],
        type: 'string',
      },
      residence_municipality: {
        title: this.headerFields[4],
        type: 'string',
        valuePrepareFunction(value) {
          return value?.name;
        },
      },
      residence: {
        title: this.headerFields[5],
        type: 'string',
        valuePrepareFunction(value) {
          return value?.name;
        },
      },
      residence_address: {
        title: this.headerFields[6],
        type: 'string',
      },
      observation: {
        title: this.headerFields[14],
        type: 'string',
        valuePrepareFunction(value) {
          if (value) {
            return value;
          } else {
            return 'NO APLICA';
          }
        },
      },
      auth_status: {
        title: this.headerFields[11],
        type: 'string',
        valuePrepareFunction(value) {
          return value?.name
        }
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
    private dialogFormService: NbDialogService,
    private deleteConfirmService: NbDialogService,
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
    this.table.refresh();
  }

  // reloadForm(tab) {


  //   if (tab.tabTitle == 'A tramitar') {
  //     this.showdiv = false;
  //   } else {
  //     this.showdiv = true;
  //   }

  // }

  // onAmountChange(input, row) {

  //   if (input.target.value != '') {
  //     this.authorizationS.Update({
  //       id: row.id,
  //       auth_number: input.target.value,
  //     }).then(x => {
  //       this.toastS.success('', x.message);
  //       this.RefreshData();
  //     }).catch(x => {

  //     });
  //   }

  // }

  ChangeGlossStatus(status) {
    this.status = status;
    this.table.changeEntity(`authorization/Historic/${this.status}`, 'authorization');
    // this.RefreshData();

  }

  // ConfirmAction(data) {

  //   this.dialogFormService.open(HistoricAuthorizationListComponent, {
  //     context: {
  //       title: 'FORMATO DE RECEPCION, SEGUIMIENTO Y CONTROL PLAN COMPLEMENTARIO',
  //       admissions_id: data.admissions[data.admissions.length - 1].id,
  //       saved: this.RefreshData.bind(this),
  //     },
  //   });
  // }

  // SaveStatus(event?, data?) {
  //   if (event == data.auth_status_id) {

  //   } else {
  //     this.authorizationS.Update({
  //       id: data.id,
  //       auth_status_id: event
  //     }).then(x => {
  //       this.toastS.success('', x.message);
  //       this.RefreshData();
  //     }).catch()
  //   }
  // }

  // async EditPadComplementary(data) {

  //   this.dialogFormService.open(HistoricAuthorizationListComponent, {
  //     context: {
  //       title: 'EDITAR FORMATO DE RECEPCION, SEGUIMIENTO Y CONTROL PLAN COMPLEMENTARIO',
  //       data,
  //       saved: this.RefreshData.bind(this),
  //     },
  //   });
  // }


  // DeleteConfirmPadComplementary(data) {
  //   this.deleteConfirmService.open(ConfirmDialogComponent, {
  //     context: {
  //       name: data.name,
  //       data: data,
  //       delete: this.DeleteGloss.bind(this),
  //     },
  //   });
  // }

  // DeleteGloss(data) {
  // }

  GetResponseParam() {
  }

}
