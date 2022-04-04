import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { Actions2Component } from './actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { FormPadComplementaryComponent } from './form-pad/form-pad-complementary.component';
import { FormGroup} from '@angular/forms';

@Component({
  selector: 'ngx-pad-complementary-list',
  templateUrl: './pad-complementary-list.component.html',
  styleUrls: ['./pad-complementary-list.component.scss'],
})
export class PadComplementaryListComponent implements OnInit {
  public isSubmitted = false;
  public loading: boolean = false;
  public category_id: number = null;
  public messageError: string = null;
  public title: string = 'DILIGENCIAMIENTO PLAN DE ATENCIÓN COMPLEMENTARIA';
  public subtitle: string = 'Gestión';
  public headerFields: any[] = ['Tipo de documento', 'Número de documento', 'Nombre completo', 'Email', 'Ciudad', 'Barrio', 'Dirección', 'Consecutivo de ingreso', 'ambito', 'Programa', 'Sede'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}, ${this.headerFields[2]}, ${this.headerFields[3]}, ${this.headerFields[4]}`;
  public icon: string = 'nb-star';
  public data = [];
  public arrayBuffer: any;
  public user_id;
  public user;
  public dialog;
  public currentRole;
  public showdiv: boolean = null;

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
      actions: {
        title: 'Acciones',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
            'edit': this.EditPadComplementary.bind(this),
            'delete': this.DeleteConfirmPadComplementary.bind(this),
            'confirm': this.ConfirmAction.bind(this),
            'refresh': this.RefreshData.bind(this),
            'currentRole': this.currentRole,
          };
        },
        renderComponent: Actions2Component,
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
      name: 'Plan complemantario',
      route: './',
    },
  ];

  constructor(
    private dialogFormService: NbDialogService,
    private deleteConfirmService: NbDialogService,
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

  }


  RefreshData() {
    this.table.refresh();
  }

  reloadForm(tab) {


    if (tab.tabTitle == 'Para diligenciar') {
      this.showdiv = false;
    } else {
      this.showdiv = true;
    }
    this.table.refresh();
  }
  ConfirmAction(data) {

    this.dialogFormService.open(FormPadComplementaryComponent, {
      context: {
        title: 'FORMATO DE RECEPCION, SEGUIMIENTO Y CONTROL PLAN COMPLEMENTARIO',
        admissions_id: data.admissions[data.admissions.length - 1].id,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  async EditPadComplementary(data) {

    this.dialogFormService.open(FormPadComplementaryComponent, {
      context: {
        title: 'EDITAR FORMATO DE RECEPCION, SEGUIMIENTO Y CONTROL PLAN COMPLEMENTARIO',
        data,
        saved: this.RefreshData.bind(this),
      },
    });
  }


  DeleteConfirmPadComplementary(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteGloss.bind(this),
      },
    });
  }

  DeleteGloss(data) {
  }

  GetResponseParam() {
  }




}
