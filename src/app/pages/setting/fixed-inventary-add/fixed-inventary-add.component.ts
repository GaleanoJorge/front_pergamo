import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { AuthService } from '../../../services/auth.service';
import { PharmacyLotStockService } from '../../../business-controller/pharmacy-lot-stock.service';
import { FormFixedInventaryAddComponent } from './form-fixed-inventary-add/form-fixed-inventary-add.component';
import { FixedAssetsService } from '../../../business-controller/fixed-assets.service';

@Component({
  selector: 'ngx-fixed-inventary-add',
  templateUrl: './fixed-inventary-add.component.html',
  styleUrls: ['./fixed-inventary-add.component.scss']
})
export class FixedInventaryAddComponent implements OnInit {
  @Input() parentData: any;
  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'ACTIVOS ASIGNADOS';
  public subtitle: string = '';
  public headerFields: any[] = ['ID', 'Descripción', 'Marca', 'Modelo', 'Serial', 'Ubicación', 'Responsable'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}`;
  public icon: string = 'nb-star';
  public data = [];
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

      id: {
        title: this.headerFields[0],
        type: 'string',
      },
      fixed_assets: {
        title: this.headerFields[1],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return row.fixed_assets.description;
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

      fixed_location_campus: {
        title: this.headerFields[5],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return row.fixed_location_campus.campus.name + " - " + row.fixed_location_campus.flat.name;
        },
      },

      responsible_user: {
        title: this.headerFields[6],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return row.responsible_user.user.firstname + " - " + row.responsible_user.user.lastname;
        }
      },

    },

  };

  constructor(
    private dialogFormService: NbDialogService,
    private authService: AuthService,
    private FixedAssetsS: FixedAssetsService,
    private toastService: NbToastrService,
  ) {
  }

  ngOnInit() {
    this.user = this.authService.GetUser();
    this.FixedAssetsS.getFixedByUserId(this.user.id, {}).then(x => {
      if (x.length > 0) {
        this.my_fixed_id = x[0].id;
        this.entity = 'fixed_assets?fixed_stock_id=' + x[0]['fixed_stock'].id+'&status_prod=ENVIADO PATIENT';
        this.title = 'ACTIVOS ASIGNADOS POR:  ' + x[0]['fixed_stock']['fixed_type']['name'];
      }else {
        this.toastService.info('Usuario sin tipo de activo asociadas', 'Información');
       }
    });



    // this.invS.GetPharmacyByUserId(this.user.id, {}).then(x => {
      //  this.my_pharmacy_id = x[0].id;
      // this.entity = 'fixed_loan?fixed_loan=' + x[0].id;
      // this.title = 'INVENTARIO DE ' + x[0]['name'];
    // });
  }

  RefreshData() {
    this.table.refresh();
  }

  EditInv(data) {
    this.dialogFormService.open(FormFixedInventaryAddComponent, {
      context: {
        title: 'ENVIAR ACTIVO',
        data: data,
        //   my_pharmacy_id: this.my_pharmacy_id,
        saved: this.RefreshData.bind(this),
      },
    });
  }
}
