import { Component, OnInit, ViewChild } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { FormFixedInventaryComponent } from './form-fixed-inventary/form-fixed-inventary.component';
import { AuthService } from '../../../services/auth.service';
import { ActionsInFixComponent } from './actionsInFix.component';
import { FixedAssetsService } from '../../../business-controller/fixed-assets.service';

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
  public headerFields: any[] = ['ID', 'Descripción', 'Marca', 'Modelo', 'Serial', 'Sede'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}`;
  public icon: string = 'nb-star';
  public data = [];
  public showdiv: Number = null;
  public entity;
  public user;
  public my_fixed_id;


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
      fixed_nom_product: {
        title: this.headerFields[1],
        type: 'string',
        valuePrepareFunction: (value, row) => {
        return value.name;
        }
        
      },
      mark: {
        title: this.headerFields[2],
        type: 'string',
      },

      model: {
        title: this.headerFields[3],
        type: 'string',
      },

      serial: {
        title: this.headerFields[4],
        type: 'string',
      },
      fixed_stock: {
        title: this.headerFields[5],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return row.fixed_stock.campus.name;
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
    private FixedAssetsS: FixedAssetsService,
    private toastService: NbToastrService,

  ) {
  }

  async ngOnInit() {
    this.user = this.authService.GetUser();   
    this.FixedAssetsS.getFixedByUserId(this.user.id, {}).then(x => {
      if (x.length > 0) {
        this.my_fixed_id = x[0].id;
        this.entity = 'fixed_assets?fixed_stock_id=' + x[0].id+'&status_prod=STOCK';
        this.title = 'INVENTARIO DE:  ' + x[0]['fixed_stock']['fixed_type']['name'];
      }else {
        this.toastService.info('Usuario sin tipo de activo asociadas', 'Información');
       }
    });
    
    

  }

  RefreshData() {
    this.table.refresh();
  }

  reloadForm(tab) {
    if (tab.tabTitle == 'ACEPTAR') {
      this.showdiv = 1;
    } else {
      this.showdiv = 2;
    }
  }

  EditInv(data) {
    this.dialogFormService.open(FormFixedInventaryComponent, {
      context: {
        title: 'ENVIAR ACTIVO',
        data: data,
        my_fixed_id: this.my_fixed_id,
        saved: this.RefreshData.bind(this),
      },
    });
  }
}
