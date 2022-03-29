import { Component, OnInit, ViewChild } from '@angular/core';
import { CompanyCiiuService } from '../../../business-controller/company-ciiu.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormCompanyCiiuComponent } from './form-company-ciiu/form-company-ciiu.component';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';


@Component({
  selector: 'ngx-company-ciiu',
  templateUrl: './company-ciiu.component.html',
  styleUrls: ['./company-ciiu.component.scss']
})
export class CompanyCiiuComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Actividades económicas';
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
            'edit': this.EditCompanyCiiu.bind(this),
            'delete': this.DeleteConfirmCompanyCiiu.bind(this),
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
      name: 'Actividades económicas',
      route: '../../setting/company-ciiu',
    },
  ];

  constructor(
    private companyCiiuS: CompanyCiiuService,
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

  NewCompanyCiiu() {
    this.dialogFormService.open(FormCompanyCiiuComponent, {
      context: {
        title: 'Crear nueva Actividad económica',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditCompanyCiiu(data) {
    this.dialogFormService.open(FormCompanyCiiuComponent, {
      context: {
        title: 'Editar Actividad económica',
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

  DeleteConfirmCompanyCiiu(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteCompanyCiiu.bind(this),
      },
    });
  }

  DeleteCompanyCiiu(data) {
    return this.companyCiiuS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}
