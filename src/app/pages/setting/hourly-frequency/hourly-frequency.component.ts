import { Component, OnInit, ViewChild } from '@angular/core';
import { HourlyFrequencyService } from '../../../business-controller/hourly-frequency.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormHourlyFrequencyComponent } from './form-hourly-frequency/form-hourly-frequency.component';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';


@Component({
  selector: 'ngx-hourly-frequency',
  templateUrl: './hourly-frequency.component.html',
  styleUrls: ['./hourly-frequency.component.scss']
})
export class HourlyFrequencyComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Frecuencia Horaria';
  public subtitle: string = 'Gestión';
  public headerFields: any[] = ['ID','Valor','Nombre'];
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
            'edit': this.EditHourlyFrequency.bind(this),
            'delete': this.DeleteConfirmHourlyFrequency.bind(this),
          };
        },
        renderComponent: ActionsComponent,
      },
      id: {
        title: this.headerFields[0],
        type: 'string',
      },
      value: {
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
      name: 'Frecuencia Horaria',
      route: '../../setting/hourly-frequency',
    },
  ];

  constructor(
    private HourlyFrequencyS: HourlyFrequencyService,
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

  NewFrequency() {
    this.dialogFormService.open(FormHourlyFrequencyComponent, {
      context: {
        title: 'Crear nueva Frecuencia Horaria',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditHourlyFrequency(data) {
    this.dialogFormService.open(FormHourlyFrequencyComponent, {
      context: {
        title: 'Editar Frecuencia Horaria',
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

  DeleteConfirmHourlyFrequency(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteHourlyFrequency.bind(this),
      },
    });
  }

  DeleteHourlyFrequency(data) {
    return this.HourlyFrequencyS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}
