import { Component, OnInit, ViewChild } from '@angular/core';
import { ProcedurePurposeService } from '../../../business-controller/procedure-purpose.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormProcedurePurposeComponent } from './form-procedure-purpose/form-procedure-purpose.component';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';


@Component({
  selector: 'ngx-procedure-purpose',
  templateUrl: './procedure-purpose.component.html',
  styleUrls: ['./procedure-purpose.component.scss']
})
export class ProcedurePurposeComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Proposito del procedimiento';
  public subtitle: string = 'Gestión';
  public headerFields: any[] = ['ID', 'Codigo', 'Nombre'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}, ${this.headerFields[2]}`;
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
            'edit': this.EditProcedurePurpose.bind(this),
            'delete': this.DeleteConfirmProcedurePurpose.bind(this),
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
     }  
    
  };

  public routes = [
    {
      name: 'Proposito del procedimiento',
      route: '../../setting/procedure-purpose',
    },
  ];

  constructor(
    private procedurePurposeS: ProcedurePurposeService,
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

  NewProcedurePurpose() {
    this.dialogFormService.open(FormProcedurePurposeComponent, {
      context: {
        title: 'Crear nuevo proposito para el procedimiento',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditProcedurePurpose(data) {
    this.dialogFormService.open(FormProcedurePurposeComponent, {
      context: {
        title: 'Editar proposito del procedimiento',
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

  DeleteConfirmProcedurePurpose(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteProcedurePurpose.bind(this),
      },
    });
  }

  DeleteProcedurePurpose(data) {
    return this.procedurePurposeS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}
