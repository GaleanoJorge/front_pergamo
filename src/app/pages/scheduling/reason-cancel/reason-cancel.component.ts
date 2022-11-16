import { Component, OnInit, ViewChild } from '@angular/core';
import { NonWorkingDaysService } from '../../../business-controller/non-working-days.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormReasonCancelComponent } from './form-reason-cancel/form-reason-cancel.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { ActionsComponent } from '../../setting/sectional-council/actions.component';
import { CurrencyPipe } from '@angular/common';
import { CopayParametersService } from '../../../business-controller/copay-parameters.service';
import { StatusFieldComponent } from '../copay_category/status-field.component';
import { FormConfirmDisabledComponent } from '../copay_category/form-confirm-disabled/form-confirm-disabled.component';
import { ReasonCancelService } from '../../../business-controller/reason-cancel.service';

@Component({
  selector: 'ngx-reason-cancel',
  templateUrl: './reason-cancel.component.html',
  styleUrls: ['./reason-cancel.component.scss'],
})
export class ReasonCancelComponent implements OnInit {
  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Motivos de cancelación';
  public subtitle: string = 'Gestión';
  public headerFields: any[] = [
    'ID',
    'Nombre',
    'Estado',
  ];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[1]}, ${this.headerFields[2]}`;
  public icon: string = 'nb-star';
  public data = [];
  public dialog;

  @ViewChild(BaseTableComponent) table: BaseTableComponent;

  public settings = {
    columns: {
      actions: {
        title: 'Acciones',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            data: row,
            edit: this.EditNonWorkingDays.bind(this),
            delete: this.DeleteConfirmNonWorkingDays.bind(this),
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
      status_id: {
        title: this.headerFields[2],
        type: 'custom',
        width: '10%',
        valuePrepareFunction: (value, row) => {
          return {
            data: row,
            changeState: this.ConfirmDisabled.bind(this),
          };
        },
        renderComponent: StatusFieldComponent,
      },
    },
  };

  public routes = [
    {
      name: 'Cuotas moderadoras y copagos',
      route: '../../scheduling/non-working-days',
    },
  ];

  constructor(
    private NonWorkingDaysS: NonWorkingDaysService,
    private toastrService: NbToastrService,
    private currency: CurrencyPipe,
    private dialogFormService: NbDialogService,
    private CopayParametersS: CopayParametersService,
    private ReasonCancelS: ReasonCancelService,
    private deleteConfirmService: NbDialogService
  ) {}

  ngOnInit(): void {}

  RefreshData() {
    this.table.refresh();
  }

  NewCopayParameters() {
    this.dialogFormService.open(FormReasonCancelComponent, {
      context: {
        title: 'Crear nuevo mptivo de cancelación',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditNonWorkingDays(data) {
    this.dialogFormService.open(FormReasonCancelComponent, {
      context: {
        title: 'Editar motivo de cancelación',
        data,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  DeleteConfirmNonWorkingDays(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteTypeProfessional.bind(this),
      },
    });
  }

  DeleteTypeProfessional(data) {
    return this.ReasonCancelS.Delete(data.id)
      .then((x) => {
        this.table.refresh();
        return Promise.resolve(x.message);
      })
      .catch((x) => {
        throw x;
      });
  }

  ConfirmDisabled(data) {
    this.dialogFormService.open(FormConfirmDisabledComponent, {
      context: {
        data: data,
        desable_cancel: this.ChangeState.bind(this),
      },
    });
  }

  ChangeState(data) {
    this.ReasonCancelS
      .ChangeStatus(data.id, data.status_id == 1 ? 2 : 1)
      .then((x) => {
        this.toastrService.success('', x.message);
        this.RefreshData();
      })
      .catch((x) => {
        // this.toastrService.danger(x.message);
      });
  }
}
