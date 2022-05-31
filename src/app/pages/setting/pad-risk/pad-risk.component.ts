import { Component, OnInit, ViewChild } from '@angular/core';
import { PadRiskService } from '../../../business-controller/pad-risk.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormPadRiskComponent } from './form-pad-risk/form-pad-risk.component';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { StatusFieldComponent } from '../../components/status-field/status-field.component';

@Component({
  selector: 'ngx-pad-risk',
  templateUrl: './pad-risk.component.html',
  styleUrls: ['./pad-risk.component.scss']
})
export class PadRiskComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'TARIFA POR LOCALIZACIÓN';
  public subtitle: string = 'TARIFAS';
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
            'edit': this.EditPadRisk.bind(this),
            'delete': this.DeleteConfirmPadRisk.bind(this),
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
      name: 'Tatifas por localización',
      route: '../../setting/pad-risk',
    },
  ];

  constructor(
    private PadRiskS: PadRiskService,
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

  NewPadRisk() {
    this.dialogFormService.open(FormPadRiskComponent, {
      context: {
        title: 'Crear nuevo tarifa',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  ChangeState(data) {
    this.PadRiskS.Update({
      id: data.id,
      name: data.name,
      status_id: 2,
    }).then((x) => {
        this.toastrService.success('', x.message);
        this.RefreshData();
    }).catch((x) => {
        // this.toastrService.danger(x.message);
    });
}

  EditPadRisk(data) {
    this.dialogFormService.open(FormPadRiskComponent, {
      context: {
        title: 'Editar tarifa',
        data,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  DeleteConfirmPadRisk(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeletePadRisk.bind(this),
      },
    });
  }

  DeletePadRisk(data) {
    return this.PadRiskS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}
