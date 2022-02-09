import { Component, OnInit, ViewChild } from '@angular/core';
import { CompanyDocumentService } from '../../../business-controller/company-document.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormCompanyDocumentComponent } from './form-company-document/form-company-document.component';
import { ActionsComponentEditDelete } from '../company-mail/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { ActivatedRoute } from '@angular/router';
import { CompanyService } from '../../../business-controller/company.service';
import { ActionsCDComponent } from './actionsCD.component';

@Component({
  selector: 'ngx-company-document',
  templateUrl: './company-document.component.html',
  styleUrls: ['./company-document.component.scss']
})
export class CompanyDocumentComponent implements OnInit {

  public isSubmitted = false;
  public entity: string;

  public messageError: string = null;
  public title: string = 'Documentos de Empresa';
  public subtitle: string = 'Gestión';
  public headerFields: any[] = ['ID', 'Empresa','Documento', 'Archivo'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}, ${this.headerFields[2]}`;
  public icon: string = 'nb-star';
  public data = [];
  public routes = [];

  public company_id: number;
  public companies;

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
            'edit': this.EditCompanyDocument.bind(this),
            'delete': this.DeleteConfirmCompanyDocument.bind(this),
          };
        },
        renderComponent: ActionsComponentEditDelete,
      },
      id: {
        title: this.headerFields[0],
        type: 'string',
      },
      document_id: {
        title: this.headerFields[2],
        type: 'string',
        
      },
      file: {
        title: this.headerFields[3],
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
          };
        },
        renderComponent: ActionsCDComponent,
      }
    },
  };


  constructor(
    private route: ActivatedRoute,
    private companyDocumentS: CompanyDocumentService,
    private toastrService: NbToastrService,
    private dialogFormService: NbDialogService,
    private deleteConfirmService: NbDialogService,
    private companyS: CompanyService,
  ) {
  }

  async ngOnInit() {
    if(this.route.snapshot.params.id){
      this.company_id = this.route.snapshot.params.id;
      this.entity = this.company_id ? 'company_document/DocumentByCompany/' + this.company_id : 'company_document';
    } else {
      this.entity = 'company_document';
    }

    this.routes = [
      {
        name: 'Compañia',
        route: '../../company'
      },
      {
        name: 'Documentos de empresa',
        route: '../../company-document/' + this.company_id,
      },
    ];

    await this.companyS.GetCollection().then(x =>{
      this.companies = x;
    });
    var element = this.companies.find(item => item.id == this.company_id);
    this.title = 'Documentos de la empresa: ' + element.name;
  }

  RefreshData() {

    this.table.refresh();
  }

  NewCompanyDocument() {
    this.dialogFormService.open(FormCompanyDocumentComponent, {
      context: {
        title: 'Crear nuevo documento de empresa',
        saved: this.RefreshData.bind(this),
        company_id: this.company_id,
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
