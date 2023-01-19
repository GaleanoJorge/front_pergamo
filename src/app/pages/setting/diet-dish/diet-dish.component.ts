import { Component, OnInit, ViewChild } from '@angular/core';
import { DietDishService } from '../../../business-controller/diet-dish.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormDietDishComponent } from './form-diet-dish/form-diet-dish.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { DietDishStockService } from '../../../business-controller/diet-dish-stock.service';
import { ActionsDishComponent } from './actions-dish.component';

@Component({
  selector: 'ngx-diet-dish',
  templateUrl: './diet-dish.component.html',
  styleUrls: ['./diet-dish.component.scss']
})
export class DietDishComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'PLATOS';
  public subtitle: string = 'PLATOS';
  public headerFields: any[] = ['ID', 'NOMBRE'];
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
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
            'edit': this.EditDietDish.bind(this),
            'view': this.ViewDietDish.bind(this),
            'delete': this.DeleteConfirmDietDish.bind(this),
          };
        },
        renderComponent: ActionsDishComponent,
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
      name: 'Platos',
      route: '../../setting/diet-dish',
    },
  ];

  constructor(
    private DietDishS: DietDishService,
    private dietDishStockS: DietDishStockService,
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

  NewDietDish() {
    this.dialogFormService.open(FormDietDishComponent, {
      context: {
        title: 'Crear nuevo plato',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditDietDish(data) {
    data.view = false;
    this.dialogFormService.open(FormDietDishComponent, {
      context: {
        title: 'Editar plato',
        data,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  ViewDietDish(data) {
    data.view = true;
    this.dialogFormService.open(FormDietDishComponent, {
      context: {
        title: 'Ver Insumos',
        data,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  DeleteConfirmDietDish(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteDietDish.bind(this),
      },
    });
  }

  DeleteDietDish(data) {
    return this.DietDishS.Delete(data.id).then(x => {
      this.table.refresh();
      this.dietDishStockS.Delete(data.id);
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}
