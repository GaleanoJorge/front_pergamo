import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ActionsPaymentComponent} from './actions-payment.component';
import {NbDialogService} from '@nebular/theme';
import {FormPaymentsComponent} from './form-payments/form-payments.component';
import {BaseTableComponent} from '../../components/base-table/base-table.component';
import {DateFormatPipe} from '../../../pipe/date-format.pipe';
import {ConfirmDialogComponent} from '../../components/confirm-dialog/confirm-dialog.component';
import {BudgetPaymentsBussinesService} from '../../../business-controller/budget-payments-bussines.service';
import {CurrencyPipe} from '@angular/common';

@Component({
  selector: 'ngx-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss'],
})
export class PaymentsComponent implements OnInit {
  @Input() contract_id: number;
  public title = 'Pagos';
  public messageError = null;

  public settings = {
    columns: {
      actions: {
        title: '',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
            'edit': this.EditPayment.bind(this),
            'delete': this.DeleteConfirm.bind(this),
          };
        },
        renderComponent: ActionsPaymentComponent,
      },
      code: {
        title: 'No. oficio',
      },
      date_code: {
        title: 'Fecha de oficio',
        valuePrepareFunction: ((value) => {
          return this.datepipe.transform3(value);
        }).bind(this),
      },
      code_technical_concept: {
        title: 'No. Concepto técnico',
      },
      date_technical_concept: {
        title: 'Fecha expedición concepto técnico',
        valuePrepareFunction: ((value) => {
          return this.datepipe.transform3(value);
        }).bind(this),
      },
      value_payment: {
        title: 'Valor',
        valuePrepareFunction: (value) => {
          return this.currency.transform(value);
        },
      },
    },
  };

  @ViewChild(BaseTableComponent) table: BaseTableComponent;

  constructor(
    private dialogFormService: NbDialogService,
    private datepipe: DateFormatPipe,
    private paymentBS: BudgetPaymentsBussinesService,
    private currency: CurrencyPipe,
  ) {
  }

  ngOnInit(): void {
  }

  refreshData() {
    this.table.refresh();
  }

  NewPayment() {
    this.dialogFormService.open(FormPaymentsComponent, {
      context: {
        title: 'Crear pago',
        contract_id: this.contract_id,
        refreshData: this.refreshData.bind(this),
      },
    });
  }

  EditPayment(data) {
    this.dialogFormService.open(FormPaymentsComponent, {
      context: {
        title: 'Editar pago',
        contract_id: this.contract_id,
        refreshData: this.refreshData.bind(this),
        data,
      },
    });
  }

  DeleteConfirm(data) {
    this.dialogFormService.open(ConfirmDialogComponent, {
      context: {
        name: data.code,
        data: data,
        delete: this.DeletePayment.bind(this),
      },
    });
  }

  DeletePayment(data) {
    return this.paymentBS.Delete(data.id).then(x => {
      this.refreshData();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }
}
