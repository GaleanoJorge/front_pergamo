import { Component, OnInit, ViewChild } from '@angular/core';
import { CompanyTaxesService } from '../../../business-controller/company-taxes.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormCompanyTaxesComponent } from './form-company-taxes/form-company-taxes.component';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';


@Component({
  selector: 'ngx-company-taxes',
  templateUrl: './company-taxes.component.html',
  styleUrls: ['./company-taxes.component.scss']
})
export class CompanyTaxesComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Impuestos';
  public subtitle: string = 'Gestión';
  public headerFields: any[] = ['ID', 'Compañia'];
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
        title: 'Acciones',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
            'edit': this.EditCompanyTaxes.bind(this),
            'delete': this.DeleteConfirmCompanyTaxes.bind(this),
          };
        },
        renderComponent: ActionsComponent,
      },
      id: {
        title: this.headerFields[0],
        type: 'string',
      },
      company_id: {
        title: this.headerFields[1],
        type: 'string',
      },
    },
  };

  public routes = [
    {
      name: 'Impuestos',
      route: '../../setting/company-taxes',
    },
  ];

  constructor(
    private companyFiscalS: CompanyTaxesService,
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

  NewCompanyTaxes() {
    this.dialogFormService.open(FormCompanyTaxesComponent, {
      context: {
        title: 'Crear nuevo impuesto',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditCompanyTaxes(data) {
    this.dialogFormService.open(FormCompanyTaxesComponent, {
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

  DeleteConfirmCompanyTaxes(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteCompanyTaxes.bind(this),
      },
    });
  }

  DeleteCompanyTaxes(data) {
    return this.companyFiscalS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}
