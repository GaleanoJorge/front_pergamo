import { Component, OnInit, ViewChild } from '@angular/core';
import { DietStockService } from '../../../business-controller/diet-stock.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormDietStockComponent } from './form-diet-stock/form-diet-stock.component';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';


@Component({
  selector: 'ngx-diet-stock',
  templateUrl: './diet-stock.component.html',
  styleUrls: ['./diet-stock.component.scss']
})
export class DietStockComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'INVENTARIO';
  public subtitle: string = 'INVENTARIO';
  public headerFields: any[] = ['INSUMO', 'CANTIDAD', 'SEDE'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[2]}`;
  public icon: string = 'nb-star';
  public data = [];
  public entity: string;

  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  public settings = {
    pager: {
      display: true,
      perPage: 10,
    },
    columns: {
      // actions: {
      //   title: 'ACCIONES',
      //   type: 'custom',
      //   valuePrepareFunction: (value, row) => {
      //     // DATA FROM HERE GOES TO renderComponent
      //     return {
      //       'data': row,
      //       'edit': this.EditDietStock.bind(this),
      //       'delete': this.DeleteConfirmDietStock.bind(this),
      //     };
      //   },
      //   renderComponent: ActionsComponent,
      // },
      // id: {
      //   title: this.headerFields[0],
      //   type: 'string',
      // },
      diet_supplies: {
        title: this.headerFields[1],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.name;
        },
      },
      amount: {
        title: this.headerFields[2],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value + ' ' + row.diet_supplies.measurement_units.code;
        },
      },
      campus: {
        title: this.headerFields[3],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.name;
        },
      },
      // measurement_units:{
      //   title: this.headerFields[3],
      //   type: 'string',
      //   valuePrepareFunction: (value, row) => {
      //     return row.diet_supplies.measurement_units.code;
      //   },
      // }
    },
  };

  public routes = [
    {
      name: 'Inventario',
      route: '../../setting/diet-stock',
    },
  ];

  constructor(
    private DietStockS: DietStockService,
    private toastrService: NbToastrService,
    private dialogFormService: NbDialogService,
    private deleteConfirmService: NbDialogService,
  ) {
  }

  ngOnInit(): void {
    var campus =+ localStorage.getItem('campus');
    this.entity = `diet_stock/?pagination=true&campus_id=${campus}`
  }

  RefreshData() {

    this.table.refresh();
  }

  NewDietStock() {
    this.dialogFormService.open(FormDietStockComponent, {
      context: {
        title: 'Crear nuevo inventario',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditDietStock(data) {
    this.dialogFormService.open(FormDietStockComponent, {
      context: {
        title: 'Editar inventario',
        data,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  DeleteConfirmDietStock(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteDietStock.bind(this),
      },
    });
  }

  DeleteDietStock(data) {
    return this.DietStockS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}
