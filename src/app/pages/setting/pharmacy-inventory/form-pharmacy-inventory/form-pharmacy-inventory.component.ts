import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PharmacyStockService } from '../../../../business-controller/pharmacy-stock.service';
import { PharmacyProductRequestService } from '../../../../business-controller/pharmacy-product-request.service';

@Component({
  selector: 'ngx-form-pharmacy-inventory',
  templateUrl: './form-pharmacy-inventory.component.html',
  styleUrls: ['./form-pharmacy-inventory.component.scss']
})
export class FormPharmacyInventoryComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Input() my_pharmacy_id: any = null;

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public own_pharmacy_stock_id: any[];
  public selectedOptions: any[] = [];


  constructor(
    protected dialogRef: NbDialogRef<any>,
    private pharProdReqS: PharmacyProductRequestService,
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private perPharmaS: PharmacyStockService,
    private toastS: NbToastrService,

  ) {
  }

  async ngOnInit() {
    if (!this.data) {
      this.data = {
        amount_provition: '',
      };
    }
    this.form = this.formBuilder.group({
      own_pharmacy_stock_id: [this.data.own_pharmacy_stock_id, Validators.compose([Validators.required])],
      amount_provition: [this.data.amount_provition, Validators.compose([Validators.required])],
    });

    await this.perPharmaS.GetCollection({ not_pharmacy: this.my_pharmacy_id, }).then(x => {
      this.own_pharmacy_stock_id = x;
    });

  }
  close() {
    this.dialogRef.close();
  }
  save() {

    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      if (this.data.id) {
        this.pharProdReqS.updateInventoryByLot({
          id: -1,
          pharmacy_lot_stock_id: this.data.id,
          amount_provition: this.form.controls.amount_provition.value,
          status: 'ENVIADO',
          product_generic_id: this.data.billing_stock.product.product_generic_id,
          request_pharmacy_stock_id: 1,
          own_pharmacy_stock_id: this.form.controls.own_pharmacy_stock_id.value,
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
}