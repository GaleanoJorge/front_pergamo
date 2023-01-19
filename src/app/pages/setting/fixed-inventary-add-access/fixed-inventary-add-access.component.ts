import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { AuthService } from '../../../services/auth.service';
import { PharmacyLotStockService } from '../../../business-controller/pharmacy-lot-stock.service';
import { FormFixedInventaryAddAccessComponent } from './form-fixed-inventary_add-access/form-fixed-inventary-add-access.component';

@Component({
  selector: 'ngx-fixed-inventary-add-access',
  templateUrl: './fixed-inventary-add-access.component.html',
  styleUrls: ['./fixed-inventary-add-access.component.scss']
})
export class FixedInventaryAddAccessComponent implements OnInit {
  @Input() parentData: any;

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'PRESTAMOS';
  public subtitle: string = '';
  public headerFields: any[] = ['ID', 'Descripción','Cantidad', 'Ubicación', 'Responsable'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}`;
  public icon: string = 'nb-star';
  public data = [];
  public entity;
  public user;
  public validator ;

  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  public settings = {
    pager: {
      display: true,
      perPage: 10,
    },
    columns: {

      id: {
        title: this.headerFields[0],
        type: 'string',
      },
      fixed_accessories: {
        title: this.headerFields[1],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return row.fixed_accessories.name;
        },
      },
      request_amount: {
        title: this.headerFields[2],
        type: 'string',
      },
      fixed_location_campus: {
        title: this.headerFields[3],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return row.fixed_location_campus.campus.name + " - " + row.fixed_location_campus.flat.name;
        },
      },

      responsible_user: {
        title: this.headerFields[4],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return row.responsible_user.user.firstname + " - " + row.responsible_user.user.lastname;
        }
      },

    },

  };

  constructor(
    private dialogFormService: NbDialogService,
    private invS: PharmacyLotStockService,
    private authService: AuthService,
  ) {
  }

  async ngOnInit() {
    this.validator = this.parentData;
    this.user = this.authService.GetUser();
    this.invS.GetPharmacyByUserId(this.user.id, {}).then(x => {
      //  this.my_pharmacy_id = x[0].id;
      // this.entity = 'fixed_loan?fixed_loan=' + x[0].id;
      // this.title = 'INVENTARIO DE ' + x[0]['name'];
    });
  }

  RefreshData() {
    this.table.refresh();
  }

  EditInv(data) {
    this.dialogFormService.open(FormFixedInventaryAddAccessComponent, {
      context: {
        title: 'ENVIAR ACTIVO',
        data: data,
        //   my_pharmacy_id: this.my_pharmacy_id,
        saved: this.RefreshData.bind(this),
      },
    });
  }
}
