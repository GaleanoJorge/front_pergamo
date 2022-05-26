import { Component, OnInit, ViewChild } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { FormFixedClasificationComponent } from './form-fixed-clasification/form-fixed-clasification.component';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { FixedClasificationService } from '../../../business-controller/fixed-clasification.service';


@Component({
  selector: 'ngx-fixed-clasification',
  templateUrl: './fixed-clasification.component.html',
  styleUrls: ['./fixed-clasification.component.scss']
})
export class FixedClasificationComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Clasificación del activo';
  public subtitle: string = 'Gestión';
  public headerFields: any[] = ['ID', 'Código y Nombre'];
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
            'edit': this.EditProductCategory.bind(this),
            'delete': this.DeleteConfirmProductCategory.bind(this),
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
        valuePrepareFunction: (value, row) => {
          return row.fixed_code.name + " - " + value;
        },
      },
    },
  };

  public routes = [
    {
      name: 'Clasificación del activo',
      route: '../../setting/fixed-clasification',
    },
  ];

  constructor(
    private FixedClasificationS: FixedClasificationService,
    private dialogFormService: NbDialogService,
    private deleteConfirmService: NbDialogService,
  ) {
  }

  ngOnInit(): void {
  }

  RefreshData() {

    this.table.refresh();
  }

  NewProductCategory() {
    this.dialogFormService.open(FormFixedClasificationComponent, {
      context: {
        title: 'Crear nueva Clasificación del activo',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditProductCategory(data) {
    this.dialogFormService.open(FormFixedClasificationComponent, {
      context: {
        title: 'Editar Clasificación del activo',
        data,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  DeleteConfirmProductCategory(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteProductCategory.bind(this),
      },
    });
  }

  DeleteProductCategory(data) {
    return this.FixedClasificationS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }
}
