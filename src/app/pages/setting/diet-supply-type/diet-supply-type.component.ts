import { Component, OnInit, ViewChild } from '@angular/core';
import { DietSupplyTypeService } from '../../../business-controller/diet-supply-type.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormDietSupplyTypeComponent } from './form-diet-supply-type/form-diet-supply-type.component';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';


@Component({
  selector: 'ngx-diet-supply-type',
  templateUrl: './diet-supply-type.component.html',
  styleUrls: ['./diet-supply-type.component.scss']
})
export class DietSupplyTypeComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'TIPOS DE INSUMO';
  public subtitle: string = 'TIPOS DE INSUMO';
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
            'edit': this.EditDietSupplyType.bind(this),
            'delete': this.DeleteConfirmDietSupplyType.bind(this),
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
      name: 'Tipos de insumo',
      route: '../../setting/diet-supply-type',
    },
  ];

  constructor(
    private DietSupplyTypeS: DietSupplyTypeService,
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

  NewDietSupplyType() {
    this.dialogFormService.open(FormDietSupplyTypeComponent, {
      context: {
        title: 'Crear nuevo tipo de insumo',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditDietSupplyType(data) {
    this.dialogFormService.open(FormDietSupplyTypeComponent, {
      context: {
        title: 'Editar tipo de insumo',
        data,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  DeleteConfirmDietSupplyType(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteDietSupplyType.bind(this),
      },
    });
  }

  DeleteDietSupplyType(data) {
    return this.DietSupplyTypeS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}
