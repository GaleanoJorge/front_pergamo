import { Component, OnInit, ViewChild } from '@angular/core';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { FormFixedPropertyComponent } from './form-fixed-property/form-fixed-property.component';
import { FixedPropertyService } from '../../../business-controller/fixed-property.service';

@Component({
  selector: 'ngx-fixed-property',
  templateUrl: './fixed-property.component.html',
  styleUrls: ['./fixed-property.component.scss']
})
export class FixedPropertyComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Tipos de propiedad';
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
            'edit': this.EditAdministrationRoute.bind(this),
            'delete': this.DeleteConfirmAdministrationRoute.bind(this),
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
      name: 'Tipos de propiedad',
      route: '../../setting/fixed-property',
    },
  ];

  constructor(
    private FixedPropertyS: FixedPropertyService,
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

  NewAdministrationRoute() {
    this.dialogFormService.open(FormFixedPropertyComponent, {
      context: {
        title: 'Crear nuevo Tipos de propiedad',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditAdministrationRoute(data) {
    this.dialogFormService.open(FormFixedPropertyComponent, {
      context: {
        title: 'Editar Tipos de propiedad',
        data,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  DeleteConfirmAdministrationRoute(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteAdministrationRoute.bind(this),
      },
    });
  }

  DeleteAdministrationRoute(data) {
    return this.FixedPropertyS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}
