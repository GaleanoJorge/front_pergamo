import { Component, OnInit, ViewChild } from '@angular/core';
import { CompanyTaxesService } from '../../../business-controller/company-taxes.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormCompanyTaxesComponent } from './form-company-taxes/form-company-taxes.component';
import { ActionsComponentEditDelete } from '../company-mail/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { ActivatedRoute } from '@angular/router';
import { CompanyService } from '../../../business-controller/company.service';


@Component({
  selector: 'ngx-company-taxes',
  templateUrl: './company-taxes.component.html',
  styleUrls: ['./company-taxes.component.scss']
})
export class CompanyTaxesComponent implements OnInit {

  public isSubmitted = false;
  public entity: string;

  public messageError: string = null;
  public title: string = 'Impuestos';
  public subtitle: string = 'Gestión';
  public headerFields: any[] = ['ID', 'Compañia'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}`;
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
            'edit': this.EditCompanyTaxes.bind(this),
            'delete': this.DeleteConfirmCompanyTaxes.bind(this),
          };
        },
        renderComponent: ActionsComponentEditDelete,
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


  constructor(
    private route: ActivatedRoute,
    private companyFiscalS: CompanyTaxesService,
    private toastrService: NbToastrService,
    private dialogFormService: NbDialogService,
    private deleteConfirmService: NbDialogService,
    private companyS: CompanyService,
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
        name: 'Impuestos de la compañia',
        route: '../../company-taxes/' + this.company_id,
      },
    ];

    await this.companyS.GetCollection().then(x =>{
      this.companies = x;
    });
    var element = this.companies.find(item => item.id == this.company_id);
    this.title = 'Correos electronicos de la empresa: ' + element.name;

  }

  RefreshData() {

    this.table.refresh();
  }

  NewCompanyTaxes() {
    this.dialogFormService.open(FormCompanyTaxesComponent, {
      context: {
        title: 'Crear nuevo impuesto',
        saved: this.RefreshData.bind(this),
        company_id: this.company_id,
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
