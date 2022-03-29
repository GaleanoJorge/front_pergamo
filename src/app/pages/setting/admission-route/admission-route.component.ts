import { Component, OnInit, ViewChild } from '@angular/core';
import { AdmissionRouteService } from '../../../business-controller/admission-route.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormAdmissionRouteComponent } from './form-admission-route/form-admission-route.component';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';


@Component({
  selector: 'ngx-admission-route',
  templateUrl: './admission-route.component.html',
  styleUrls: ['./admission-route.component.scss']
})
export class AdmissionRouteComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Ruta de admisión';
  public subtitle: string = 'Gestión';
  public headerFields: any[] = ['ID','Nombre'];
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
        title: '',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
            'edit': this.EditAdmissionRoute.bind(this),
            'delete': this.DeleteConfirmAdmissionRoute.bind(this),
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
      name: 'Ruta de admisión',
      route: '../../setting/admission-route',
    },
  ];

  constructor(
    private AdmissionRouteS: AdmissionRouteService,
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

  NewAdmissionRoute() {
    this.dialogFormService.open(FormAdmissionRouteComponent, {
      context: {
        title: 'Crear nueva ruta de admisión',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditAdmissionRoute(data) {
    this.dialogFormService.open(FormAdmissionRouteComponent, {
      context: {
        title: 'Editar ruta de admisión',
        data,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  // ChangeState(data) {
  //   // data.status_id = data.status_id === 1 ? 2 : 1;

  //   this.toastrService.info('', 'Cambiando estado');

  //   this.regionS.Update(data).then((x) => {
  //     this.toastrService.success('', x.message);
  //     this.table.refresh();
  //   }).catch((x) => {
  //     this.toastrService.danger(x.message);
  //   });
  // }

  DeleteConfirmAdmissionRoute(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteAdmissionRoute.bind(this),
      },
    });
  }

  DeleteAdmissionRoute(data) {
    return this.AdmissionRouteS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}
