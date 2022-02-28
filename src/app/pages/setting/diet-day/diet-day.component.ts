import { Component, OnInit, ViewChild } from '@angular/core';
import { DietDayService } from '../../../business-controller/diet-day.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormDietDayComponent } from './form-diet-day/form-diet-day.component';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';

@Component({
  selector: 'ngx-diet-day',
  templateUrl: './diet-day.component.html',
  styleUrls: ['./diet-day.component.scss']
})
export class DietDayComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'DÍAS DE DIETAS';
  public subtitle: string = 'DÍAS';
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
          return {
            'data': row,
            'edit': this.EditDietDay.bind(this),
            'delete': this.DeleteConfirmDietDay.bind(this),
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
      name: 'Días de dietas',
      route: '../../setting/diet-day',
    },
  ];

  constructor(
    private DietDayS: DietDayService,
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

  NewDietDay() {
    this.dialogFormService.open(FormDietDayComponent, {
      context: {
        title: 'Crear nuevo día de dietas',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditDietDay(data) {
    this.dialogFormService.open(FormDietDayComponent, {
      context: {
        title: 'Editar día de dietas',
        data,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  DeleteConfirmDietDay(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteDietDay.bind(this),
      },
    });
  }

  DeleteDietDay(data) {
    return this.DietDayS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}
