import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { TableRowWidget } from '@syncfusion/ej2/documenteditor';
import { FixedAddService } from '../../../../business-controller/fixed-add.service';
import { FixedAssetsService } from '../../../../business-controller/fixed-assets.service';
import { DateFormatPipe } from '../../../../pipe/date-format.pipe';
import { AuthService } from '../../../../services/auth.service';

import { BaseTableComponent } from '../../../components/base-table/base-table.component';
import { ConfirmDialogComponent } from '../../../components/confirm-dialog/confirm-dialog.component';
import { ActionsRetuPatientComponent } from './actions.component';
import { FormFixedReturnComponent } from './form-fixed-return/form-fixed-return.component';

@Component({
  selector: 'ngx-fixed-return',
  templateUrl: './fixed-return.component.html',
  styleUrls: ['./fixed-return.component.scss']
})
export class FixedReturnComponent implements OnInit {
  @Input() parentData: any;
  @Input() admissions_id: any = null;

  public isSubmitted = false;
  public messageError = null;

  public title: string = 'LISTA DE ACTIVOS A NOMBRE DEL PACIENTE'; 
  public subtitle: string = '';
  public headerFields: any[] = ['ELEMENTO', 'FECHA SOLICITUD'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}`;
  public icon: string = 'nb-star';
  public data = [];
  public my_fixed_id;
  public user;
  public entity: string = null;


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
            // 'type': this.type,
            // 'edit': this.EditInv.bind(this),
            'returned': this.Returned.bind(this),
            // 'delete': this.DeleteConfirmPharmacyStock.bind(this),
          };
        },
        renderComponent: ActionsRetuPatientComponent,
      },
      fixed_nom_product: {
        title: this.headerFields[0],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return row.fixed_nom_product.name + " - " + row.fixed_nom_product.fixed_clasification.fixed_type.name;
        },
      },
      created_at: {
        title: this.headerFields[1],
        type: 'string',
        valuePrepareFunction: (value) => {
          return this.datePipe.transform2(value);
        },
      },
    },
  };

  constructor(
    private FixedAddS: FixedAddService,
    private dialogFormService: NbDialogService,
    private deleteConfirmService: NbDialogService,
    public datePipe: DateFormatPipe,

  ) {
  }

  ngOnInit(): void {
    this.entity = 'fixed_add/?pagination=true&status=ENVIADO PATIENT&admissions=' + this.admissions_id ;
  }

  RefreshData() {
    this.table.refresh();
  }

  NewPharmacy(data) {
    this.dialogFormService.open(FormFixedReturnComponent, {
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
    this.dialogFormService.open(FormFixedReturnComponent, {
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
  Returned(data) {
    // console.log('dañado');
    this.dialogFormService.open(FormFixedReturnComponent, {
      context: {
        title: 'DEVOLVER ELEMENTO',
        data2: data,
        status: 'EN DEVOLUCIÓN',
        saved: this.RefreshData.bind(this),
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
