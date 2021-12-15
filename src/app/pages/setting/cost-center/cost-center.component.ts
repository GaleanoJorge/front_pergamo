import { Component, OnInit, ViewChild } from '@angular/core';
import { CostCenterService } from '../../../business-controller/cost-center.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormCostCenterComponent } from './form-cost-center/form-cost-center.component';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';


@Component({
  selector: 'ngx-cost-center',
  templateUrl: './cost-center.component.html',
  styleUrls: ['./cost-center.component.scss']
})
export class CostCenterComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Centro de costos';
  public subtitle: string = 'Gestión';
  public headerFields: any[] = ['ID','Nombre','Codigo'];
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
            'edit': this.EditCostCenter.bind(this),
            'delete': this.DeleteConfirmCostCenter.bind(this),
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
      code: {
        title: this.headerFields[2],
        type: 'string',
      },
    },
  };

  public routes = [
    {
      name: 'Centro de costos',
      route: '../../setting/cost-center',
    },
  ];

  constructor(
    private CostCenterS: CostCenterService,
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

  NewCostCenter() {
    this.dialogFormService.open(FormCostCenterComponent, {
      context: {
        title: 'Crear nueva ruta de admisión',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditCostCenter(data) {
    this.dialogFormService.open(FormCostCenterComponent, {
      context: {
        title: 'Editar centro de costos',
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

  DeleteConfirmCostCenter(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteCostCenter.bind(this),
      },
    });
  }

  DeleteCostCenter(data) {
    return this.CostCenterS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}
