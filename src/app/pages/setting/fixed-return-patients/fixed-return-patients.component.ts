import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { FixedAssetsService } from '../../../business-controller/fixed-assets.service';
import { PharmacyLotStockService } from '../../../business-controller/pharmacy-lot-stock.service';
import { PharmacyProductRequestService } from '../../../business-controller/pharmacy-product-request.service';
import { UsersFixedStockService } from '../../../business-controller/users-fixed-stock.service';
import { AuthService } from '../../../services/auth.service';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { ActionsReturnPatiComponent } from './actions-return.component';
import { FormFixedReturnPatientsComponent } from './form-fixed-return-patients/form-fixed-return-patients.component';

@Component({
  selector: 'ngx-fixed-return-patients',
  templateUrl: './fixed-return-patients.component.html',
  styleUrls: ['./fixed-return-patients.component.scss']
})
export class FixedReturnPatientsComponent implements OnInit {

  @Input() parentData: any;
  public isSubmitted = false;
  public messageError: string = null;
  public title: string = '';
  public subtitle: string = '';
  public headerFields: any[] = ['Consecutivo', 'Descripción', 'Marca', 'Modelo', 'Serial', 'Responsable'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}`;
  public icon: string = 'nb-star';
  public data = [];
  public entity;
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
      actions: {
        title: 'Acciones',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          return {
            'data': row,
            'edit': this.EditInv.bind(this),
            // 'delete': this.DeletePharInventary.bind(this),
          };
        },
        renderComponent: ActionsReturnPatiComponent,
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
        },
      },

      mark: {
        title: this.headerFields[2],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return row.fixed_assets.mark;
        },
      },

      model: {
        title: this.headerFields[3],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return row.fixed_assets.model;
        },
      },

      serial: {
        title: this.headerFields[4],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return row.fixed_assets.serial;
        },
      },

      own_fixed_user: {
        title: this.headerFields[5],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return row.own_fixed_user.firstname + " " + row.own_fixed_user.lastname + " - " + row.own_fixed_user.identification;
        }
      },
    },
  };

  constructor(
    private dialogFormService: NbDialogService,
    private authService: AuthService,
    private FixedAssetsS: FixedAssetsService,
    private toastService: NbToastrService,
    private UsersFixedStockS: UsersFixedStockService,

  ) {
  }

  async ngOnInit() {
    this.user = this.authService.GetUser();
    this.FixedAssetsS.getFixedByUserId(this.user.id, {}).then(x => {
      if (x.length > 0) {
        this.my_fixed_id = x[0].id;
        // this.entity = 'fixed_add/?pagination=true&status=DEVUELTO PACIENTE' ;
        this.title = 'ACTIVOS FIJOS DEVUELTOS A: ' + x[0]['fixed_stock']['fixed_type']['name'];
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

  EditInv(data) {
    this.dialogFormService.open(FormFixedReturnPatientsComponent, {
      // closeOnBackdropClick: false,
      context: {
        // title: 'Aceptar activo',
        data2: data,
        status: 'ENVIADO PATIENT',
        saved: this.RefreshData.bind(this),
      },
    });
  }
}
