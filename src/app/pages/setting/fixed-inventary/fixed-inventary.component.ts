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
  public title: string = 'DISPONIBILIDAD';
  public subtitle: string = '';
  public headerFields: any[] = ['ID', 'Descripción', 'Marca', 'Sede'];
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

      description: {
        title: this.headerFields[1],
        type: 'string',
      },

      mark: {
        title: this.headerFields[2],
        type: 'string',
      },
      campus: {
        title: this.headerFields[3],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return row.campus.name;
        },
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
    private authService: AuthService,
  ) {
  }

  async ngOnInit() {
    this.user = this.authService.GetUser();
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
