import { Component, OnInit, ViewChild } from '@angular/core';
import { DietMenuTypeService } from '../../../business-controller/diet-menu-type.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormDietMenuTypeComponent } from './form-diet-menu-type/form-diet-menu-type.component';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';


@Component({
  selector: 'ngx-diet-menu-type',
  templateUrl: './diet-menu-type.component.html',
  styleUrls: ['./diet-menu-type.component.scss']
})
export class DietMenuTypeComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'TIPOS DE MENÚ';
  public subtitle: string = 'TIPOS DE MENÚ';
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
            'edit': this.EditDietMenuType.bind(this),
            'delete': this.DeleteConfirmDietMenuType.bind(this),
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
      name: 'Tipos de menú',
      route: '../../setting/diet-menu-type',
    },
  ];

  constructor(
    private DietMenuTypeS: DietMenuTypeService,
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

  NewDietMenuType() {
    this.dialogFormService.open(FormDietMenuTypeComponent, {
      context: {
        title: 'Crear nuevo tipo de menú',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditDietMenuType(data) {
    this.dialogFormService.open(FormDietMenuTypeComponent, {
      context: {
        title: 'Editar tipo de menú',
        data,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  DeleteConfirmDietMenuType(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteDietMenuType.bind(this),
      },
    });
  }

  DeleteDietMenuType(data) {
    return this.DietMenuTypeS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}
