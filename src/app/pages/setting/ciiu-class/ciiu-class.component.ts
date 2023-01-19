import { Component, OnInit, ViewChild } from '@angular/core';
import { CiiuClassService } from '../../../business-controller/ciiu-class.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormCiiuClassComponent } from './form-ciiu-class/form-ciiu-class.component';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';


@Component({
  selector: 'ngx-ciiu-class',
  templateUrl: './ciiu-class.component.html',
  styleUrls: ['./ciiu-class.component.scss']
})
export class CiiuClassComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Tipo de Clasificación Industrial';
  public subtitle: string = 'Gestión';
  public headerFields: any[] = ['ID','Código', 'Nombre'];
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
            'edit': this.EditCiiuClass.bind(this),
            'delete': this.DeleteConfirmCiiuClass.bind(this),
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
      name: 'Clase de clasificación industrial',
      route: '../../setting/ciiu-class',
    },
  ];

  constructor(
    private ciiuClassS: CiiuClassService,
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

  NewCiiuClass() {
    this.dialogFormService.open(FormCiiuClassComponent, {
      context: {
        title: 'Crear nueva clase de clasificación industrial',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditCiiuClass(data) {
    this.dialogFormService.open(FormCiiuClassComponent, {
      context: {
        title: 'Editar clase de clasificación industrial',
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

  DeleteConfirmCiiuClass(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteCiiuClass.bind(this),
      },
    });
  }

  DeleteCiiuClass(data) {
    return this.ciiuClassS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}
