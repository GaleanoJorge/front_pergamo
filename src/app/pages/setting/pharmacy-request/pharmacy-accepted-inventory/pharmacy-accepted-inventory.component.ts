import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NbDialogRef, NbDialogService, NbToastrService } from '@nebular/theme';
import { PharmacyProductRequestService } from '../../../../business-controller/pharmacy-product-request.service';
import { AuthService } from '../../../../services/auth.service';
import { BaseTableComponent } from '../../../components/base-table/base-table.component';
import { FormPharmacyAcceptedInventoryComponent } from './form-pharmacy-accepted-inventory/form-pharmacy-accepted-inventory.component';
import { ObservationComponent } from './observation.component';
import { StatusComponent } from './status.component';


@Component({
  selector: 'ngx-pharmacy-accepted-inventory',
  templateUrl: './pharmacy-accepted-inventory.component.html',
  styleUrls: ['./pharmacy-accepted-inventory.component.scss']
})
export class PharmacyAcceptedInventoryComponent implements OnInit {
  @Input() data: any = null;
  @Output() messageEvent = new EventEmitter<any>();
  @Input() parentData: any = [];


  public isSubmitted = false;
  public messageError: string = null;
  public title: string = '';
  public subtitle: string = '';
  public headerFields: any[] = ['PRODUCTO - PRODUCTO GENERICO', 'FABRICANTE', 'LOTE', 'CANTIDAD DEVUELTA', 'ESTADO', 'OBSERVACIONES'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}`;
  public icon: string = 'nb-star';
  public entity;
  public user;
  public my_pharmacy_id;
  public status: "0";
  public selectedOptions: any[] = [];
  public selectedOptions2: any[] = [];
  public form: FormGroup;
  public saved: any = null;
  public loading: boolean = false;


  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  public settings = {
    pager: {
      display: true,
      perPage: 10,
    },
    columns: {
      product: {
        title: this.headerFields[0],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return row.billing_stock.product.name + ' - ' + row.billing_stock.product.product_generic.description;
        },
      },

      factory: {
        title: this.headerFields[1],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return row.billing_stock.product.factory.name;
        },
      },

      lot: {
        title: this.headerFields[2],
        type: 'string',
      },
      actual_amount: {
        title: this.headerFields[3],
        type: 'string',
      },


      status: {
        title: this.headerFields[4],
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          var amo;
          this.parentData.selectedOptions.forEach(x => {
            if (x.pharmacy_product_request_id == row.id) {
              amo = x.lot;
            }
          });
          return {
            'data': row,
            'enabled': !this.selectedOptions2.includes(row.id),
            'lot': amo ? amo : '',
            'onchange': (input, row: any) => this.onStatusChange(input, row),
          };
        },
        renderComponent: StatusComponent,
      },


      observation: {
        title: this.headerFields[5],
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          var amo;
          this.parentData.selectedOptions.forEach(x => {
            if (x.pharmacy_product_request_id == row.id) {
              amo = x.lot;
            }
          });
          return {
            'data': row,
            'enabled': !this.selectedOptions2.includes(row.id),
            'lot': amo ? amo : '',
            'onchange': (input, row: any) => this.onObservationChange(input, row),
          };
        },
        renderComponent: ObservationComponent,
      },


    },

  };

  constructor(
    private pharProdReqS: PharmacyProductRequestService,
    private authService: AuthService,
    protected dialogRef: NbDialogRef<any>,
    private toastService: NbToastrService,
  ) {
  }
  close() {
    this.dialogRef.close();
  }
  async ngOnInit() {
    this.user = this.authService.GetUser();
    this.pharProdReqS.GetPharmacyByUserId(this.user.id, {}).then(x => {
      this.my_pharmacy_id = x[0].id;
      this.entity = 'pharmacy_product_request?pharmacy_stock_id=' + x[0].id;
       this.title = 'DEVOLUCIONES PARA - ' + x[0]['name'];
      //    this.entity = 'pharmacy_product_request';
      //    this.title = 'DEVOLUCIONES';
    });
  }

  RefreshData() {
    this.table.refresh();
  }

  save() {

    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;

      if (this.data.id) {
        this.pharProdReqS.updateInventoryByLot({
          id: this.data.id,
          amount: this.form.controls.amount.value,
          status: 'ENVIADO',
          request_pharmacy_stock_id: this.form.controls.request_pharmacy_stock_id.value,
          own_pharmacy_stock_id: this.data.own_pharmacy_stock_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.close();
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      } else {
        this.pharProdReqS.Save({
          amount: this.form.controls.amount.value,
          status: 'ENVIADO',
          request_pharmacy_stock_id: this.form.controls.request_pharmacy_stock_id.value,
          own_pharmacy_stock_id: 1,

        }).then(x => {
          this.toastService.success('', x.message);
          this.close();
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      }
    }
  }

  onStatusChange(input, row) {
    var i = 0;
    var mientras = this.selectedOptions;
    this.selectedOptions.forEach(element => {
      if (element.pharmacy_product_request_id == row.id) {
        mientras[i].lot = input.target.value;
      }
      i++
    });
    this.selectedOptions = mientras;
    this.messageEvent.emit(this.selectedOptions);
  }
  onObservationChange(input, row) {
    var i = 0;
    var mientras = this.selectedOptions;
    this.selectedOptions.forEach(element => {
      if (element.pharmacy_product_request_id == row.id) {
        mientras[i].lot = input.target.value;
      }
      i++
    });
    this.selectedOptions = mientras;
    this.messageEvent.emit(this.selectedOptions);
  }
}
