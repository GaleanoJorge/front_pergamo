import { Component, OnInit, ViewChild } from '@angular/core';
import { MinimumSalaryService } from '../../../business-controller/minimum-salary.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormMinimumSalaryComponent } from './form-minimum-salary/form-minimum-salary.component';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'ngx-minimum-salary',
  templateUrl: './minimum-salary.component.html',
  styleUrls: ['./minimum-salary.component.scss']
})
export class MinimumSalaryComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'SALARIO MÍNIMO MENSUAL LEGAL VIGENTE';
  public subtitle: string = 'SALARIOS';
  public headerFields: any[] = ['ID', 'VALOR', 'AÑO'];
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
            'edit': this.EditMinimumSalary.bind(this),
            'delete': this.DeleteConfirmMinimumSalary.bind(this),
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
        valuePrepareFunction: (value, row) => {
          return this.currency.transform(value);
        }
      },
      year: {
        title: this.headerFields[2],
        type: 'string',
      },
    },
  };

  public routes = [
    {
      name: 'Salario mínimo',
      route: '../../setting/minimum-salary',
    },
  ];

  constructor(
    private MinimumSalaryS: MinimumSalaryService,
    private toastrService: NbToastrService,
    private dialogFormService: NbDialogService,
    private deleteConfirmService: NbDialogService,
    private currency: CurrencyPipe,
  ) {
  }

  ngOnInit(): void {
  }

  RefreshData() {

    this.table.refresh();
  }

  NewMinimumSalary() {
    this.dialogFormService.open(FormMinimumSalaryComponent, {
      context: {
        title: 'Crear nuevo salario mínimo',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditMinimumSalary(data) {
    this.dialogFormService.open(FormMinimumSalaryComponent, {
      context: {
        title: 'Editar salario mínimo',
        data,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  DeleteConfirmMinimumSalary(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteMinimumSalary.bind(this),
      },
    });
  }

  DeleteMinimumSalary(data) {
    return this.MinimumSalaryS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}
