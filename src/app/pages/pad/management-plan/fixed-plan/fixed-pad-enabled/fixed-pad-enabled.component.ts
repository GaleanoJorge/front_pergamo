import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NbDialogRef, NbDialogService, NbToastrService } from '@nebular/theme';
import { TableRowWidget } from '@syncfusion/ej2/documenteditor';
import { FixedAddService } from '../../../../../business-controller/fixed-add.service';
import { FixedAssetsService } from '../../../../../business-controller/fixed-assets.service';
import { DateFormatPipe } from '../../../../../pipe/date-format.pipe';
import { AuthService } from '../../../../../services/auth.service';

import { BaseTableComponent } from '../../../../components/base-table/base-table.component';
import { ConfirmDialogComponent } from '../../../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'ngx-fixed-pad-enabled',
  templateUrl: './fixed-pad-enabled.component.html',
  styleUrls: ['./fixed-pad-enabled.component.scss']
})
export class FixedPadEnabledComponent implements OnInit {
  @Input() parentData: any;
  @Input() user: any;
  @Input() admissions_id: any = null;

  public isSubmitted = false;
  public messageError = null;

  public title: string = 'ACTIVOS RECHAZADOS';
  public subtitle: string = '';
  public headerFields: any[] = ['ELEMENTO', 'PROCEDIMIENTO', 'PERSONAL QUE SOLICITO EL ACTIVO', 'FECHA SOLICITUD', 'ESTADO', 'OBSERVACIÓN'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}, ${this.headerFields[2]}`;
  public icon: string = 'nb-star';
  public data = [];
  public my_fixed_id;
  public user1;
  public entity: string = null;


  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  public settings = {
    pager: {
      display: true,
      perPage: 10,
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
      observation: {
        title: this.headerFields[5],
        type: 'string',
      }

    },
  };

  constructor(
    protected dialogRef: NbDialogRef<any>,

    private authService: AuthService,
    private FixedAssetsS: FixedAssetsService,
    public datePipe: DateFormatPipe,
  ) {
  }

  ngOnInit(): void {
    this.entity = 'fixed_add/?pagination=true&status=RECHAZADO&admissions=' + this.admissions_id ;
    this.user1 = this.authService.GetUser();
    this.FixedAssetsS.getFixedByUserId(this.user1.id, {}).then(x => {
    });
  }

  RefreshData() {
    this.table.refresh();
  }
 
  close() {
    this.dialogRef.close();
  }

  receiveMessage($event) {
    if ($event == true) {
      this.RefreshData();
    }
  }
}
