import { Component, OnInit, ViewChild } from '@angular/core';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { FormFixedLocationCampusComponent } from './form-fixed-location-campus/form-fixed-location-campus.component';
import { FixedLocationCampusService } from '../../../business-controller/fixed-location-campus.service';

@Component({
  selector: 'ngx-fixed-location-campus',
  templateUrl: './fixed-location-campus.component.html',
  styleUrls: ['./fixed-location-campus.component.scss']
})
export class FixedLocationCampusComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Ubicacion del Activo sedes';
  public subtitle: string = 'Gestión';
  public headerFields: any[] = ['ID', 'Piso', 'Sede', 'Area / Servicio'];
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
      flat: {
        title: this.headerFields[1],
        type: 'string', valuePrepareFunction: (value, row) => {
          return value.name;
        },
      },
      campus: {
        title: this.headerFields[2],
        type: 'string', valuePrepareFunction: (value, row) => {
          return value.name;
        },
      },
      fixed_area_campus: {
        title: this.headerFields[3],
        type: 'string', valuePrepareFunction: (value, row) => {
          return value.name;
        },
      },
    },
  };

  public routes = [
    {
      name: 'Ubicacion del Activo sedes',
      route: '../../setting/fixed-location-campus',
    },
  ];

  constructor(
    private FixedLocationCampusS: FixedLocationCampusService,
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
    this.dialogFormService.open(FormFixedLocationCampusComponent, {
      context: {
        title: 'Crear nueva Ubicacion del Activo sedes',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditAdministrationRoute(data) {
    this.dialogFormService.open(FormFixedLocationCampusComponent, {
      context: {
        title: 'Editar Ubicacion del Activo sedes',
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
    return this.FixedLocationCampusS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}
