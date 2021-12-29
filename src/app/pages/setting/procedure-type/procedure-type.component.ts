import { Component, OnInit, ViewChild } from '@angular/core';
import { ProcedureTypeService } from '../../../business-controller/procedure-type.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormProcedureTypeComponent } from './form-procedure-type/form-procedure-type.component';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';


@Component({
  selector: 'ngx-procedure-type',
  templateUrl: './procedure-type.component.html',
  styleUrls: ['./procedure-type.component.scss']
})
export class ProcedureTypeComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Tipo de procedimiento';
  public subtitle: string = 'Gestión';
  public headerFields: any[] = ['ID','Nombre'];
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
            'edit': this.EditProcedureType.bind(this),
            'delete': this.DeleteConfirmProcedureType.bind(this),
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
      name: 'Tipo de procedimiento',
      route: '../../setting/procedure-type',
    },
  ];

  constructor(
    private ProcedureTypeS: ProcedureTypeService,
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

  NewProcedureType() {
    this.dialogFormService.open(FormProcedureTypeComponent, {
      context: {
        title: 'Crear nuevo Tipo de procedimiento',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditProcedureType(data) {
    this.dialogFormService.open(FormProcedureTypeComponent, {
      context: {
        title: 'Editar Tipo de procedimiento',
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

  DeleteConfirmProcedureType(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteProcedureType.bind(this),
      },
    });
  }

  DeleteProcedureType(data) {
    return this.ProcedureTypeS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}
