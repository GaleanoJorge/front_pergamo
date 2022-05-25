import { Component, OnInit, ViewChild, TemplateRef, Input } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { FormGroup } from '@angular/forms';
import { ActionsStatusComponent } from './actions-status.component';

@Component({
  selector: 'ngx-billing-pad-list',
  templateUrl: './billing-pad-list.component.html',
  styleUrls: ['./billing-pad-list.component.scss'],
})
export class BillingPadListComponent implements OnInit {


  public isSubmitted = false;
  public loading: boolean = false;
  public category_id: number = null;
  public messageError: string = null;
  public title: string = 'ADMISIONES';
  public subtitle: string = 'Gestión';
  public headerFields: any[] = ['ACCIONES', 'NOMBRE', 'DOCUMENTO', 'EPS'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}`;
  public icon: string = 'nb-star';
  public data = [];
  public arrayBuffer: any;
  public user;
  public dialog;
  public currentRole;



  @ViewChild(BaseTableComponent) table: BaseTableComponent;


  public settings = {
    pager: {
      display: true,
      perPage: 10,
    },
    columns: {
      actions: {
        title: this.headerFields[0],
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          return {
            'data': row,
          };
        },
        renderComponent: ActionsStatusComponent,
      },
      nombre_completo: {
        title: this.headerFields[1],
        type: 'string',
      },
      patients: {
        title: this.headerFields[2],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return row.patients.identification;
        },
      },
      contract: {
        title: this.headerFields[3],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return row.contract.company.name;
        },
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
  }


  RefreshData() {
    this.table.refresh();
  }

  ConfirmAction(data, Managemen?) {
    // var closeOnBackdropClick = false;
    // this.dialogFormService.open(FormObservationComponent, {
    //   closeOnBackdropClick,
    //   context: {
    //     data: data,
    //     Managemen: Managemen,
    //     saved: this.RefreshData.bind(this),
    //   },
    // });
  }

  SaveStatus(event?, data?) {


  }



  GetResponseParam() {
  }




}
