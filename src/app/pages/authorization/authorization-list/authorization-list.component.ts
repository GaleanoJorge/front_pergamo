import { Component, OnInit, ViewChild, TemplateRef, Input } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { HistoricAuthorizationListComponent } from './historic-authorization/historic-authorization.component';
import { FormGroup } from '@angular/forms';
import { rowDataBound } from '@syncfusion/ej2/grids';
import { ActionsAuthNumberComponent } from './actions-auth-number.component';
import { ActionsStatusComponent } from './actions-status.component';
import { AuthStatusService } from '../../../business-controller/auth-status.service';
import { AuthorizationService } from '../../../business-controller/authorization.service';

@Component({
  selector: 'ngx-authorization-list',
  templateUrl: './authorization-list.component.html',
  styleUrls: ['./authorization-list.component.scss'],
})
export class AuthorizationListComponent implements OnInit {


  public isSubmitted = false;
  public loading: boolean = false;
  public category_id: number = null;
  public messageError: string = null;
  public title: string = 'AUTORIZACIONES: PENDIENTES';
  public subtitle: string = 'Gestión';
  public headerFields: any[] = ['Tipo de documento', 'Número de documento', 'Nombre completo', 'Email', 'Ciudad', 'Barrio', 'Dirección', 'Consecutivo de ingreso', 'ambito', 'Programa', 'Sede', 'Estado', 'Procedimiento', 'Número de autorización'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}, ${this.headerFields[2]}, ${this.headerFields[3]}, ${this.headerFields[4]}`;
  public icon: string = 'nb-star';
  public data = [];
  public auth_status;
  public auth_statusM: any [] = [];
  public arrayBuffer: any;
  public user;
  public dialog;
  public currentRole;
  public showdiv: boolean = null;
  public show;



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
      select: {
        title: this.headerFields[11],
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          if (row.auth_status_id == 2) {
            this.show = true;
          } else {
            this.show = false;
          }
          return {
            'data': row,
            'show': true,
            'select': this.auth_status,
            'status': (event, row: any) => this.SaveStatus(event, row),
          };
        },
        renderComponent: ActionsStatusComponent,
      },
      procedure: {
        title: this.headerFields[12],
        type: 'string',
        valuePrepareFunction(value) {
          return value?.name;
        },
      },
      auth_number: {
        title: this.headerFields[13],
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          return {
            'data': row,
            'enabled': this.show ? false : true,
            'amount': '',
            'onchange': (input, row: any) => this.onAmountChange(input, row),
          }
        },
        renderComponent: ActionsAuthNumberComponent,
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
      if(x.length == 4){
        x.splice(2,1);
        this.auth_status = x;
        this.auth_statusM = x;
      }
    });

  }


  RefreshData() {
    this.table.refresh();
  }

  reloadForm(tab) {


    if (tab.tabTitle == 'A tramitar') {
      this.showdiv = false;
    } else {
      this.showdiv = true;
    }

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

  ChangeGlossStatus(status) {
    this.status = status;
    this.table.changeEntity(`authorization/byStatus/0/${this.status}`, 'authorization');
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

  SaveStatus(event?, data?) {
    if (event == data.auth_status_id) {

    } else {
      this.authorizationS.Update({
        id: data.id,
        auth_status_id: event
      }).then(x => {
        this.toastS.success('', x.message);
        this.RefreshData();
      }).catch()
    }
  }

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
