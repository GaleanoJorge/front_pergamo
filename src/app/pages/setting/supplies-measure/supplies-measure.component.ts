import { Component, OnInit, ViewChild } from '@angular/core';
import { SuppliesMeasureService } from '../../../business-controller/supplies-measure.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormSuppliesMeasureComponent } from './form-supplies-measure/form-supplies-measure.component';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';


@Component({
  selector: 'ngx-supplies-measure',
  templateUrl: './supplies-measure.component.html',
  styleUrls: ['./supplies-measure.component.scss']
})
export class SuppliesMeasureComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Unidades de Medida para insumo';
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
            'edit': this.EditSuppliesMeasure.bind(this),
            'delete': this.DeleteConfirmSuppliesMeasure.bind(this),
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
      name: 'Unidades de medida',
      route: '../../setting/supplies-measure',
    },
  ];

  constructor(
    private SuppliesMeasureS: SuppliesMeasureService,
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

  NewSuppliesMeasure() {
    this.dialogFormService.open(FormSuppliesMeasureComponent, {
      context: {
        title: 'Crear nueva unidades de medida',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditSuppliesMeasure(data) {
    this.dialogFormService.open(FormSuppliesMeasureComponent, {
      context: {
        title: 'Editar unidades de medida',
        data,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  DeleteConfirmSuppliesMeasure(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteSuppliesMeasure.bind(this),
      },
    });
  }

  DeleteSuppliesMeasure(data) {
    return this.SuppliesMeasureS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}
