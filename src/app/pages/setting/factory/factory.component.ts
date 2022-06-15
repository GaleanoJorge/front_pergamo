import { Component, OnInit, ViewChild } from '@angular/core';
import { FactoryService } from '../../../business-controller/factory.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormFactoryComponent } from './form-factory/form-factory.component';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';


@Component({
  selector: 'ngx-factory',
  templateUrl: './factory.component.html',
  styleUrls: ['./factory.component.scss']
})
export class FactoryComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Fabricante';
  public subtitle: string = 'Gestión';
  public headerFields: any[] = ['ID', 'Identificación', 'Verificatión', 'Nombre'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]},${this.headerFields[2]},${this.headerFields[3]}, ${this.headerFields[4]}`;
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
            'edit': this.EditFactory.bind(this),
            'delete': this.DeleteConfirmFactory.bind(this),
          };
        },
        renderComponent: ActionsComponent,
      },
      id: {
        title: this.headerFields[0],
        type: 'string',
      },
      name: {
        title: this.headerFields[3],
        type: 'string',
      },
    },
  };

  public routes = [
    {
      name: 'Fabricantes',
      route: '../../setting/factory',
    },
  ];

  constructor(
    private factoryS: FactoryService,
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

  NewFactory() {
    this.dialogFormService.open(FormFactoryComponent, {
      context: {
        title: 'Crear fabricantes',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditFactory(data) {
    this.dialogFormService.open(FormFactoryComponent, {
      context: {
        title: 'Editar fabricantes',
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

  DeleteConfirmFactory(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteFactory.bind(this),
      },
    });
  }

  DeleteFactory(data) {
    return this.factoryS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}
