import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { FixedAddService } from '../../../business-controller/fixed-add.service';
import { FixedAssetsService } from '../../../business-controller/fixed-assets.service';
import { UsersFixedStockService } from '../../../business-controller/users-fixed-stock.service';
import { AuthService } from '../../../services/auth.service';

import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { FormReportExternalQueryComponent } from './form-report-external-query/form-report-external-query.component';

@Component({
  selector: 'ngx-report-external-query',
  templateUrl: './report-external-query.component.html',
  styleUrls: ['./report-external-query.component.scss']
})
export class ReportExternalQueryComponent implements OnInit {
  @Input() parentData: any;
  public isSubmitted = false;
  public messageError = null;

  public title: string = 'LISTA DE ACTIVOS SOLICITADOS';
  public subtitle: string = '';
  public headerFields: any[] = ['ELEMENTO', 'CANTIDAD'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}, ${this.headerFields[2]}`;
  public icon: string = 'nb-star';
  public data = [];
  public user;
  public my_fixed_id;
  public fixed_stock;

  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  public settings = {
    pager: {
      display: true,
      perPage: 10,
    },
    columns: {
      fixed_accessories: {
        title: this.headerFields[0],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          if (value == null) {
            return row.fixed_nom_product.name;
          } else {
            return row.fixed_accessories.name;

          }
        },
      },
      request_amount: {
        title: this.headerFields[1],
        type: 'string',
      },
    },
  };

  constructor(
    private FixedAddS: FixedAddService,
    private dialogFormService: NbDialogService,
    private deleteConfirmService: NbDialogService,
    private authService: AuthService,
    private FixedAssetsS: FixedAssetsService,
    private toastService: NbToastrService,
    private UsersFixedStockS: UsersFixedStockService,
  ) {
  }

  ngOnInit() {
    this.user = this.authService.GetUser();
    this.FixedAssetsS.getFixedByUserId(this.user.id, {}).then(x => {
      if (x.length > 0) {
        this.my_fixed_id = x[0].id;
        this.title = 'SOLICITUDES REALIZADAS POR:  ' + x[0]['fixed_stock']['fixed_type']['name'];
      } else {
        this.toastService.info('Usuario sin tipo de activo asociadas', 'Información');
      }
    });
    this.UsersFixedStockS.getFixedUserId(this.user.id).then(x => {
      this.fixed_stock = x;
    });
  }

  RefreshData() {
    this.table.refresh();
  }

  NewExternalQuery() {
    this.dialogFormService.open(FormReportExternalQueryComponent, {
      context: {
        title: 'Crear nueva Solicitud',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  receiveMessage($event) {
    if ($event == true) {
      this.RefreshData();
    }
  }

  EditExternalQuery(data) {
    this.dialogFormService.open(FormReportExternalQueryComponent, {
      context: {
        title: 'Editar Solicitud',
        data,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  DeleteConfirmExternalQuery(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteExternalQuery.bind(this),
      },
    });
  }

  DeleteExternalQuery(data) {
    return this.FixedAddS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}
