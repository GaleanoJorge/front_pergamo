import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { PharmacyLotStockService } from '../../../../business-controller/pharmacy-lot-stock.service';
import { PharmacyStockService } from '../../../../business-controller/pharmacy-stock.service';
import { PharmacyProductRequestService } from '../../../../business-controller/pharmacy-product-request.service';

@Component({
  selector: 'ngx-form-pharmacy-bulk-load',
  templateUrl: './form-pharmacy-bulk-load.component.html',
  styleUrls: ['./form-pharmacy-bulk-load.component.scss']
})
export class FormPharmacyBulkLoadComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Input() parentData: any;
  @Input() parentData1: any;

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public type_billing_evidence: any[];
  public selectedOptions: any[] = [];
  public user;
  public entity;
  public my_pharmacy_id;
  public pharmacy_stock;
  public pharmacy;
  public request_pharmacy_stock_id: any[];

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private authService: AuthService,
    private toastS: NbToastrService,
    private invS: PharmacyLotStockService,
    private pharmaS: PharmacyStockService,
    private pharProdReqS: PharmacyProductRequestService

  ) {
  }

  async ngOnInit() {
    this.user = this.authService.GetUser();
    this.invS.GetPharmacyByUserId(this.user.id, {}).then(x => {
      if (x.length > 0) {
        this.my_pharmacy_id = x[0].id;
        this.entity = 'pharmacy_lot_stock?pharmacy_stock_id=' + this.my_pharmacy_id + '&product=' + true, 'pharmacy_lot_stock';
        this.title = 'INVENTARIO DE ' + x[0]['name'];
        this.parentData = {
          selectedOptions: [],
          entity: ('pharmacy_lot_stock?pharmacy_stock_id=' + this.my_pharmacy_id),
          customData: 'pharmacy_lot_stock',
        };
      } else {
        this.toastService.info('Usuario sin farmacias asociadas', 'Información');
      }
    });

    if (!this.data) {
      this.data = {
        request_pharmacy_stock_id: '',
      };
    }
    this.form = this.formBuilder.group({
      request_pharmacy_stock_id: [this.data.request_pharmacy_stock_id, Validators.compose([Validators.required])],
    });

    await this.pharmaS.GetCollection({ not_pharmacy: this.my_pharmacy_id, }).then(x => {
      this.request_pharmacy_stock_id = x;
    });
  }
  close() {
    this.dialogRef.close();
  }

  receiveMessage($event) {
    this.selectedOptions = $event;
  }

  save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      var valid_values = true;
      if ((!this.selectedOptions || this.selectedOptions.length == 0)) {
        valid_values = false;
        this.toastS.danger('Debe seleccionar al menos un elemento', 'Error');
      }
      if (valid_values) {
        this.loading = true;
        var contador = 0;
        var err = 0;
        this.pharProdReqS.updateInventoryByLot({
          id: -2,
          request_pharmacy_stock_id: this.form.controls.request_pharmacy_stock_id.value,
          own_pharmacy_stock_id: this.my_pharmacy_id,
          pharmacy_lot_stock_id: this.selectedOptions || this.selectedOptions.length > 0 ? JSON.stringify(this.selectedOptions) : null,
        }).then(x => {
          this.loading = false;
          this.toastService.success('', x.message);
          this.close();
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          err++;
        });
        contador++;
        if (contador > 0) {
          this.toastS.success(null, 'Se actualizaron ' + contador + ' elementos');
        } else if (err > 0) {
          this.toastS.danger(null, 'No se actualizaron ' + contador + ' elementos');
        }
      }
    }
  }
}

