import { Component, OnInit, ViewChild, TemplateRef, Input } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { FormGroup } from '@angular/forms';
import { ActionsPadProcedureComponent } from './actions-pad-procedure.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { ActivatedRoute } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { SelectServiceBillingComponent } from './select-service-billing.component';
import { FormBillingPadComponent } from './form-billing-pad/form-billing-pad.component';
import { BillingPadService } from '../../../business-controller/bulling-pad.service';

@Component({
  selector: 'ngx-billing-pad-procedure',
  templateUrl: './billing-pad-procedure.component.html',
  styleUrls: ['./billing-pad-procedure.component.scss'],
})
export class BillingPadProcedureComponent implements OnInit {


  public isSubmitted = false;
  public loading: boolean = false;
  public category_id: number = null;
  public messageError: string = null;
  public title: string = 'PROCEDIMIENTOS';
  public subtitle: string = 'Gestión';
  public headerFields: any[] = ['ACCIONES', 'PROCEDIMIENTO', 'VALOR', 'EPS'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}`;
  public icon: string = 'nb-star';
  public data = [];
  public arrayBuffer: any;
  public user;
  public dialog;
  public currentRole;
  public selectedOptions: any[] = [];

  public form: FormGroup;
  public ResponseGlossForm: FormGroup;
  public RadicationGlossForm: FormGroup;
  public status;
  public objetion_code_response: any[] = null;
  public objetion_response: any[] = null;
  public saved: any = null;
  public admission_id;
  public billing_id;
  public user_id;
  public entity: string = '';



  @ViewChild(BaseTableComponent) table: BaseTableComponent;


  public settings = {
    pager: {
      display: true,
      perPage: 10,
    },
    columns: {
      select: {
        title: this.headerFields[0],
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          return {
            'data': row,
            'selection': (event, row: any) => this.eventSelections(event, row),
          };
        },
        renderComponent: SelectServiceBillingComponent,
      },
      actions: {
        title: this.headerFields[0],
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          return {
            'data': row,
            'show': this.ShowPackageContent.bind(this),
          };
        },
        renderComponent: ActionsPadProcedureComponent,
      },
      name: {
        title: this.headerFields[1],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          if (row.assigned_management_plan) {
            return row.assigned_management_plan.management_plan.procedure.name;
          } else if (row.manual_price) {
            return row.manual_price.name;
          }
        },
      },
      value: {
        title: this.headerFields[2],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return this.currency.transform(row.services_briefcase.value);
        },
      },
      // patients: {
      //   title: this.headerFields[2],
      //   type: 'string',
      //   valuePrepareFunction: (value, row) => {
      //     return row.patients.identification;
      //   },
      // },
      // contract: {
      //   title: this.headerFields[3],
      //   type: 'string',
      //   valuePrepareFunction: (value, row) => {
      //     return row.contract.company.name;
      //   },
      // },
    },
  };

  public routes = [
    {
      name: 'Autorizaciones',
      route: './',
    },
  ];

  constructor(
    private route: ActivatedRoute,
    private currency: CurrencyPipe,
    private dialogFormService: NbDialogService,
    private deleteConfirmService: NbDialogService,
    private toastS: NbToastrService,
    private BillingPadS: BillingPadService,
  ) {
  }




  async ngOnInit() {
    this.admission_id = this.route.snapshot.params.admission_id;
    this.billing_id = this.route.snapshot.params.billing_id;
    this.entity = 'billing_pad/getAuthorizedProcedures/' + this.admission_id + '?billing_id=' + this.billing_id;
    this.user_id = localStorage.getItem('user_id');
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

  ShowPackageContent(data) {
    this.dialogFormService.open(FormBillingPadComponent, {
      context: {
        title: 'Contenido de Paquete',
        data,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  eventSelections(event, row) {
    if (event) {
      this.selectedOptions.push(row);
    } else {
      let i = this.selectedOptions.indexOf(row);
      i !== -1 && this.selectedOptions.splice(i, 1);
    }
  }

  SaveBilling() {
    if (this.selectedOptions.length > 0) {
      this.loading = true;
      this.isSubmitted = true;
      this.messageError = null;
      this.BillingPadS.Update({
        id: this.billing_id,
        authorizations: JSON.stringify(this.selectedOptions),
        user_id: this.user_id,
      }).then(x => {
        this.loading = false;
        this.toastS.success('', x.message);
        this.selectedOptions = [];
        this.RefreshData();
      }).catch(x => {
        this.loading = false;
        this.messageError = x.error.message;
      });
    } else {
      this.toastS.warning('Seleccione al menos un procedimiento', 'Aviso');
    }

  }



  GetResponseParam() {
  }




}
