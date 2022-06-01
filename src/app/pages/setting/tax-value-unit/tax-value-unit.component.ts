import { Component, OnInit, ViewChild } from '@angular/core';
import { TaxValueUnitService } from '../../../business-controller/tax-value-unit.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormTaxValueUnitComponent } from './form-tax-value-unit/form-tax-value-unit.component';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'ngx-tax-value-unit',
  templateUrl: './tax-value-unit.component.html',
  styleUrls: ['./tax-value-unit.component.scss']
})
export class TaxValueUnitComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'DÍAS DE DIETAS';
  public subtitle: string = 'DÍAS';
  public headerFields: any[] = ['ID', 'VALOR', 'AÑO'];
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
            'edit': this.EditTaxValueUnit.bind(this),
            'delete': this.DeleteConfirmTaxValueUnit.bind(this),
          };
        },
        renderComponent: ActionsComponent,
      },
      id: {
        title: this.headerFields[0],
        type: 'string',
      },
      value: {
        title: this.headerFields[1],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return this.currency.transform(value);
        }
      },
      year: {
        title: this.headerFields[2],
        type: 'string',
      },
    },
  };

  public routes = [
    {
      name: 'Días de dietas',
      route: '../../setting/tax-value-unit',
    },
  ];

  constructor(
    private TaxValueUnitS: TaxValueUnitService,
    private toastrService: NbToastrService,
    private dialogFormService: NbDialogService,
    private deleteConfirmService: NbDialogService,
    private currency: CurrencyPipe,
  ) {
  }

  ngOnInit(): void {
  }

  RefreshData() {

    this.table.refresh();
  }

  NewTaxValueUnit() {
    this.dialogFormService.open(FormTaxValueUnitComponent, {
      context: {
        title: 'Crear nuevo día de dietas',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditTaxValueUnit(data) {
    this.dialogFormService.open(FormTaxValueUnitComponent, {
      context: {
        title: 'Editar día de dietas',
        data,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  DeleteConfirmTaxValueUnit(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteTaxValueUnit.bind(this),
      },
    });
  }

  DeleteTaxValueUnit(data) {
    return this.TaxValueUnitS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}
