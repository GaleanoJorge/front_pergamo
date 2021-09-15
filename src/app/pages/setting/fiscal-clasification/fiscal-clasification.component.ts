import { Component, OnInit, ViewChild } from '@angular/core';
import { FiscalClasificationService } from '../../../business-controller/fiscal-clasification.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormFiscalClasificationComponent } from './form-fiscal-clasification/form-fiscal-clasification.component';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';


@Component({
  selector: 'ngx-fiscal-clasification',
  templateUrl: './fiscal-clasification.component.html',
  styleUrls: ['./fiscal-clasification.component.scss']
})
export class FiscalClasificationComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Clasificación Fiscal';
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
            'edit': this.EditFiscalClasification.bind(this),
            'delete': this.DeleteConfirmFiscalClasification.bind(this),
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
      name: 'Clasificación Fiscal',
      route: '../../setting/fiscal-clasification',
    },
  ];

  constructor(
    private FiscalClasificationS: FiscalClasificationService,
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

  NewFiscalClasification() {
    this.dialogFormService.open(FormFiscalClasificationComponent, {
      context: {
        title: 'Crear nuevo tipo de clasificación Fiscal',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditFiscalClasification(data) {
    this.dialogFormService.open(FormFiscalClasificationComponent, {
      context: {
        title: 'Editar tipo de clasificación Fiscal',
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

  DeleteConfirmFiscalClasification(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteFiscalClasification.bind(this),
      },
    });
  }

  DeleteFiscalClasification(data) {
    return this.FiscalClasificationS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}
