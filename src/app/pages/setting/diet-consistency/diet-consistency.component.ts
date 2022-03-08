import { Component, OnInit, ViewChild } from '@angular/core';
import { DietConsistencyService } from '../../../business-controller/diet-consistency.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormDietConsistencyComponent } from './form-diet-consistency/form-diet-consistency.component';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';

@Component({
  selector: 'ngx-diet-consistency',
  templateUrl: './diet-consistency.component.html',
  styleUrls: ['./diet-consistency.component.scss']
})
export class DietConsistencyComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'CONSISTENCIA DE DIETAS';
  public subtitle: string = 'CONSISTENCIA';
  public headerFields: any[] = ['ID', 'NOMBRE'];
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
        title: 'ACCIONES',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
            'edit': this.EditDietConsistency.bind(this),
            'delete': this.DeleteConfirmDietConsistency.bind(this),
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
      name: 'Consistencia de dietas',
      route: '../../setting/diet-consistency',
    },
  ];

  constructor(
    private DietConsistencyS: DietConsistencyService,
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

  NewDietConsistency() {
    this.dialogFormService.open(FormDietConsistencyComponent, {
      context: {
        title: 'Crear nueva consistencia de dietas',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditDietConsistency(data) {
    this.dialogFormService.open(FormDietConsistencyComponent, {
      context: {
        title: 'Editar consistencia de dietas',
        data,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  DeleteConfirmDietConsistency(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteDietConsistency.bind(this),
      },
    });
  }

  DeleteDietConsistency(data) {
    return this.DietConsistencyS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}
