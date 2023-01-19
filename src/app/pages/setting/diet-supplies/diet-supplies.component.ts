import { Component, OnInit, ViewChild } from '@angular/core';
import { DietSuppliesService } from '../../../business-controller/diet-supplies.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormDietSuppliesComponent } from './form-diet-supplies/form-diet-supplies.component';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';


@Component({
  selector: 'ngx-diet-supplies',
  templateUrl: './diet-supplies.component.html',
  styleUrls: ['./diet-supplies.component.scss']
})
export class DietSuppliesComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'INSUMOS';
  public subtitle: string = 'INSUMOS';
  public headerFields: any[] = ['ID', 'NOMBRE', 'TIPO DE INSUMO', 'UNIDAD DE MEDIDA'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}, ${this.headerFields[2]}, ${this.headerFields[3]}`;
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
            'edit': this.EditDietSupplies.bind(this),
            'delete': this.DeleteConfirmDietSupplies.bind(this),
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
      diet_supply_type: {
        title: this.headerFields[2],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.name;
        },
      },
      measurement_units: {
        title: this.headerFields[3],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.name;
        },
      },
    },
  };

  public routes = [
    {
      name: 'Insumos',
      route: '../../setting/diet-supplies',
    },
  ];

  constructor(
    private DietSuppliesS: DietSuppliesService,
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

  NewDietSupplies() {
    this.dialogFormService.open(FormDietSuppliesComponent, {
      context: {
        title: 'Crear nuevo insumo',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditDietSupplies(data) {
    this.dialogFormService.open(FormDietSuppliesComponent, {
      context: {
        title: 'Editar insumo',
        data,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  DeleteConfirmDietSupplies(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteDietSupplies.bind(this),
      },
    });
  }

  DeleteDietSupplies(data) {
    return this.DietSuppliesS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}
