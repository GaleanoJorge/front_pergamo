import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { PharmacyProductRequestService } from '../../../../../business-controller/pharmacy-product-request.service';
import { PharmacyStockService } from '../../../../../business-controller/pharmacy-stock.service';

@Component({
  selector: 'ngx-form-pharmacy-accepted-inventory',
  templateUrl: './form-pharmacy-accepted-inventory.component.html',
  styleUrls: ['./form-pharmacy-accepted-inventory.component.scss']
})
export class FormPharmacyAcceptedInventoryComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Input() my_pharmacy_id: any = null;

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public request_pharmacy_stock_id: any[];

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private pharProdReqS: PharmacyProductRequestService,
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private perPharmaS: PharmacyStockService,
  ) {
  }

  async ngOnInit() {
    if (!this.data) {
      this.data = {
        amount: '',
      };
    }
    this.form = this.formBuilder.group({
      amount: [this.data.amount, Validators.compose([Validators.required])],
    });

    await this.perPharmaS.GetCollection({not_pharmacy: this.my_pharmacy_id,}).then(x => {
      this.request_pharmacy_stock_id = x;
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
          id: this.data.id,
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
}
