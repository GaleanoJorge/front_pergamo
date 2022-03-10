import { Component, OnInit, ViewChild } from '@angular/core';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormDietSuppliesInputComponent } from './form-diet-supplies-input/form-diet-supplies-input.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { DietSuppliesInputService } from '../../../business-controller/diet-supplies-input.service';
import { CurrencyPipe } from '@angular/common';
import { environment } from '../../../../environments/environment.prod';
import { ActionsInputComponent } from './actions-input.component';


@Component({
  selector: 'ngx-diet-supplies-input',
  templateUrl: './diet-supplies-input.component.html',
  styleUrls: ['./diet-supplies-input.component.scss']
})
export class DietSuppliesInputComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'ENTRADAS DE INSUMOS';
  public subtitle: string = 'ENTRADAS';
  public headerFields: any[] = ['ID', 'INSUMO', 'CANTIDAD', 'PRECIO', 'PROVEEDOR', 'SEDE', 'FECHA', 'NÚMERO FACTURA'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}`;
  public icon: string = 'nb-star';
  public data = [];
  public previewFile;
  public measurement_units;

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
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
            'edit': this.EditDietSuppliesInput.bind(this),
            'delete': this.DeleteConfirmDietSuppliesInput.bind(this),
          };
        },
        renderComponent: ActionsInputComponent,
      },
      id: {
        title: this.headerFields[0],
        type: 'string',
      },
      diet_supplies: {
        title: this.headerFields[1],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          this.measurement_units = value.measurement_units.code;
          return value.name;
        },
      },
      amount: {
        title: this.headerFields[2],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value+' '+ this.measurement_units;
        },
      },
      price: {
        title: this.headerFields[3],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return this.currency.transform(value);
        },
      },
      company: {
        title: this.headerFields[4],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.name;
        },
      },
      campus_id: {
        title: this.headerFields[5],
        type: 'string',
      },
      updated_at: {
        title: this.headerFields[6],
        type: 'string',
      },
      invoice_number: {
        title: this.headerFields[7],
        type: 'string',
      },
    },
  };

  public routes = [
    {
      name: 'Entradas de insumos',
      route: '../../setting/diet-supplies-input',
    },
  ];

  constructor(
    private DietSuppliesInputS: DietSuppliesInputService,
    private toastrService: NbToastrService,
    private currency: CurrencyPipe,
    private dialogFormService: NbDialogService,
    private deleteConfirmService: NbDialogService,
  ) {
  }

  ngOnInit(): void {
  }

  RefreshData() {

    this.table.refresh();
  }

  NewDietSuppliesInput() {
    this.dialogFormService.open(FormDietSuppliesInputComponent, {
      context: {
        title: 'Crear nueva entrada de insumo',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditDietSuppliesInput(data) {
    this.dialogFormService.open(FormDietSuppliesInputComponent, {
      context: {
        title: 'Editar entrada de insumo',
        data,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  DeleteConfirmDietSuppliesInput(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteDietSuppliesInput.bind(this),
      },
    });
  }

  DeleteDietSuppliesInput(data) {
    return this.DietSuppliesInputS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}
