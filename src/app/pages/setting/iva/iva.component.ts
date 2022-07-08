import { Component, OnInit, ViewChild } from '@angular/core';
import { IvaService } from '../../../business-controller/iva.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormIvaComponent } from './form-iva/form-iva.component';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';


@Component({
  selector: 'ngx-iva',
  templateUrl: './iva.component.html',
  styleUrls: ['./iva.component.scss']
})
export class IvaComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'IVA';
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
            'edit': this.EditIva.bind(this),
            'delete': this.DeleteConfirmIva.bind(this),
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
      name: 'Tipo de IVA',
      route: '../../setting/iva',
    },
  ];

  constructor(
    private IvaS: IvaService,
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

  NewIva() {
    this.dialogFormService.open(FormIvaComponent, {
      context: {
        title: 'Crear nuevo IVA',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditIva(data) {
    this.dialogFormService.open(FormIvaComponent, {
      context: {
        title: 'Editar IVA',
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

  DeleteConfirmIva(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteIva.bind(this),
      },
    });
  }

  DeleteIva(data) {
    return this.IvaS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}
