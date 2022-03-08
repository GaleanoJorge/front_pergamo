import { Component, OnInit, ViewChild } from '@angular/core';
import { MeasurementUnitsService } from '../../../business-controller/measurement-units.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormMeasurementUnitsComponent } from './form-measurement-units/form-measurement-units.component';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';


@Component({
  selector: 'ngx-measurement-units',
  templateUrl: './measurement-units.component.html',
  styleUrls: ['./measurement-units.component.scss']
})
export class MeasurementUnitsComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Unidades de medida';
  public subtitle: string = 'Gestión';
  public headerFields: any[] = ['ID', 'Código', 'Nombre'];
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
        title: 'Acciones',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
            'edit': this.EditMeasurementUnits.bind(this),
            'delete': this.DeleteConfirmMeasurementUnits.bind(this),
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
    },
  };

  public routes = [
    {
      name: 'Unidades de medida',
      route: '../../setting/measurement-units',
    },
  ];

  constructor(
    private MeasurementUnitsS: MeasurementUnitsService,
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

  NewMeasurementUnits() {
    this.dialogFormService.open(FormMeasurementUnitsComponent, {
      context: {
        title: 'Crear nueva unidades de medida',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditMeasurementUnits(data) {
    this.dialogFormService.open(FormMeasurementUnitsComponent, {
      context: {
        title: 'Editar unidades de medida',
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

  DeleteConfirmMeasurementUnits(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteMeasurementUnits.bind(this),
      },
    });
  }

  DeleteMeasurementUnits(data) {
    return this.MeasurementUnitsS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}
