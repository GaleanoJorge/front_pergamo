import { Component, OnInit, ViewChild } from '@angular/core';
import { PaymentTermsService } from '../../../business-controller/payment-terms.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormPaymentTermsComponent } from './form-payment-terms/form-payment-terms.component';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';


@Component({
  selector: 'ngx-payment-terms',
  templateUrl: './payment-terms.component.html',
  styleUrls: ['./payment-terms.component.scss']
})
export class PaymentTermsComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Terminos de Pago';
  public subtitle: string = 'Gestión';
  public headerFields: any[] = ['ID', 'Nombre'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}`;
  public icon: string = 'nb-star';
  public data = [];

  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  public settings = {
    pager: {
      display: true,
      perPage: 10,
    },
    columns: {
      actions: {
        title: 'Acciones',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
            'edit': this.EditPaymentTerms.bind(this),
            'delete': this.DeleteConfirmPaymentTerms.bind(this),
          };
        },
        renderComponent: ActionsComponent,
      },
      id: {
        title: this.headerFields[0],
        type: 'string',
      },
      name: {
        title: this.headerFields[1],
        type: 'string',
      },
    },
  };

  public routes = [
    {
      name: 'Terminos de pago',
      route: '../../setting/payment-terms',
    },
  ];

  constructor(
    private PaymentTermsS: PaymentTermsService,
    private toastrService: NbToastrService,
    private dialogFormService: NbDialogService,
    private deleteConfirmService: NbDialogService,
  ) {
  }

  ngOnInit(): void {
  }

  RefreshData() {

    this.table.refresh();
  }

  NewPaymentTerms() {
    this.dialogFormService.open(FormPaymentTermsComponent, {
      context: {
        title: 'Crear nuevo termino de pago',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditPaymentTerms(data) {
    this.dialogFormService.open(FormPaymentTermsComponent, {
      context: {
        title: 'Editar termino de pago',
        data,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  // ChangeState(data) {
  //   // data.status_id = data.status_id === 1 ? 2 : 1;

  //   this.toastrService.info('', 'Cambiando estado');

  //   this.regionS.Update(data).then((x) => {
  //     this.toastrService.success('', x.message);
  //     this.table.refresh();
  //   }).catch((x) => {
  //     this.toastrService.danger(x.message);
  //   });
  // }

  DeleteConfirmPaymentTerms(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeletePaymentTerms.bind(this),
      },
    });
  }

  DeletePaymentTerms(data) {
    return this.PaymentTermsS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}
