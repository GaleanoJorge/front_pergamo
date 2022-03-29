import { Component, OnInit, ViewChild } from '@angular/core';
import { ConsumptionUnitService } from '../../../business-controller/consumption-unit.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormConsumptionUnitComponent } from './form-consumption-unit/form-consumption-unit.component';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';


@Component({
  selector: 'ngx-consumption-unit',
  templateUrl: './consumption-unit.component.html',
  styleUrls: ['./consumption-unit.component.scss']
})
export class ConsumptionUnitComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Unidad de consumo';
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
        title: '',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
            'edit': this.EditConsumptionUnit.bind(this),
            'delete': this.DeleteConfirmConsumptionUnit.bind(this),
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
      name: 'Unidad de consumo',
      route: '../../setting/consumption-unit',
    },
  ];

  constructor(
    private ConsumptionUnitS: ConsumptionUnitService,
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

  NewConsumptionUnit() {
    this.dialogFormService.open(FormConsumptionUnitComponent, {
      context: {
        title: 'Crear nueva Unidad de consumo',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditConsumptionUnit(data) {
    this.dialogFormService.open(FormConsumptionUnitComponent, {
      context: {
        title: 'Editar Unidad de consumo',
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

  DeleteConfirmConsumptionUnit(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteConsumptionUnit.bind(this),
      },
    });
  }

  DeleteConsumptionUnit(data) {
    return this.ConsumptionUnitS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}
