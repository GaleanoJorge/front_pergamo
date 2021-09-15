import { Component, OnInit, ViewChild } from '@angular/core';
import { CompanyKindpersonService } from '../../../business-controller/company-kindperson.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormCompanyKindpersonComponent } from './form-company-kindperson/form-company-kindperson.component';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';


@Component({
  selector: 'ngx-company-kindperson',
  templateUrl: './company-kindperson.component.html',
  styleUrls: ['./company-kindperson.component.scss']
})
export class CompanyKindpersonComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Tipo de persona contable';
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
            'edit': this.EditCompanyKindperson.bind(this),
            'delete': this.DeleteConfirmCompanyKindperson.bind(this),
          };
        },
        renderComponent: ActionsComponent,
      },
      id: {
        title: this.headerFields[0],
        type: 'string',
      },
      cok_name: {
        title: this.headerFields[1],
        type: 'string',
      },
    },
  };

  public routes = [
    {
      name: 'Tipo de persona contable',
      route: '../../setting/company-kindperson',
    },
  ];

  constructor(
    private companyKindpersonS: CompanyKindpersonService,
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

  NewCompanyKindperson() {
    this.dialogFormService.open(FormCompanyKindpersonComponent, {
      context: {
        title: 'Crear nuevo tipo de persona contable',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditCompanyKindperson(data) {
    this.dialogFormService.open(FormCompanyKindpersonComponent, {
      context: {
        title: 'Editar tipo de persona contable',
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

  DeleteConfirmCompanyKindperson(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteCompanyKindperson.bind(this),
      },
    });
  }

  DeleteCompanyKindperson(data) {
    return this.companyKindpersonS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}
