import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { TableRowWidget } from '@syncfusion/ej2/documenteditor';
import { FixedAddService } from '../../../../business-controller/fixed-add.service';
import { FixedAssetsService } from '../../../../business-controller/fixed-assets.service';
import { DateFormatPipe } from '../../../../pipe/date-format.pipe';
import { AuthService } from '../../../../services/auth.service';
import { BaseTableComponent } from '../../../components/base-table/base-table.component';
import { ConfirmDialogComponent } from '../../../components/confirm-dialog/confirm-dialog.component';
import { FormFixedPlanComponent } from './form-fixed-plan/form-fixed-plan.component';
import { FixedPadEnabledComponent } from './fixed-pad-enabled/fixed-pad-enabled.component';
import { UsersFixedStockService } from '../../../../business-controller/users-fixed-stock.service';

@Component({
  selector: 'ngx-fixed-plan',
  templateUrl: './fixed-plan.component.html',
  styleUrls: ['./fixed-plan.component.scss']
})
export class FixedPlanComponent implements OnInit {
  @Input() parentData: any;
  @Input() user: any;
  @Input() admissions_id: any = null;

  public isSubmitted = false;
  public messageError = null;

  public title: string = 'LISTA DE ACTIVOS SOLICITADOS';
  public subtitle: string = '';
  public headerFields: any[] = ['ELEMENTO', 'PROCEDIMIENTO', 'PERSONAL QUE SOLICITO EL ACTIVO', 'FECHA SOLICITUD', 'ESTADO'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}, ${this.headerFields[2]}`;
  public icon: string = 'nb-star';
  public data = [];
  public my_fixed_id;
  public user1;
  public entity: string = null;
  public fixed_stock;


  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  public settings = {
    pager: {
      display: true,
      perPage: 5,
    },
    columns: {
      fixed_nom_product: {
        title: this.headerFields[0],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return row.fixed_nom_product.name + " - " + row.fixed_nom_product.fixed_clasification.fixed_type.name;
        },
      },
      procedure: {
        title: this.headerFields[1],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return row.procedure.manual_price.name;
        },
      },
      own_fixed_user: {
        title: this.headerFields[2],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return row.own_fixed_user.firstname + " " + row.own_fixed_user.lastname;
        },
      },

      created_at: {
        title: this.headerFields[3],
        type: 'string',
        valuePrepareFunction: (value) => {
          return this.datePipe.transform2(value);
        },
      },
      status: {
        title: this.headerFields[4],
        type: 'string',
        valuePrepareFunction: (value) => {
          if (value == 'PATIENT') {
            return 'SOLICITADO'
          }
          return 'SIN EXISTENCIAS';
        },
      },

    },
  };

  constructor(
    private dialogFormService: NbDialogService,
    private authService: AuthService,
    private FixedAssetsS: FixedAssetsService,
    public datePipe: DateFormatPipe,
    private UsersFixedStockS: UsersFixedStockService,
  ) {
  }

  ngOnInit(): void {
    this.entity = 'fixed_add/?pagination=true&status=PATIENT&admissions=' + this.admissions_id;
    this.user1 = this.authService.GetUser();
    this.FixedAssetsS.getFixedByUserId(this.user1.id, {}).then(x => {
    });
     this.UsersFixedStockS.getFixedUserId(this.user.id).then(x => {
      this.fixed_stock = x;
    });
  }

  RefreshData() {
    this.table.refresh();
  }

  receiveMessage($event) {
    if ($event == true) {
      this.RefreshData();
    }
  }

  asd() {
    this.dialogFormService.open(FixedPadEnabledComponent, {
      closeOnBackdropClick: false,
      context: {
        title: 'NO DISPONIBLES',
        admissions_id: this.admissions_id,
      },
    });
  }
}
