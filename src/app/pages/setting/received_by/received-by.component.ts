import { Component, OnInit, ViewChild } from '@angular/core';
// import { ReceivedByService } from '../../../business-controller/type-briefcase.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormReceivedByComponent } from './form-received-by/form-received-by.component';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { ReceivedByService } from '../../../business-controller/received-by.service';


@Component({
  selector: 'ngx-received-by',
  templateUrl: './received-by.component.html',
  styleUrls: ['./received-by.component.scss']
})
export class ReceivedByComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Forma de Recibir Glosas';
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
            'edit': this.EditReceivedBy.bind(this),
            'delete': this.DeleteConfirmReceivedBy.bind(this),
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
      name: 'Recibido mediante:',
      route: '../../setting/received-by',
    },
  ];

  constructor(
    private ReceivedByS: ReceivedByService,
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

  NewReceivedBy() {
    this.dialogFormService.open(FormReceivedByComponent, {
      context: {
        title: 'Crear una nueva forma de recibir glosa',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditReceivedBy(data) {
    this.dialogFormService.open(FormReceivedByComponent, {
      context: {
        title: 'Editar tipo forma de recibir glosa',
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

  DeleteConfirmReceivedBy(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteReceivedBy.bind(this),
      },
    });
  }

  DeleteReceivedBy(data) {
    return this.ReceivedByS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}
