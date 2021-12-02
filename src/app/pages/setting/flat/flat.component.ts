import { Component, OnInit, ViewChild } from '@angular/core';
import { FlatService } from '../../../business-controller/flat.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormFlatComponent } from './form-flat/form-flat.component';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';


@Component({
  selector: 'ngx-flat',
  templateUrl: './flat.component.html',
  styleUrls: ['./flat.component.scss']
})
export class FlatComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Pisos';
  public subtitle: string = 'Gestión';
  public headerFields: any[] = ['ID','Código','Nombre','Sede'];
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
            'edit': this.EditFlat.bind(this),
            'delete': this.DeleteConfirmFlat.bind(this),
          };
        },
        renderComponent: ActionsComponent,
      },
      id: {
        title: this.headerFields[0],
        type: 'string',
      },
      code: {
        title: this.headerFields[1],
        type: 'string',
      },
      name: {
        title: this.headerFields[2],
        type: 'string',
      },
      campus: {
        title: this.headerFields[3],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.name;
        },
      },
    },
  };

  public routes = [
    {
      name: 'Pisos',
      route: '../../setting/flat',
    },
  ];

  constructor(
    private FlatS: FlatService,
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

  NewFlat() {
    this.dialogFormService.open(FormFlatComponent, {
      context: {
        title: 'Crear nuevo piso',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditFlat(data) {
    this.dialogFormService.open(FormFlatComponent, {
      context: {
        title: 'Editar piso',
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

  DeleteConfirmFlat(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteFlat.bind(this),
      },
    });
  }

  DeleteFlat(data) {
    return this.FlatS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}
