import {Component, OnInit, ViewChild} from '@angular/core';
import {OfficeService} from '../../../business-controller/office.service';
import {StatusFieldComponent} from '.././sectional-council/status-field.component';
import {NbToastrService, NbDialogService} from '@nebular/theme';
import {FormOfficeComponent} from './form-office/form-office.component';
import {ActionsComponent} from '.././sectional-council/actions.component';
import {ConfirmDialogComponent} from '../../components/confirm-dialog/confirm-dialog.component';
import {BaseTableComponent} from '../../components/base-table/base-table.component';

@Component({
  selector: 'ngx-office',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.scss']
})
export class OfficeComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Despacho';
  public subtitle: string = 'Gestión';
  public headerFields: any[] = ['ID', 'Nombre', 'Estado'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}, ${this.headerFields[2]}`;
  public icon: string = 'nb-star';
  public data = [];

  @ViewChild(BaseTableComponent) table: BaseTableComponent;

  public settings = {
    columns: {
      actions: {
        title: 'Acciones',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
            'edit': this.EditOffice.bind(this),
            'delete': this.DeleteConfirmOffice.bind(this),
          };
        },
        renderComponent: ActionsComponent,
      },
      id: {
        title: this.headerFields[0],
        type: 'string',
      },
      name: {
        title: this.headerFields[1],
        type: 'string',
      },
      status_id: {
        title: this.headerFields[2],
        type: 'custom',
        width: '10%',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
            'changeState': this.ChangeState.bind(this),
          };
        },
        renderComponent: StatusFieldComponent,
      },
    },
  };

  public routes = [
    {
      name: 'Despacho',
      route: '../../setting/office',
    },
  ];

  constructor(
    private officeS: OfficeService,
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

  NewOffice() {
    this.dialogFormService.open(FormOfficeComponent, {
      context: {
        title: 'Nuevo Despacho',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditOffice(data) {
    this.dialogFormService.open(FormOfficeComponent, {
      context: {
        title: 'Nuevo Despacho',
        data,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  ChangeState(data) {
    data.status_id = data.status_id === 1 ? 2 : 1;

    this.toastrService.info('', 'Cambiando estado');

    this.officeS.Update(data).then((x) => {
      this.toastrService.success('', x.message);
      this.table.refresh();
    }).catch((x) => {
      this.toastrService.danger(x.message);
    });
  }

  DeleteConfirmOffice(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteOffice.bind(this),
      },
    });
  }

  DeleteOffice(data) {
    return this.officeS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}
