import { Component, OnInit, ViewChild } from '@angular/core';
import { CompanyCategoryService } from '../../../business-controller/company-category.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormCompanyCategoryComponent } from './form-company-category/form-company-category.component';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';


@Component({
  selector: 'ngx-company-category',
  templateUrl: './company-category.component.html',
  styleUrls: ['./company-category.component.scss']
})
export class CompanyCategoryComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Tipo de categoria Empresa';
  public subtitle: string = 'Gestión';
  public headerFields: any[] = ['ID', 'Nombre'];
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
            'edit': this.EditCompanyCategory.bind(this),
            'delete': this.DeleteConfirmCompanyCategory.bind(this),
          };
        },
        renderComponent: ActionsComponent,
      },
      id: {
        title: this.headerFields[0],
        type: 'string',
      },
      coc_name: {
        title: this.headerFields[1],
        type: 'string',
      },
    },
  };

  public routes = [
    {
      name: 'Tipo de categoria empresa',
      route: '../../setting/company-category',
    },
  ];

  constructor(
    private companyCategoryS: CompanyCategoryService,
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

  NewCompanyCategory() {
    this.dialogFormService.open(FormCompanyCategoryComponent, {
      context: {
        title: 'Crear nuevo tipo de categoria de empresa',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditCompanyCategory(data) {
    this.dialogFormService.open(FormCompanyCategoryComponent, {
      context: {
        title: 'Editar tipo de categoria de empresa',
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

  DeleteConfirmCompanyCategory(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteCompanyCategory.bind(this),
      },
    });
  }

  DeleteCompanyCategory(data) {
    return this.companyCategoryS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}
