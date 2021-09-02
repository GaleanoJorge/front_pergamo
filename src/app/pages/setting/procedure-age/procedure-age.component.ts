import { Component, OnInit, ViewChild } from '@angular/core';
import { ProcedureAgeService } from '../../../business-controller/procedure-age.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormProcedureAgeComponent } from './form-procedure-age/form-procedure-age.component';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';


@Component({
  selector: 'ngx-procedure-age',
  templateUrl: './procedure-age.component.html',
  styleUrls: ['./procedure-age.component.scss']
})
export class ProcedureAgeComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Edad del procedimiento';
  public subtitle: string = 'Gestión';
  public headerFields: any[] = ['ID', 'Nombre', 'Edad Inicial', 'Edad final'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]},${this.headerFields[2]},${this.headerFields[3]}`;
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
            'edit': this.EditProcedureAge.bind(this),
            'delete': this.DeleteConfirmProcedureAge.bind(this),
          };
        },
        renderComponent: ActionsComponent,
      },
      id: {
        title: this.headerFields[0],
        type: 'string',
      },
      pra_name: {
        title: this.headerFields[1],
        type: 'string',
      },
      pra_begin: {
        title: this.headerFields[2],
        type: 'string',
      },
      pra_end: {
        title: this.headerFields[3],
        type: 'string',
      },

    },
  };

  public routes = [
    {
      name: 'Edad del procedimiento',
      route: '../../setting/procedure_age',
    },
  ];

  constructor(
    private procedureAgeS: ProcedureAgeService,
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

  NewProcedureAge() {
    this.dialogFormService.open(FormProcedureAgeComponent, {
      context: {
        title: 'Crear nueva edad para el procedimiento',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditProcedureAge(data) {
    this.dialogFormService.open(FormProcedureAgeComponent, {
      context: {
        title: 'Editar edad del procedimiento',
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

  DeleteConfirmProcedureAge(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteProcedureAge.bind(this),
      },
    });
  }

  DeleteProcedureAge(data) {
    return this.procedureAgeS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}
