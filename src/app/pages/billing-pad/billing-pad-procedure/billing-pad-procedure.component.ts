import { Component, OnInit, ViewChild, TemplateRef, Input } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { FormGroup } from '@angular/forms';
import { ActionsPadProcedureComponent } from './actions-pad-procedure.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { ActivatedRoute } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { SelectServiceBillingComponent } from './select-service-billing.component';
import { FormBillingPadComponent } from './form-billing-pad/form-billing-pad.component';
import { BillingPadService } from '../../../business-controller/billing-pad.service';
import { AuthService } from '../../../services/auth.service';
import { DateFormatPipe } from '../../../pipe/date-format.pipe';

@Component({
  selector: 'ngx-billing-pad-procedure',
  templateUrl: './billing-pad-procedure.component.html',
  styleUrls: ['./billing-pad-procedure.component.scss'],
})
export class BillingPadProcedureComponent implements OnInit {
  @Input() adm: any = null;
  @Input() bill: any = null;


  public isSubmitted = false;
  public loading: boolean = false;
  public show_info: boolean = false;
  public category_id: number = null;
  public messageError: string = null;
  public title: string = null;
  public subtitle: string = 'Gestión';
  public headerFields: any[] = ['ACCIONES', 'PROCEDIMIENTO', 'VALOR', 'EPS', 'FECHA DE EJECUCIÓN'];
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
  public billing: any = null;
  public total_pre_billing: number = null;
  public admission_id;
  public billing_id;
  public user_id;
  public settings;
  public entity: string = '';



  @ViewChild(BaseTableComponent) table: BaseTableComponent;


  public settings1 = {
    pager: {
      display: true,
      perPage: 10,
    },
    columns: {
      select: {
        title: 'SELECCIÓN',
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
            return row.services_briefcase.manual_price.procedure.name;
          } else if (row.manual_price) {
            return row.manual_price.name;
          }
        },
      },
      value: {
        title: this.headerFields[2],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          if (row.manual_price) {
            return this.currency.transform(row.manual_price.value);
          } else {
            return this.currency.transform(row.services_briefcase.value);
          }
        },
      },
      assigned_management_plan_id: {
        title: this.headerFields[4],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          if (row.assigned_management_plan != null) {
            return this.datePipe.transform3(row.assigned_management_plan.execution_date);
          } else {
            return '';
          }
        }
      },
    },
  };

  public settings2 = {
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
            return row.services_briefcase.manual_price.procedure.name;
          } else if (row.manual_price) {
            return row.manual_price.name;
          }
        },
      },
      value: {
        title: this.headerFields[2],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          if (row.manual_price) {
            this.total_pre_billing += row.manual_price.value;
            return this.currency.transform(row.manual_price.value);
          } else {
            this.total_pre_billing += row.services_briefcase.value;
            return this.currency.transform(row.services_briefcase.value);
          }
        },
      },
    },
  };

  public routes = null;

  constructor(
    private route: ActivatedRoute,
    private currency: CurrencyPipe,
    private dialogFormService: NbDialogService,
    private deleteConfirmService: NbDialogService,
    private toastS: NbToastrService,
    private BillingPadS: BillingPadService,
    private authService: AuthService,
    public datePipe: DateFormatPipe,
  ) {
  }




  async ngOnInit() {
    if (this.adm == null) {
      this.routes = [
        {
          name: 'Autorizaciones',
          route: './',
        },
      ];
      this.title = 'PROCEDIMIENTOS';
      this.settings = this.settings1
      this.admission_id = this.route.snapshot.params.admission_id;
      this.billing_id = this.route.snapshot.params.billing_id;
      this.entity = 'billing_pad/getAuthorizedProcedures/' + this.admission_id + '?billing_id=' + this.billing_id;
    } else {
      this.title = 'PREFACTURA';
      this.settings = this.settings2
      this.admission_id = this.adm;
      this.billing_id = this.bill;
      this.entity = 'billing_pad/getPreBillingProcedures/' + this.admission_id + '?billing_id=' + this.billing_id;
    }
    this.user = this.authService.GetUser();
    this.user_id = this.user.id;

    this.BillingPadS.GetCollection({ id: this.billing_id }).then(x => {
      if (x != null) {
        this.billing = x[0];
        this.show_info = true;
      }
    });
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

  ShowPreBilling(data) {
    this.dialogFormService.open(BillingPadProcedureComponent, {
      context: {
        adm: this.admission_id,
        bill: this.billing_id,
        saved: this.RefreshData.bind(this),
      },
    });
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
        this.messageError = x;
      });
    } else {
      this.toastS.warning('Seleccione al menos un procedimiento', 'Aviso');
    }

  }



  GetResponseParam() {
  }




}
