import { Component, OnInit, ViewChild } from '@angular/core';
import { CompanyFiscalService } from '../../../business-controller/company-fiscal.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormCompanyFiscalComponent } from './form-company-fiscal/form-company-fiscal.component';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';


@Component({
  selector: 'ngx-company-fiscal',
  templateUrl: './company-fiscal.component.html',
  styleUrls: ['./company-fiscal.component.scss']
})
export class CompanyFiscalComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Características Fiscales';
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
        title: '',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
            'edit': this.EditCompanyFiscal.bind(this),
            'delete': this.DeleteConfirmCompanyFiscal.bind(this),
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
      name: 'Características Fiscales',
      route: '../../setting/company-fiscal',
    },
  ];

  constructor(
    private companyFiscalS: CompanyFiscalService,
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

  NewCompanyFiscal() {
    this.dialogFormService.open(FormCompanyFiscalComponent, {
      context: {
        title: 'Crear nueva Característica Fiscal',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditCompanyFiscal(data) {
    this.dialogFormService.open(FormCompanyFiscalComponent, {
      context: {
        title: 'Editar Característica Fiscal',
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

  DeleteConfirmCompanyFiscal(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteCompanyFiscal.bind(this),
      },
    });
  }

  DeleteCompanyFiscal(data) {
    return this.companyFiscalS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}
