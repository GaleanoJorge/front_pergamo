import { Component, OnInit, ViewChild } from '@angular/core';
import { DietWeekService } from '../../../business-controller/diet-week.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormDietWeekComponent } from './form-diet-week/form-diet-week.component';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';

@Component({
  selector: 'ngx-diet-week',
  templateUrl: './diet-week.component.html',
  styleUrls: ['./diet-week.component.scss']
})
export class DietWeekComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'SEMANAS DE DIETAS';
  public subtitle: string = 'SEMANAS';
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
        title: 'Acciones',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
            'edit': this.EditDietWeek.bind(this),
            'delete': this.DeleteConfirmDietWeek.bind(this),
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
      name: 'Semanas de dietas',
      route: '../../setting/diet-week',
    },
  ];

  constructor(
    private DietWeekS: DietWeekService,
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

  NewDietWeek() {
    this.dialogFormService.open(FormDietWeekComponent, {
      context: {
        title: 'Crear nueva semana de dietas',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditDietWeek(data) {
    this.dialogFormService.open(FormDietWeekComponent, {
      context: {
        title: 'Editar semana de dietas',
        data,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  DeleteConfirmDietWeek(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteDietWeek.bind(this),
      },
    });
  }

  DeleteDietWeek(data) {
    return this.DietWeekS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}
