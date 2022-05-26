import { Component, OnInit, ViewChild } from '@angular/core';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { FormFixedAreaCampusComponent } from './form-fixed-area-campus/form-fixed-area-campus.component';
import { FixedAreaCampusService } from '../../../business-controller/fixed-area-campus.service';

@Component({
  selector: 'ngx-fixed-area-campus',
  templateUrl: './fixed-area-campus.component.html',
  styleUrls: ['./fixed-area-campus.component.scss']
})
export class FixedAreaCampusComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Areas / Servicios';
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
      name: 'Areas / Servicios',
      route: '../../setting/fixed-area-campus',
    },
  ];

  constructor(
    private FixedAreaCampusS: FixedAreaCampusService,
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
    this.dialogFormService.open(FormFixedAreaCampusComponent, {
      context: {
        title: 'Crear nuevas Areas / Servicios',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditAdministrationRoute(data) {
    this.dialogFormService.open(FormFixedAreaCampusComponent, {
      context: {
        title: 'Editar Areas / Servicios',
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
    return this.FixedAreaCampusS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}
