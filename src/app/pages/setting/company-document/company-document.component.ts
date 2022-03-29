import { Component, OnInit, ViewChild } from '@angular/core';
import { CompanyDocumentService } from '../../../business-controller/company-document.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormCompanyDocumentComponent } from './form-company-document/form-company-document.component';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';


@Component({
  selector: 'ngx-company-document',
  templateUrl: './company-document.component.html',
  styleUrls: ['./company-document.component.scss']
})
export class CompanyDocumentComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Documentos de Empresa';
  public subtitle: string = 'Gestión';
  public headerFields: any[] = ['ID', 'Empresa','Docuemnto'];
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
            'edit': this.EditCompanyDocument.bind(this),
            'delete': this.DeleteConfirmCompanyDocument.bind(this),
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
      document_id: {
        title: this.headerFields[2],
        type: 'string',
      },
    },
  };

  public routes = [
    {
      name: 'Documentos de empresa',
      route: '../../setting/company-document',
    },
  ];

  constructor(
    private companyDocumentS: CompanyDocumentService,
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

  NewCompanyDocument() {
    this.dialogFormService.open(FormCompanyDocumentComponent, {
      context: {
        title: 'Crear nuevo documento de empresa',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditCompanyDocument(data) {
    this.dialogFormService.open(FormCompanyDocumentComponent, {
      context: {
        title: 'Editar documento de empresa',
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

  DeleteConfirmCompanyDocument(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteCompanyDocument.bind(this),
      },
    });
  }

  DeleteCompanyDocument(data) {
    return this.companyDocumentS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}
