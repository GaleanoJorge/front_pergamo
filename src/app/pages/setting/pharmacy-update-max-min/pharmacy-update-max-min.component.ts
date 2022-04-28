import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { PharmacyUpdateMaxMinService } from '../../../business-controller/pharmacy-update-max-min.service';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { FormPharmacyUpdateMaxMinComponent } from './form-pharmacy-update-max-min/form-pharmacy-update-max-min.component';

@Component({
  selector: 'ngx-pharmacy-update-max-min',
  templateUrl: './pharmacy-update-max-min.component.html',
  styleUrls: ['./pharmacy-update-max-min.component.scss']
})
export class PharmacyUpdateMaxMinComponent implements OnInit {
  @Input() parentData: any;
  public isSubmitted = false;
  public messageError = null;

  public title: string = 'ACTUALIZAR STOCK MAXIMOS Y MINIMOS';
  public subtitle: string = '';
  public headerFields: any[] = ['PRODUCTO', 'PRODUCTO', 'CANTIDAD'];
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
      id: {
        title: this.headerFields[0],
        type: 'string',
      },
      product_generic: {
        title: this.headerFields[1],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.description;
        },
      },
      amount: {
        title: this.headerFields[2],
        type: 'string',
      }
    },
  };

  constructor(
    private pharmacyS: PharmacyUpdateMaxMinService,
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
    this.dialogFormService.open(FormPharmacyUpdateMaxMinComponent, {
      context: {
        title: 'Crear nueva factura',
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
    this.dialogFormService.open(FormPharmacyUpdateMaxMinComponent, {
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

}
