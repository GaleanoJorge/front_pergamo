import { Component, OnInit, ViewChild } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { FormFixedInventaryComponent } from './form-fixed-inventary/form-fixed-inventary.component';
import { AuthService } from '../../../services/auth.service';
import { PharmacyLotStockService } from '../../../business-controller/pharmacy-lot-stock.service';
import { ActionsInFixComponent } from './actionsInFix.component';

@Component({
  selector: 'ngx-fixed-inventary',
  templateUrl: './fixed-inventary.component.html',
  styleUrls: ['./fixed-inventary.component.scss']
})
export class FixedInventaryComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'INVENTARIO';
  public subtitle: string = '';
  public headerFields: any[] = ['ID', 'Clasificación', 'Propio / Arrendado', 'Nombre', 'Marca'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}`;
  public icon: string = 'nb-star';
  public data = [];
  public entity;
  public user;
  //public my_pharmacy_id;

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
        renderComponent: ActionsInFixComponent,
      },
      id: {
        title: this.headerFields[0],
        type: 'string',
      },
      fixed_clasification: {
        title: this.headerFields[1],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return row.fixed_clasification.name;
        },
      },
      fixed_property: {
        title: this.headerFields[2],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return row.fixed_property.name;
        },
      },
      name: {
        title: this.headerFields[3],
        type: 'string',
      },
      mark: {
        title: this.headerFields[4],
        type: 'string',
      },
    },

  };

  public routes = [
    {
      name: 'Inventario',
      route: '../../setting/fixed-inventary',
    },
  ];

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
      this.entity = 'fixed_loan?fixed_loan=' + x[0].id;
      this.title = 'INVENTARIO DE ' + x[0]['name'];
    });
  }

  RefreshData() {
    this.table.refresh();
  }

  EditInv(data) {
    this.dialogFormService.open(FormFixedInventaryComponent, {
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
