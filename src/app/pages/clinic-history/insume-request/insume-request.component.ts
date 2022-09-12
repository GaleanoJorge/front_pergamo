import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { PharmacyProductRequestService } from '../../../business-controller/pharmacy-product-request.service';

import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { ActionsComponent } from '../../contract/briefcase/actions.component';
import { FormInsumeRequestComponent } from './form-insume-request/form-insume-request.component';



@Component({
  selector: 'ngx-insume-request',
  templateUrl: './insume-request.component.html',
  styleUrls: ['./insume-request.component.scss']
})
export class InsumeRequestComponent implements OnInit {
  @Input() parentData: any;
  @Input() record_id: any;
  @Input() user: any;
  @Input() admissions_id: any;
  @Input() type_record_id;
  @Input() has_input: boolean = false;
  @Output() messageEvent = new EventEmitter<any>();
  
  public isSubmitted = false;
  public messageError = null;

  public title: string = 'SOLICITAR INSUMOS';
  public subtitle: string = '';
  public headerFields: any[] = ['PRODUCTO', 'CANTIDAD', 'SOLICITADO A'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}, ${this.headerFields[2]}`;
  public icon: string = 'nb-star';
  public data = [];


  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  public settings = {
    pager: {
      display: true,
      perPage: 10,
    },
    columns: {
      product_supplies: {
        title: this.headerFields[0],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          if (value) {
            return row.product_supplies.description;
          } else {
            return row.services_briefcase.manual_price.name;
          }
        },
      },
      request_amount: {
        title: this.headerFields[1],
        type: 'string',
      },
      own_pharmacy_stock: {
        title: this.headerFields[2],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value?.name + ' - ' + row.own_pharmacy_stock?.campus.name;
        },
      }
    },
  };

  constructor(
    private pharmacyS: PharmacyProductRequestService,
    private dialogFormService: NbDialogService,
    private deleteConfirmService: NbDialogService,
  ) {
  }

  ngOnInit(): void {
  }

  RefreshData() {
    this.table.refresh();
  }

  NewPharmacy() {
    this.dialogFormService.open(FormInsumeRequestComponent, {
      context: {
        title: 'Crear nueva factura',
        saved: this.RefreshData.bind(this),
      },
    });
  }


  EditPharmacy(data) {
    this.dialogFormService.open(FormInsumeRequestComponent, {
      context: {
        title: 'Editar factura',
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
    return this.pharmacyS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

  receiveMessage($event) {
    if ($event == true) {
      this.RefreshData();
      if (this.type_record_id == 1) {
        this.messageEvent.emit(true);
      }
    }
  }

}
