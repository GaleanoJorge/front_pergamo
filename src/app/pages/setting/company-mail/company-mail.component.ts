import { Component, OnInit, ViewChild } from '@angular/core';
import { CompanyMailService } from '../../../business-controller/company-mail.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormCompanyMailComponent } from './form-company-mail/form-company-mail.component';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';


@Component({
  selector: 'ngx-company-mail',
  templateUrl: './company-mail.component.html',
  styleUrls: ['./company-mail.component.scss']
})
export class CompanyMailComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Correos de Empresa';
  public subtitle: string = 'Gestión';
  public headerFields: any[] = ['ID', 'Empresa','Correo','Ciudad','Documentos contables'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}, ${this.headerFields[2]}`;
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
            'edit': this.EditCompanyMail.bind(this),
            'delete': this.DeleteConfirmCompanyMail.bind(this),
          };
        },
        renderComponent: ActionsComponent,
      },
      id: {
        title: this.headerFields[0],
        type: 'string',
      },
      cma_company: {
        title: this.headerFields[1],
        type: 'string',
      },
      cma_Mail: {
        title: this.headerFields[2],
        type: 'string',
      },
      cma_city: {
        title: this.headerFields[3],
        type: 'string',
      },
      cma_document: {
        title: this.headerFields[4],
        type: 'string',
      },
    },
  };

  public routes = [
    {
      name: 'Correos de empresa',
      route: '../../setting/company-mail',
    },
  ];

  constructor(
    private companyMailS: CompanyMailService,
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

  NewCompanyMail() {
    this.dialogFormService.open(FormCompanyMailComponent, {
      context: {
        title: 'Crear nuevo correo de empresa',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditCompanyMail(data) {
    this.dialogFormService.open(FormCompanyMailComponent, {
      context: {
        title: 'Editar correo de empresa',
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

  DeleteConfirmCompanyMail(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteCompanyMail.bind(this),
      },
    });
  }

  DeleteCompanyMail(data) {
    return this.companyMailS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}
