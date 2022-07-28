import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { PharmacyProductRequestService } from '../../../../business-controller/pharmacy-product-request.service';
import { PharmacyRequestShippingService } from '../../../../business-controller/pharmacy-request-shipping.service';
import { PharmacyStockService } from '../../../../business-controller/pharmacy-stock.service';
import { ProductGenericService } from '../../../../business-controller/product-generic.service';
import { ProductSuppliesService } from '../../../../business-controller/product-supplies.service';

@Component({
  selector: 'ngx-form-pharmacy-product-request',
  templateUrl: './form-pharmacy-product-request.component.html',
  styleUrls: ['./form-pharmacy-product-request.component.scss']
})
export class FormPharmacyProductRequestComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Input() parentData: any;
  @Output() messageEvent = new EventEmitter<any>();
  @Input() my_pharmacy_id: any = null;


  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public disabled: boolean = false;
  public showTable;
  public product_generic_id: any[];
  public product_supplies_id: any[];
  public request_pharmacy_stock_id: any[];

  constructor(
    private formBuilder: FormBuilder,
    private pharmaProdS: PharmacyProductRequestService,
    private pharmaShippS: PharmacyRequestShippingService,
    private pharmaS: PharmacyStockService,
    private ProductGenericS: ProductGenericService,
    private toastService: NbToastrService,
    private ProductSuppliesS: ProductSuppliesService,
    private perPharmaS: PharmacyStockService,

  ) {
  }

  async ngOnInit() {
    if (!this.data) {
      this.data = {
        request_amount: '',
        product_generic_id: '',
        product_supplies_id: '',
        request_pharmacy_stock_id: '',
      };
    }

    this.form = this.formBuilder.group({
      request_amount: [this.data.request_amount, Validators.compose([Validators.required])],
      product_generic_id: [this.data.product_generic_id],
      product_supplies_id: [this.data.product_supplies_id],
      request_pharmacy_stock_id: [this.data.request_pharmacy_stock_id, Validators.compose([Validators.required])],
    });

    await this.ProductGenericS.GetCollection().then(x => {
      this.product_generic_id = x;
    });
    await this.pharmaS.GetCollection({ not_pharmacy: this.my_pharmacy_id, }).then(x => {
      this.request_pharmacy_stock_id = x;
    });
    await this.ProductSuppliesS.GetCollection().then(x => {
      this.product_supplies_id = x;
    });
  }

  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;

      if (this.data.id) {
        await this.pharmaProdS.Update({
          id: this.data.id,
          request_amount: this.form.controls.request_amount.value,
          status: 'SOLICITADO',
          product_generic_id: this.form.controls.product_generic_id.value,
          product_supplies_id: this.form.controls.product_supplies_id.value,
          own_pharmacy_stock_id: this.my_pharmacy_id,
          request_pharmacy_stock_id: this.form.controls.request_pharmacy_stock_id.value,
        }).then(x => {
          this.toastService.success('', x.message);
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      } else {
        await this.pharmaProdS.Save({
          request_amount: this.form.controls.request_amount.value,
          status: 'SOLICITADO',
          product_generic_id: this.form.controls.product_generic_id.value,
          own_pharmacy_stock_id: this.my_pharmacy_id,
          product_supplies_id: this.form.controls.product_supplies_id.value,
          request_pharmacy_stock_id: this.form.controls.request_pharmacy_stock_id.value,
        }).then(x => {
          this.toastService.success('', x.message);
          this.messageEvent.emit(true);
          this.form.setValue({ request_amount: '', product_supplies_id: '',product_generic_id: '', request_pharmacy_stock_id: '' });
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
}
