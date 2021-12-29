import { Component, OnInit, ViewChild } from '@angular/core';
import { ManualService } from '../../../business-controller/manual.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormManualComponent } from './form-manual/form-manual.component';
import { ActionsManualComponent } from '../manual/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { Router } from '@angular/router';


@Component({
  selector: 'ngx-manual',
  templateUrl: './manual.component.html',
  styleUrls: ['./manual.component.scss']
})
export class ManualComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Manuales Tarifarios';
  public subtitle: string = 'Gestión';
  public headerFields: any[] = ['ID', 'Nombre','Año'];
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
            'edit': this.EditManual.bind(this),
            'delete': this.DeleteConfirmManual.bind(this),
            'procedure': (row) => this.router.navigate([`/pages/setting/procedure-massive/${row.id}`]),
            'procedurelist': (row) => this.router.navigate([`/pages/setting/manual-price/${row.id}`])
          };
        },
        renderComponent: ActionsManualComponent,
      },
      id: {
        title: this.headerFields[0],
        type: 'string',
      },
      name: {
        title: this.headerFields[1],
        type: 'string',
      },
      year: {
        title: this.headerFields[2],
        type: 'string',
      },
    },
  };

  public routes = [
    {
      name: 'Manuales tarifarios',
      route: '../../setting/manual',
    },
  ];

  constructor(
    private ManualS: ManualService,
    private router: Router,
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

  NewManual() {
    this.dialogFormService.open(FormManualComponent, {
      context: {
        title: 'Crear nuevo manual tarifario',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditManual(data) {
    this.dialogFormService.open(FormManualComponent, {
      context: {
        title: 'Editar manual tarifario',
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

  DeleteConfirmManual(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteManual.bind(this),
      },
    });
  }

  DeleteManual(data) {
    return this.ManualS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}
