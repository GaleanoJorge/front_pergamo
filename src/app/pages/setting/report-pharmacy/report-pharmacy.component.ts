import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { FixedAddService } from '../../../business-controller/fixed-add.service';
import { FixedAssetsService } from '../../../business-controller/fixed-assets.service';
import { UsersFixedStockService } from '../../../business-controller/users-fixed-stock.service';
import { AuthService } from '../../../services/auth.service';

import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { FormReportPharmacyComponent } from './form-report-pharmacy/form-report-pharmacy.component';

@Component({
  selector: 'ngx-report-pharmacy',
  templateUrl: './report-pharmacy.component.html',
  styleUrls: ['./report-pharmacy.component.scss']
})
export class ReportPharmacyComponent implements OnInit {
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
      }else {
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

  NewPharmacy() {
    this.dialogFormService.open(FormReportPharmacyComponent, {
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

  EditPharmacy(data) {
    this.dialogFormService.open(FormReportPharmacyComponent, {
      context: {
        title: 'Editar Solicitud',
        data,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  DeleteConfirmPharmacy(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeletePharmacy.bind(this),
      },
    });
  }

  DeletePharmacy(data) {
    return this.FixedAddS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}
