import { Component, OnInit, ViewChild } from '@angular/core';
import { NonWorkingDaysService } from '../../../business-controller/non-working-days.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormCopayCategoryComponent } from './form-copay_category/form-copay_category.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { ActionsComponent } from '../../setting/sectional-council/actions.component';
import { CurrencyPipe } from '@angular/common';
import { StatusFieldComponent } from './status-field.component';
import { CopayParametersService } from '../../../business-controller/copay-parameters.service';
import { FormConfirmDisabledComponent } from './form-confirm-disabled/form-confirm-disabled.component';

@Component({
  selector: 'ngx-copay-category',
  templateUrl: './copay-category.component.html',
  styleUrls: ['./copay-category.component.scss'],
})
export class CopayCategoryComponent implements OnInit {
  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Categorias por copago';
  public subtitle: string = 'Gestión';
  public headerFields: any[] = [
    'ID',
    'Tipo de contrato',
    'Categoria',
    'Valor',
    'Estado',
  ];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}`;
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
      type_contract: {
        title: this.headerFields[1],
        type: 'string',
        valuePrepareFunction(value, row) {
          return value.name;
        },
      },
      category: {
        title: this.headerFields[2],
        type: 'string',
      },
      value: {
        title: this.headerFields[3],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return this.currency.transform(value);
        },
      },
      status_id: {
        title: this.headerFields[4],
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
    private deleteConfirmService: NbDialogService
  ) {}

  ngOnInit(): void {}

  RefreshData() {
    this.table.refresh();
  }

  NewCopayParameters() {
    this.dialogFormService.open(FormCopayCategoryComponent, {
      context: {
        title: 'Crear nueva tarifa',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditNonWorkingDays(data) {
    this.dialogFormService.open(FormCopayCategoryComponent, {
      context: {
        title: 'Editar tarifa',
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
    return this.NonWorkingDaysS.Delete(data.id)
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
        desable: this.ChangeState.bind(this),
      },
    });
  }

  ChangeState(data) {
    this.CopayParametersS
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
