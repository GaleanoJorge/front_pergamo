import { Component, OnInit, ViewChild } from '@angular/core';
import { ProcedureService } from '../../../business-controller/procedure.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormProcedureComponent } from './form-procedure/form-procedure.component';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';


@Component({
  selector: 'ngx-procedure',
  templateUrl: './procedure.component.html',
  styleUrls: ['./procedure.component.scss']
})
export class ProcedureComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Procedimiento';
  public subtitle: string = 'Gestión';
  public headerFields: any[] = ['ID', 'Cod', 'Cups', 'Nombre del procedimiento', 'Categoria del procedimiento', 'Pos', 'Rango de Edad ', 'Genero', 'Estado del procedimiento', 'Id de finalidad ', 'Tiempo'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]},${this.headerFields[2]},${this.headerFields[3]}, ${this.headerFields[8]}`;
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
            'edit': this.EditProcedure.bind(this),
            'delete': this.DeleteConfirmProcedure.bind(this),
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
      equivalent: {
        title: this.headerFields[2],
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
      name: 'Procedimiento o servicios que se van a prestar',
      route: '../../setting/procedure',
    },
  ];

  constructor(
    private procedureS: ProcedureService,
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

  NewProcedure() {
    this.dialogFormService.open(FormProcedureComponent, {
      context: {
        title: 'Crear procedimiento o servicios que se van a prestar',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditProcedure(data) {
    this.dialogFormService.open(FormProcedureComponent, {
      context: {
        title: 'Editar Crear procedimiento o servicios que se van a prestar',
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

  DeleteConfirmProcedure(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteProcedure.bind(this),
      },
    });
  }

  DeleteProcedure(data) {
    return this.procedureS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}
