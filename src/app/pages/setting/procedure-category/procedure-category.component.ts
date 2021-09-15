import { Component, OnInit, ViewChild } from '@angular/core';
import { ProcedureCategoryService } from '../../../business-controller/procedure-category.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormProcedureCategoryComponent } from './form-procedure-category/form-procedure-category.component';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';


@Component({
  selector: 'ngx-procedure-category',
  templateUrl: './procedure-category.component.html',
  styleUrls: ['./procedure-category.component.scss']
})
export class ProcedureCategoryComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Categoria del procedimiento';
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
        title: '',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
            'edit': this.EditProcedureCategory.bind(this),
            'delete': this.DeleteConfirmProcedureCategory.bind(this),
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
      name: 'Categoria del procedimiento',
      route: '../../setting/procedure-category',
    },
  ];

  constructor(
    private procedureCategoryS: ProcedureCategoryService,
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

  NewProcedureCategory() {
    this.dialogFormService.open(FormProcedureCategoryComponent, {
      context: {
        title: 'Crear nueva categoria para el procedimiento',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditProcedureCategory(data) {
    this.dialogFormService.open(FormProcedureCategoryComponent, {
      context: {
        title: 'Editar categoria del procedimiento',
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

  DeleteConfirmProcedureCategory(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteProcedureCategory.bind(this),
      },
    });
  }

  DeleteProcedureCategory(data) {
    return this.procedureCategoryS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}
