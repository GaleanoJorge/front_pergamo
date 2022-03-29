import { Component, OnInit, ViewChild } from '@angular/core';
import { FiscalCharacteristicService } from '../../../business-controller/fiscal-characteristic.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormFiscalCharacteristicComponent } from './form-fiscal-characteristic/form-fiscal-characteristic.component';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';


@Component({
  selector: 'ngx-fiscal-characteristic',
  templateUrl: './fiscal-characteristic.component.html',
  styleUrls: ['./fiscal-characteristic.component.scss']
})
export class FiscalCharacteristicComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Responsabilidad Fiscal';
  public subtitle: string = 'Gestión';
  public headerFields: any[] = ['ID','Código' ,'Nombre'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]},${this.headerFields[2]}`;
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
            'edit': this.EditFiscalCharacteristic.bind(this),
            'delete': this.DeleteConfirmFiscalCharacteristic.bind(this),
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
      name: 'Responsabilidad Fiscal',
      route: '../../setting/fiscal-characteristic',
    },
  ];

  constructor(
    private FiscalCharacteristicS: FiscalCharacteristicService,
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

  NewFiscalCharacteristic() {
    this.dialogFormService.open(FormFiscalCharacteristicComponent, {
      context: {
        title: 'Crear nuevo tipo de Responsabilidad Fiscal',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditFiscalCharacteristic(data) {
    this.dialogFormService.open(FormFiscalCharacteristicComponent, {
      context: {
        title: 'Editar tipo de Responsabilidad Fiscal',
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

  DeleteConfirmFiscalCharacteristic(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteFiscalCharacteristic.bind(this),
      },
    });
  }

  DeleteFiscalCharacteristic(data) {
    return this.FiscalCharacteristicS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}
