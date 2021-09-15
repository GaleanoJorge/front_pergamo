import { Component, OnInit, ViewChild } from '@angular/core';
import { TaxesService } from '../../../business-controller/taxes.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormTaxesComponent } from './form-taxes/form-taxes.component';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';


@Component({
  selector: 'ngx-taxes',
  templateUrl: './taxes.component.html',
  styleUrls: ['./taxes.component.scss']
})
export class TaxesComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Impuestos';
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
            'edit': this.EditTaxes.bind(this),
            'delete': this.DeleteConfirmTaxes.bind(this),
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
      name: 'Impuestos',
      route: '../../setting/taxes',
    },
  ];

  constructor(
    private TaxesS: TaxesService,
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

  NewTaxes() {
    this.dialogFormService.open(FormTaxesComponent, {
      context: {
        title: 'Crear nuevo impuesto',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditTaxes(data) {
    this.dialogFormService.open(FormTaxesComponent, {
      context: {
        title: 'Editar impuesto',
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

  DeleteConfirmTaxes(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteTaxes.bind(this),
      },
    });
  }

  DeleteTaxes(data) {
    return this.TaxesS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}
