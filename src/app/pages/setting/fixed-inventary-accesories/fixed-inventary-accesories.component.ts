import { Component, OnInit, ViewChild } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { FormFixedInventaryAccesoriesComponent } from './form-fixed-inventary-accesories/form-fixed-inventary-accesories.component';
import { AuthService } from '../../../services/auth.service';
import { PharmacyLotStockService } from '../../../business-controller/pharmacy-lot-stock.service';
import { ActionsInvAccesComponent } from './actionsInAcces.component';

@Component({
  selector: 'ngx-fixed-inventary-accesories',
  templateUrl: './fixed-inventary-accesories.component.html',
  styleUrls: ['./fixed-inventary-accesories.component.scss']
})
export class FixedInventaryAccesoriesComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'INVENTARIO DE ACCESORIOS';
  public subtitle: string = '';
  public headerFields: any[] = ['ID', 'Descripción', 'Cantidad inicial', 'Cantidad total', 'Sede'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}`;
  public icon: string = 'nb-star';
  public data = [];
  public entity;
  public user;
  public showdiv: boolean = null;


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
            'edit': this.EditInv.bind(this),
          };
        },
        renderComponent: ActionsInvAccesComponent,
      },
      id: {
        title: this.headerFields[0],
        type: 'string',
      },
      name: {
        title: this.headerFields[1],
        type: 'string',
      },
      amount_total: {
        title: this.headerFields[2],
        type: 'string', 
      },
      actual_amount: {
        title: this.headerFields[3],
        type: 'string',
      },
      campus: {
        title: this.headerFields[4],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return row.campus.name;
        },
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

  reloadForm(tab) {
    if (tab.tabTitle == 'DISPONIBLE') {
      this.showdiv = false;
    } else {
      this.showdiv = true;
    }
  }

  EditInv(data) {
    this.dialogFormService.open(FormFixedInventaryAccesoriesComponent, {
      context: {
        title: 'ENVIAR ACTIVO',
        data: data,
        //   my_pharmacy_id: this.my_pharmacy_id,
        saved: this.RefreshData.bind(this),
      },
    });
  }
  // NewDev(data) {
  //   this.dialogFormService.open(FormFixedInventaryComponent, {
  //     context: {
  //       title: 'ACTIVO DEVUELTOS',
  //       data: data,
  //       //    my_pharmacy_id: this.my_pharmacy_id,
  //       saved: this.RefreshData.bind(this),
  //     },
  //   });
  // }


}
