import { Component, OnInit, ViewChild } from '@angular/core';
import { PavilionService } from '../../../business-controller/pavilion.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormPavilionComponent } from './form-pavilion/form-pavilion.component';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';


@Component({
  selector: 'ngx-pavilion',
  templateUrl: './pavilion.component.html',
  styleUrls: ['./pavilion.component.scss']
})
export class PavilionComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Pabellón';
  public subtitle: string = 'Gestión';
  public headerFields: any[] = ['ID','Código','Nombre','Pabellón','Sede'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}`;
  public icon: string = 'nb-star';
  public data = [];
  public sede;

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
            'edit': this.EditPavilion.bind(this),
            'delete': this.DeleteConfirmPavilion.bind(this),
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
      flat: {
        title: this.headerFields[3],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          this.sede=value.campus.name;
          return value.name;
        },
      },
      campus: {
        title: this.headerFields[4],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return this.sede;
        },
      },
    },
  };

  public routes = [
    {
      name: 'Pabellón',
      route: '../../setting/pavilion',
    },
  ];

  constructor(
    private PavilionS: PavilionService,
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

  NewPavilion() {
    this.dialogFormService.open(FormPavilionComponent, {
      context: {
        title: 'Crear nuevo pabellón',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditPavilion(data) {
    this.dialogFormService.open(FormPavilionComponent, {
      context: {
        title: 'Editar pabellón',
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

  DeleteConfirmPavilion(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeletePavilion.bind(this),
      },
    });
  }

  DeletePavilion(data) {
    return this.PavilionS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}
