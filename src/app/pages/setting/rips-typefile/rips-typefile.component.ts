import { Component, OnInit, ViewChild } from '@angular/core';
import { RipsTypeFileService } from '../../../business-controller/rips-typefile.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormRipsTypeFileComponent } from './form-rips-typefile/form-rips-typefile.component';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';


@Component({
  selector: 'ngx-rips-typefile',
  templateUrl: './rips-typefile.component.html',
  styleUrls: ['./rips-typefile.component.scss']
})
export class RipsTypeFileComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Tipo de Archivos Rips';
  public subtitle: string = 'Gestión';
  public headerFields: any[] = ['ID','Código' ,'Nombre'];
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
            'edit': this.EditRipsTypeFile.bind(this),
            'delete': this.DeleteConfirmRipsTypeFile.bind(this),
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
    },
  };

  public routes = [
    {
      name: 'Tipo de archivos Rips',
      route: '../../setting/rips-typefile',
    },
  ];

  constructor(
    private RipsTypeFileS: RipsTypeFileService,
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

  NewRipsTypeFile() {
    this.dialogFormService.open(FormRipsTypeFileComponent, {
      context: {
        title: 'Crear nuevo tipo de archivos rips',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditRipsTypeFile(data) {
    this.dialogFormService.open(FormRipsTypeFileComponent, {
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

  DeleteConfirmRipsTypeFile(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteRipsTypeFile.bind(this),
      },
    });
  }

  DeleteRipsTypeFile(data) {
    return this.RipsTypeFileS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}
