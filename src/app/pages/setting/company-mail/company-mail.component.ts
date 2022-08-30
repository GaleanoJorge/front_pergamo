import { Component, OnInit, ViewChild } from '@angular/core';
import { CompanyMailService } from '../../../business-controller/company-mail.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormCompanyMailComponent } from './form-company-mail/form-company-mail.component';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { ActivatedRoute } from '@angular/router';
import { CompanyService } from '../../../business-controller/company.service';
import { ActionsComponentEditDelete } from './actions.component';
import { Location } from '@angular/common';


@Component({
  selector: 'ngx-company-mail',
  templateUrl: './company-mail.component.html',
  styleUrls: ['./company-mail.component.scss']
})
export class CompanyMailComponent implements OnInit {

  public isSubmitted = false;
  public entity: string;
  
  public messageError: string = null;
  public title: string = 'Correos de Empresa';
  public subtitle: string = 'Gestión';
  public headerFields: any[] = ['ID', 'Empresa','Correo','Ciudad','Documentos contables'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}, ${this.headerFields[2]}`;
  public icon: string = 'nb-star';
  public routes = [];
  public data = [];

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
            'edit': this.EditCompanyMail.bind(this),
            'delete': this.DeleteConfirmCompanyMail.bind(this),
          };
        },
        renderComponent: ActionsComponentEditDelete,
      },
      id: {
        title: this.headerFields[0],
        type: 'string',
      },
      mail: {
        title: this.headerFields[2],
        type: 'string',
      },
      city: {
        title: this.headerFields[3],
        type: 'string',
        valuePrepareFunction(value, row) {
         return row.region?.name;
        }
      },
      document: {
        title: this.headerFields[4],
        type: 'string',
        valuePrepareFunction(value, row) {
        return row.document?.name;
        }
      },
    },
  };

  constructor(
    private route: ActivatedRoute,
    private companyMailS: CompanyMailService,
    private toastrService: NbToastrService,
    private dialogFormService: NbDialogService,
    private deleteConfirmService: NbDialogService,
    private companyS: CompanyService,
    private location: Location,
  ) {
  }

  async ngOnInit() {
    if(this.route.snapshot.params.id){
      this.company_id = this.route.snapshot.params.id;
      this.entity = this.company_id ? 'company_mail/MailByCompany/' + this.company_id : 'company_mail';
    } else {
      this.entity = 'company_mail';
    }

    this.routes = [
      {
        name: 'Compañia',
        route: '../../company'
      },
      {
        name: 'Correos de empresa',
        route: '../../company-mail/' + this.company_id,
      },
    ];
    
    await this.companyS.GetCollection().then(x =>{
      this.companies = x;
    });
    var element = this.companies.find(item => item.id == this.company_id);
    this.title = 'Correos electronicos de la empresa: ' + element.name;

  }

  back() {
    this.location.back();

 }

  RefreshData() {

    this.table.refresh();
  }

  NewCompanyMail() {
    this.dialogFormService.open(FormCompanyMailComponent, {
      context: {
        title: 'Crear nuevo correo de empresa',
        saved: this.RefreshData.bind(this),
        company_id: this.company_id,
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
