import { Component, OnInit, ViewChild } from '@angular/core';
import { RipsTypeService } from '../../../business-controller/rips-type.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormRipsTypeComponent } from './form-rips-type/form-rips-type.component';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';


@Component({
  selector: 'ngx-rips-type',
  templateUrl: './rips-type.component.html',
  styleUrls: ['./rips-type.component.scss']
})
export class RipsTypeComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Tipo de Rips';
  public subtitle: string = 'Gestión';
  public headerFields: any[] = ['ID','Nombre' ,'Tipo documento Rips'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]},${this.headerFields[2]}`;
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
            'edit': this.EditRipsType.bind(this),
            'delete': this.DeleteConfirmRipsType.bind(this),
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
      rips_typefile: {
        title: this.headerFields[2],
        type: 'string',
        valuePrepareFunction(value, row) {
          return value.name;
      },
      },
    },
  };

  public routes = [
    {
      name: 'Tipo de Rips',
      route: '../../setting/rips-type',
    },
  ];

  constructor(
    private RipsTypeS: RipsTypeService,
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

  NewRipsType() {
    this.dialogFormService.open(FormRipsTypeComponent, {
      context: {
        title: 'Crear nuevo tipo de archivos rips',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditRipsType(data) {
    this.dialogFormService.open(FormRipsTypeComponent, {
      context: {
        title: 'Editar tipo de archivos rips',
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

  DeleteConfirmRipsType(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteRipsType.bind(this),
      },
    });
  }

  DeleteRipsType(data) {
    return this.RipsTypeS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}
