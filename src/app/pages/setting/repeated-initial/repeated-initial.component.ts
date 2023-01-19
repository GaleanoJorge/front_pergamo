import { Component, OnInit, ViewChild } from '@angular/core';
// import { RepeatedInitialService } from '../../../business-controller/type-briefcase.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormRepeatedInitialComponent } from './form-repeated-initial/form-repeated-initial.component';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { RepeatedInitialService } from '../../../business-controller/repeated-initial.service';


@Component({
  selector: 'ngx-repeated-initial',
  templateUrl: './repeated-initial.component.html',
  styleUrls: ['./repeated-initial.component.scss']
})
export class RepeatedInitialComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Inicializado o Reiterado';
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
            'edit': this.EditRepeatedInitial.bind(this),
            'delete': this.DeleteConfirmRepeatedInitial.bind(this),
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
      name: 'Tipo de Inicializado - Reiterado',
      route: '../../setting/repeated-initial',
    },
  ];

  constructor(
    private RepeatedInitialS: RepeatedInitialService,
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

  NewRepeatedInitial() {
    this.dialogFormService.open(FormRepeatedInitialComponent, {
      context: {
        title: 'Crear nuevo Inicializado - Reiterado',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditRepeatedInitial(data) {
    this.dialogFormService.open(FormRepeatedInitialComponent, {
      context: {
        title: 'Editar Inicializado - Reiterado',
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

  DeleteConfirmRepeatedInitial(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteRepeatedInitial.bind(this),
      },
    });
  }

  DeleteRepeatedInitial(data) {
    return this.RepeatedInitialS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}
