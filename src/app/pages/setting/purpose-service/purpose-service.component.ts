import { Component, OnInit, ViewChild } from '@angular/core';
import { PurposeServiceService } from '../../../business-controller/purpose-service.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormPurposeServiceComponent } from './form-purpose-service/form-purpose-service.component';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';


@Component({
  selector: 'ngx-purpose-service',
  templateUrl: './purpose-service.component.html',
  styleUrls: ['./purpose-service.component.scss']
})
export class PurposeServiceComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Propósito del Servicio';
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
        title: 'Acciones',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
            'edit': this.EditPurposeService.bind(this),
            'delete': this.DeleteConfirmPurposeService.bind(this),
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
      name: 'Propósito del servicio',
      route: '../../setting/purpose-service',
    },
  ];

  constructor(
    private PurposeServiceS: PurposeServiceService,
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

  NewPurposeService() {
    this.dialogFormService.open(FormPurposeServiceComponent, {
      context: {
        title: 'Crear nuevo Propósito del servicio',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditPurposeService(data) {
    this.dialogFormService.open(FormPurposeServiceComponent, {
      context: {
        title: 'Editar Propósito del servicio',
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

  DeleteConfirmPurposeService(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeletePurposeService.bind(this),
      },
    });
  }

  DeletePurposeService(data) {
    return this.PurposeServiceS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}
