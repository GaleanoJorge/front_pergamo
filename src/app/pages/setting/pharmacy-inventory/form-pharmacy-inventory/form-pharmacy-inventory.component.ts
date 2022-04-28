import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BillingService } from '../../../../business-controller/billing.service';
import { TypeBillingEvidenceService } from '../../../../business-controller/type-billing-evidence.service';
import { PharmacyStockService } from '../../../../business-controller/pharmacy-stock.service';
import { PharmacyInventoryService } from '../../../../business-controller/pharmacy-inventory.service';

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
  public pharmacy_stock_id: any[];

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private invS: PharmacyInventoryService,
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private perPharmaS: PharmacyStockService,
  ) {
  }

  async ngOnInit() {
    if (!this.data) {
      this.data = {
        pharmacy_stock_id: '',
        amount: '',
      };
    }
    this.form = this.formBuilder.group({
      pharmacy_stock_id: [this.data.pharmacy_stock_id, Validators.compose([Validators.required])],
      amount: [this.data.amount, Validators.compose([Validators.required])],
    });

    await this.perPharmaS.GetCollection({not_pharmacy: this.my_pharmacy_id,}).then(x => {
      this.pharmacy_stock_id = x;
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
        this.invS.updateInventoryByLot({
          id: this.data.id,
          pharmacy_lot_id: this.data.pharmacy_lot_id,
          pharmacy_stock_id: this.form.controls.pharmacy_stock_id.value,
          amount: this.form.controls.amount.value,
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
        this.invS.Save({
          pharmacy_stock_id: this.form.controls.pharmacy_stock_id.value,
          amount: this.form.controls.amount.value,
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
