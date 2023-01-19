import { Component, OnInit, ViewChild, TemplateRef, Output, Input, EventEmitter } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { FormGroup } from '@angular/forms';
import { Actions2Component } from '../pad-list/actions.component';
import { FormPadComplementaryComponent } from '../pad-list/form-pad/form-pad-complementary.component';

@Component({
  selector: 'ngx-pad-list',
  templateUrl: './management-plan.component.html',
  styleUrls: ['./management-plan.component.scss'],
})

export class ManagementPlanComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;

  @Output() messageEvent = new EventEmitter<any>();
  @Input() parentData: any = [];
  

  public isSubmitted = false;
  public entity: string = "admission/byPAC/2";
  public loading: boolean = false;
  public loading2: boolean = false;
  public category_id: number = null;
  public messageError: string = null;
  public title: string = 'HISTORICO PLAN DE ATENCIÓN COMPLEMENTARIA';
  public subtitle: string = 'Gestión';
  public headerFields: any[] = ['Tipo de documento', 'Número de documento', 'Nombre completo', 'Email', 'Providencia, Vereda o Municipio', 'Barrio', 'Dirección', 'Consecutivo de ingreso', 'Contrato', 'Fecha ingreso', 'Fecha egreso'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}, ${this.headerFields[2]}, ${this.headerFields[3]}, ${this.headerFields[4]}`;
  public icon: string = 'nb-star';
  public data = [];
  public arrayBuffer: any;
  public file: File;
  public user;
  public dialog;
  public currentRole;

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
      consecutive: {
        title: this.headerFields[7],
        width: '5%',
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
      residence_address: {
        title: this.headerFields[6],
        type: 'string',
      },
      contract: {
        title: this.headerFields[8],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.name;
        },
      },
      entry_date: {
        title: this.headerFields[9],
        type: 'date',
      },
      discharge_date: {
        title: this.headerFields[10],
        type: 'date',
        valuePrepareFunction: (value, row) => {
          return value;
        },
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
  public status;
  public objetion_code_response: any[] = null;
  public objetion_response: any[] = null;
  public saved: any = null;




  async ngOnInit() {

  }


  RefreshData() {
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
