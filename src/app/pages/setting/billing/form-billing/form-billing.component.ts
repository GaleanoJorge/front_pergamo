import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BillingService } from '../../../../business-controller/billing.service';
import { TypeBillingEvidenceService } from '../../../../business-controller/type-billing-evidence.service';
import { PermissionPharmacyStockService } from '../../../../business-controller/permission-pharmacy-stock.service';

@Component({
  selector: 'ngx-form-billing',
  templateUrl: './form-billing.component.html',
  styleUrls: ['./form-billing.component.scss']
})
export class FormBillingComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public type_billing_evidence: any[];

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private BillingS: BillingService,
    private toastService: NbToastrService,
    private typeEvidenS: TypeBillingEvidenceService,
  ) {
  }

  async ngOnInit() {
    if (!this.data) {
      this.data = {
        provider_name: '',
        num_evidence: '',
        ordered_quantity: '',
        sub_total: '',
        vat: '',
        setting_value: '',
        invoice_value: '',
        type_billing_evidence_id: '',

      };
    }
    this.form = this.formBuilder.group({
      provider_name: [this.data.provider_name, Validators.compose([Validators.required])],
      num_evidence: [this.data.num_evidence, Validators.compose([Validators.required])],
      ordered_quantity: [this.data.ordered_quantity, Validators.compose([Validators.required])],
      sub_total: [this.data.sub_total, Validators.compose([Validators.required])],
      vat: [this.data.vat, Validators.compose([Validators.required])],
      setting_value: [this.data.setting_value, Validators.compose([Validators.required])],
      invoice_value: [this.data.invoice_value, Validators.compose([Validators.required])],
      type_billing_evidence_id: [this.data.type_billing_evidence_id, Validators.compose([Validators.required])],

    });

    await this.typeEvidenS.GetCollection().then(x => {
      this.type_billing_evidence = x;
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
        this.BillingS.Update({
          id: this.data.id,
          provider_name: this.form.controls.provider_name.value,
          num_evidence: this.form.controls.num_evidence.value,
          ordered_quantity: this.form.controls.ordered_quantity.value,
          sub_total: this.form.controls.sub_total.value,
          vat: this.form.controls.vat.value,
          setting_value: this.form.controls.setting_value.value,
          invoice_value: this.form.controls.invoice_value.value,
          type_billing_evidence_id: this.form.controls.type_billing_evidence_id.value,
          pharmacy_stock_id: 1,

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
        this.BillingS.Save({
          provider_name: this.form.controls.provider_name.value,
          num_evidence: this.form.controls.num_evidence.value,
          ordered_quantity: this.form.controls.ordered_quantity.value,
          sub_total: this.form.controls.sub_total.value,
          vat: this.form.controls.vat.value,
          setting_value: this.form.controls.setting_value.value,
          invoice_value: this.form.controls.invoice_value.value,
          type_billing_evidence_id: this.form.controls.type_billing_evidence_id.value,
          pharmacy_stock_id: 1,

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
