import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PharmacyStockService } from '../../../../business-controller/pharmacy-stock.service';
import { PharmacyProductRequestService } from '../../../../business-controller/pharmacy-product-request.service';
import { UserBusinessService } from '../../../../business-controller/user-business.service';

@Component({
  selector: 'ngx-form-pharmacy-inventory-supplies',
  templateUrl: './form-pharmacy-inventory-supplies.component.html',
  styleUrls: ['./form-pharmacy-inventory-supplies.component.scss']
})
export class FormPharmacyInventorySuppliesComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Input() my_pharmacy_id: any = null;

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public own_pharmacy_stock_id: any[];
  public selectedOptions: any[] = [];
  public user_request_id: any[];


  constructor(
    protected dialogRef: NbDialogRef<any>,
    private pharProdReqS: PharmacyProductRequestService,
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private perPharmaS: PharmacyStockService,
    private toastS: NbToastrService,
    private UserRoleBusinessS: UserBusinessService,

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
      user_request_id: [this.data.user_request_id, Validators.compose([Validators.required])],
      amount_provition: [this.data.amount_provition, Validators.compose([Validators.required])],
    });

    await this.perPharmaS.GetCollection({ not_pharmacy: this.my_pharmacy_id, }).then(x => {
      this.own_pharmacy_stock_id = x;
    });

    await this.UserRoleBusinessS.GetCollection().then(x => {
      this.user_request_id = x;
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
          user_request_id: this.form.controls.user_request_id.value,
          status: 'ENVIADO',
          product_supplies_id: this.data.billing_stock.product_supplies_com.product_supplies_id,
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