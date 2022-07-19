import { Component, OnInit, ViewChild } from '@angular/core';
import { BillingPadConsecutiveService } from '../../../business-controller/billing-pad-consecutive.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormBillingPadConsecutiveComponent } from './form-billing-pad-consecutive/form-billing-pad-consecutive.component';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { DateFormatPipe } from '../../../pipe/date-format.pipe';

@Component({
  selector: 'ngx-billing-pad-consecutive',
  templateUrl: './billing-pad-consecutive.component.html',
  styleUrls: ['./billing-pad-consecutive.component.scss']
})
export class BillingPadConsecutiveComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'CONSECUTIVOS DE FACTURACIÓN';
  public subtitle: string = 'RESOLUCIONES';
  public headerFields: any[] = ['PREFIJO', 'RESOLUCIÓN', 'CONS. INICIAL', 'CONS. FINAL', 'CONS. ACTUAL', 'FECHA VENCIMIENTO', 'ESTADO'];
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
        title: 'ACCIONES',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          return {
            'data': row,
            'edit': this.EditBillingPadConsecutive.bind(this),
            'delete': this.DeleteConfirmBillingPadConsecutive.bind(this),
          };
        },
        renderComponent: ActionsComponent,
      },
      billing_pad_prefix_id: {
        title: this.headerFields[0],
        type: 'string',
        valuePrepareFunction(value, row) {
          return row.billing_pad_prefix.name;
        }
      },
      resolution: {
        title: this.headerFields[1],
        type: 'string',
      },
      initial_consecutive: {
        title: this.headerFields[2],
        type: 'string',
      },
      final_consecutive: {
        title: this.headerFields[3],
        type: 'string',
      },
      actual_consecutive: {
        title: this.headerFields[4],
        type: 'string',
        valuePrepareFunction(value, row) {
          if (value == null) {
            return "-";
          } else {
            return value;
          }
        }
      },
      expiracy_date: {
        title: this.headerFields[5],
        type: 'string',
        valuePrepareFunction(value, row) {
          return row.expiracy_date;
        }
      },
      status_id: {
        title: this.headerFields[6],
        type: 'string',
        valuePrepareFunction(value, row) {
          return row.status.name;
        }
      },
    },
  };

  public routes = [
    {
      name: 'PREFIJOS DE FACTURACIÓN',
      route: '../../setting/billing-pad-consecutive',
    },
  ];

  constructor(
    private BillingPadConsecutiveS: BillingPadConsecutiveService,
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

  NewBillingPadConsecutive() {
    this.dialogFormService.open(FormBillingPadConsecutiveComponent, {
      context: {
        title: 'Crear nuevo prefijo',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditBillingPadConsecutive(data) {
    this.dialogFormService.open(FormBillingPadConsecutiveComponent, {
      context: {
        title: 'Editar prefijo',
        data,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  DeleteConfirmBillingPadConsecutive(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteBillingPadConsecutive.bind(this),
      },
    });
  }

  DeleteBillingPadConsecutive(data) {
    return this.BillingPadConsecutiveS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}
