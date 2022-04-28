import { CurrencyPipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { PermissionPharmacyStockService } from '../../../../business-controller/permission-pharmacy-stock.service';
import { PharmacyLotService } from '../../../../business-controller/pharmacy-lot.service';
import { PharmacyProductRequestService } from '../../../../business-controller/pharmacy-product-request.service';
import { PharmacyStockService } from '../../../../business-controller/pharmacy-stock.service';
import { ProductGenericService } from '../../../../business-controller/product-generic.service';
import { ProductService } from '../../../../business-controller/product.service';


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

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public disabled: boolean = false;
  public showTable;
  public product_generic_id: any[];
  public pharmacy_stock_id: any[];

  constructor(
    private formBuilder: FormBuilder,
    private pharmaProdS: PharmacyProductRequestService,
    private pharmaS: PharmacyStockService,
    private ProductGenericS: ProductGenericService,
    private toastService: NbToastrService,
  ) {
  }

  async ngOnInit() {
    if (!this.data) {
      this.data = {
        amount: '',
        product_generic_id: '',
        pharmacy_stock_id: '',
      };
    }

    this.form = this.formBuilder.group({
      amount: [this.data.amount, Validators.compose([Validators.required])],
      product_generic_id: [this.data.product_generic_id, Validators.compose([Validators.required])],
      pharmacy_stock_id: [this.data.pharmacy_stock_id, Validators.compose([Validators.required])],
    });

    await this.ProductGenericS.GetCollection().then(x => {
      this.product_generic_id = x;
    });
    await this.pharmaS.GetCollection().then(x => {
      this.pharmacy_stock_id = x;
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
          amount: this.form.controls.amount.value,
          product_generic_id: this.form.controls.product_generic_id.value,
          pharmacy_stock_id: this.form.controls.pharmacy_stock_id.value,
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
          amount: this.form.controls.amount.value,
          product_generic_id: this.form.controls.product_generic_id.value,
          pharmacy_stock_id: this.form.controls.pharmacy_stock_id.value,
        }).then(x => {
          this.toastService.success('', x.message);
          this.messageEvent.emit(true);
          this.form.setValue({ amount: '', product_generic_id: '', pharmacy_stock_id:''});
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
