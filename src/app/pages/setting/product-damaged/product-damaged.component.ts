import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { FixedCodeService } from '../../../business-controller/fixed-code.service';
import { AuthService } from '../../../services/auth.service';
import { PharmacyLotStockService } from '../../../business-controller/pharmacy-lot-stock.service';

@Component({
  selector: 'ngx-product-damaged',
  templateUrl: './product-damaged.component.html',
  styleUrls: ['./product-damaged.component.scss']
})
export class ProductDamagedComponent implements OnInit {

  @Input() data: any = [];

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Productos Averiados';
  public subtitle: string = 'Cuarentena';
  public headerFields: any[] = ['CANTIDAD', 'PRODUCTO', 'OBSERVACIÓN'];
  public icon: string = 'nb-star';
  public entity;
  public user;
  public my_pharmacy_id;

  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  public settings = {
    pager: {
      display: true,
      perPage: 10,
    },
    columns: {
      request_amount: {
        title: this.headerFields[0],
        type: 'string',
      },
      product_supplies: {
        title: this.headerFields[1],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          if (row.product_generic_id == null) {
            return row.product_supplies.description;
          } else {
            return row.product_generic.description;
          }

        },
      },
      observation: {
        title: this.headerFields[2],
        type: 'string',
      },
    },
  };

  constructor(
    private invS: PharmacyLotStockService,
    private authService: AuthService,

    private FixedCodeS: FixedCodeService,
    private deleteConfirmService: NbDialogService,
  ) {
  }

  ngOnInit(): void {
    this.user = this.authService.GetUser();
    this.invS.GetPharmacyByUserId(this.user.id, {}).then(x => {
      if (x.length > 0) {
        this.my_pharmacy_id = x[0].id;
        this.entity = 'pharmacy_product_request?status=DAMAGED' + '&request_pharmacy_stock_id=' + x[0].id;
        this.title = 'SUMINISTROS EN CUARENTENA:  ' + x[0]['name'];
      }
    });
  }

  RefreshData() {

    this.table.refresh();
  }

  DeleteConfirmAdministrationRoute(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteAdministrationRoute.bind(this),
      },
    });
  }

  DeleteAdministrationRoute(data) {
    return this.FixedCodeS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}
