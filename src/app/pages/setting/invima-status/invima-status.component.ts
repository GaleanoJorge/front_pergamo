import { Component, OnInit, ViewChild } from '@angular/core';
import { InvimaStatusService } from '../../../business-controller/invima-status.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormInvimaStatusComponent } from './form-invima-status/form-invima-status.component';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';


@Component({
  selector: 'ngx-invima-status',
  templateUrl: './invima-status.component.html',
  styleUrls: ['./invima-status.component.scss']
})
export class InvimaStatusComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Estado del Invima';
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
        title: '',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
            'edit': this.EditInvimaStatus.bind(this),
            'delete': this.DeleteConfirmInvimaStatus.bind(this),
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
      name: 'Estado del Invima',
      route: '../../setting/invima-status',
    },
  ];

  constructor(
    private InvimaStatusS: InvimaStatusService,
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

  NewInvimaStatus() {
    this.dialogFormService.open(FormInvimaStatusComponent, {
      context: {
        title: 'Crear nuevo Estado del Invima',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditInvimaStatus(data) {
    this.dialogFormService.open(FormInvimaStatusComponent, {
      context: {
        title: 'Editar Estado del Invima',
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

  DeleteConfirmInvimaStatus(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteInvimaStatus.bind(this),
      },
    });
  }

  DeleteInvimaStatus(data) {
    return this.InvimaStatusS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}
