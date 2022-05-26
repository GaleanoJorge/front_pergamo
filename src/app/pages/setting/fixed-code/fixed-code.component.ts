import { Component, OnInit, ViewChild } from '@angular/core';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { FixedCodeService } from '../../../business-controller/fixed-code.service';
import { FormFixedCodeComponent } from './form-fixed-code/form-fixed-code.component';

@Component({
  selector: 'ngx-fixed-code',
  templateUrl: './fixed-code.component.html',
  styleUrls: ['./fixed-code.component.scss']
})
export class FixedCodeComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Código de Clasificación';
  public subtitle: string = 'Gestión';
  public headerFields: any[] = ['ID', 'Código'];
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
      name: 'Código de Clasificación',
      route: '../../setting/fixed-code',
    },
  ];

  constructor(
    private FixedCodeS: FixedCodeService,
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
    this.dialogFormService.open(FormFixedCodeComponent, {
      context: {
        title: 'Crear nuevo Código de Clasificación',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditAdministrationRoute(data) {
    this.dialogFormService.open(FormFixedCodeComponent, {
      context: {
        title: 'Editar Código de Clasificación',
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
    return this.FixedCodeS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}
