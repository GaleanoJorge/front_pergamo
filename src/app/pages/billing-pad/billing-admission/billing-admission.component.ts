import { Component, OnInit, ViewChild } from '@angular/core';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { ActionsBillingComponent } from './actions-billing.component';
import { DateFormatPipe } from '../../../pipe/date-format.pipe';
import { ActivatedRoute } from '@angular/router';
import { FormShowBillingPadComponent } from './form-show-billing-pad/form-show-billing-pad.component';
import { CurrencyPipe } from '@angular/common';
import { AdmissionsService } from '../../../business-controller/admissions.service';

@Component({
  selector: 'ngx-billing-admission',
  templateUrl: './billing-admission.component.html',
  styleUrls: ['./billing-admission.component.scss']
})
export class BillingAdmissionComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'FACTURAS';
  public subtitle: string = 'GESTIÓN';
  public headerFields: any[] = ['MES', 'VALOR', 'ESTADO'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}`;
  public icon: string = 'nb-star';
  public data = [];
  public admission_id;

  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  public settings = {
    pager: {
      display: true,
      perPage: 10,
    },
    columns: {
      actions: {
        title: 'ACCIONES',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          return {
            'data': row,
            'show': this.ShowBillingAdmission.bind(this),
            // 'delete': this.DeleteConfirmBillingAdmission.bind(this),
          };
        },
        renderComponent: ActionsBillingComponent,
      },
      month: {
        title: this.headerFields[0],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return this.datePipe.getMonthPretty(row.created_at);
        }
      },
      value: {
        title: this.headerFields[1],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return this.currency.transform(row.total_value);
        }
      },
      status: {
        title: this.headerFields[2],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return row.billing_pad_status.name;
        }
      },
    },
  };

  public routes = [
    {
      name: 'Facturas',
      route: '../../setting/billing-admission',
    },
  ];

  constructor(
    private route: ActivatedRoute,
    public datePipe: DateFormatPipe,
    private currency: CurrencyPipe,
    private toastrService: NbToastrService,
    private dialogFormService: NbDialogService,
    private deleteConfirmService: NbDialogService,
    private AdmissionsS: AdmissionsService,
  ) {
  }

  ngOnInit(): void {
    this.admission_id = this.route.snapshot.params.id;
    this.AdmissionsS.GetCollection({admissions_id: this.admission_id}).then(x => {
      this.title = 'FACTURAS DE: ' + x[0]['nombre_completo'];
    }).catch(x => {});
  }

  RefreshData() {

    this.table.refresh();
  }

  // NewBillingAdmission() {
  //   this.dialogFormService.open(FormBillingAdmissionComponent, {
  //     context: {
  //       title: 'Crear nuevo día de dietas',
  //       saved: this.RefreshData.bind(this),
  //     },
  //   });
  // }

  ShowBillingAdmission(data) {
    this.dialogFormService.open(FormShowBillingPadComponent, {
      context: {
        title: 'Servicios facturados',
        data,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  DeleteConfirmBillingAdmission(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteBillingAdmission.bind(this),
      },
    });
  }

  DeleteBillingAdmission(data) {
    // return this.BillingAdmissionS.Delete(data.id).then(x => {
    //   this.table.refresh();
    //   return Promise.resolve(x.message);
    // }).catch(x => {
    //   throw x;
    // });
  }

}
