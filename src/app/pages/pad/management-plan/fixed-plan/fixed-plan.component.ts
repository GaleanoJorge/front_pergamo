import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { TableRowWidget } from '@syncfusion/ej2/documenteditor';
import { FixedAddService } from '../../../../business-controller/fixed-add.service';
import { FixedAssetsService } from '../../../../business-controller/fixed-assets.service';
import { AuthService } from '../../../../services/auth.service';

import { BaseTableComponent } from '../../../components/base-table/base-table.component';
import { ConfirmDialogComponent } from '../../../components/confirm-dialog/confirm-dialog.component';
import { FormFixedPlanComponent } from './form-fixed-plan/form-fixed-plan.component';

@Component({
  selector: 'ngx-fixed-plan',
  templateUrl: './fixed-plan.component.html',
  styleUrls: ['./fixed-plan.component.scss']
})
export class FixedPlanComponent implements OnInit {
  @Input() parentData: any;
  @Input() admissions_id: any = null;

  public isSubmitted = false;
  public messageError = null;

  public title: string = 'LISTA DE ACTIVOS SOLICITADOS';
  public subtitle: string = '';
  public headerFields: any[] = ['CONSECUTIVO', 'ELEMENTO', 'PROCEDIMIENTO'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}, ${this.headerFields[2]}`;
  public icon: string = 'nb-star';
  public data = [];
  public my_fixed_id;
  public user;


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
      fixed_nom_product: {
        title: this.headerFields[1],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return row.fixed_nom_product.name + " - " + row.fixed_nom_product.fixed_clasification.fixed_type.name;
        },
      },
      procedure: {
        title: this.headerFields[2],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return row.procedure.manual_price.name;
        },
      },

    },
  };

  constructor(
    private FixedAddS: FixedAddService,
    private dialogFormService: NbDialogService,
    private deleteConfirmService: NbDialogService,
    private authService: AuthService,
    private FixedAssetsS: FixedAssetsService,
    private toastService: NbToastrService,
  ) {
  }

  ngOnInit(): void {
    this.user = this.authService.GetUser();
    this.FixedAssetsS.getFixedByUserId(this.user.id, {}).then(x => {
      if (x.length > 0) {
        this.my_fixed_id = x[0].id;
      } else {
        this.toastService.info('Usuario sin tipo de activo asociadas', 'Información');
      }
    });
  }

  RefreshData() {
    this.table.refresh();
  }

  NewPharmacy(data) {
    this.dialogFormService.open(FormFixedPlanComponent, {
      context: {
        title: 'Crear nueva Solicitud',
        data: data,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  receiveMessage($event) {
    if ($event == true) {
      this.RefreshData();
    }
  }

  EditPharmacy(data) {
    this.dialogFormService.open(FormFixedPlanComponent, {
      context: {
        title: 'Editar Solicitud',
        data,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  DeleteConfirmPharmacy(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeletePharmacy.bind(this),
      },
    });
  }

  DeletePharmacy(data) {
    return this.FixedAddS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}
