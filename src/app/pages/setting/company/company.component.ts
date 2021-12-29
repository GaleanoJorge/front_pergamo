import { Component, OnInit, ViewChild } from '@angular/core';
import { CompanyService } from '../../../business-controller/company.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormCompanyComponent } from './form-company/form-company.component';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';


@Component({
  selector: 'ngx-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Compañia';
  public subtitle: string = 'Gestión';
  public headerFields: any[] = ['ID', 'Identificación', 'Verificación', 'Nombre', 'Administrador'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]},${this.headerFields[2]},${this.headerFields[3]}, ${this.headerFields[4]}`;
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
            'edit': this.EditCompany.bind(this),
            'delete': this.DeleteConfirmCompany.bind(this),
          };
        },
        renderComponent: ActionsComponent,
      },
      id: {
        title: this.headerFields[0],
        type: 'string',
      },
      identification: {
        title: this.headerFields[1],
        type: 'string',
      },
      verification: {
        title: this.headerFields[2],
        type: 'string',
      },
      name: {
        title: this.headerFields[3],
        type: 'string',
      },
      administrator: {
        title: this.headerFields[4],
        type: 'string',
      },
    },
  };

  public routes = [
    {
      name: 'Compañias',
      route: '../../setting/company',
    },
  ];

  constructor(
    private companyS: CompanyService,
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

  NewCompany() {
    this.dialogFormService.open(FormCompanyComponent, {
      context: {
        title: 'Crear compañias',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditCompany(data) {
    this.dialogFormService.open(FormCompanyComponent, {
      context: {
        title: 'Editar compañias',
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

  DeleteConfirmCompany(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteCompany.bind(this),
      },
    });
  }

  DeleteCompany(data) {
    return this.companyS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}
