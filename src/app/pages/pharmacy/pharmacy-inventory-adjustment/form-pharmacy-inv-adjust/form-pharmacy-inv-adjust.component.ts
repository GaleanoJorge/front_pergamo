import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserChangeService } from '../../../../business-controller/user-change.service';
import { PharmacyAdjustmentService } from '../../../../business-controller/pharmacy-adjustment.service';
import { PharmacyLotStockService } from '../../../../business-controller/pharmacy-lot-stock.service';

@Component({
  selector: 'ngx-form-pharmacy-inv-adjust',
  templateUrl: './form-pharmacy-inv-adjust.component.html',
  styleUrls: ['./form-pharmacy-inv-adjust.component.scss']
})
export class FormPharmacyInvAdjustComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public pharmacy_adjustment_id: any[];

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    public userChangeS: UserChangeService,
    private PharmacyLotStockS: PharmacyLotStockService,
    private PharmacyAdjustmentS: PharmacyAdjustmentService
  ) {
  }

  async ngOnInit() {
    if (!this.data) {
      this.data = {
        amount: '',
        pharmacy_adjustment_id: '',
        sign: '',
        observation: '',
      };
    }
    this.form = this.formBuilder.group({
      amount: [this.data.amount, Validators.compose([Validators.required])],
      pharmacy_adjustment_id: [this.data.pharmacy_adjustment_id, Validators.compose([Validators.required])],
      sign: [this.data.sign, Validators.compose([Validators.required])],
      observation: [this.data.observation, Validators.compose([Validators.required])],
    });

    await this.PharmacyAdjustmentS.GetCollection().then(x => {
      this.pharmacy_adjustment_id = x;
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
        this.PharmacyLotStockS.updateInvAdjustment({
          id: this.data.id,
          pharmacy_lot_stock_id: this.data.id,
          amount: this.form.controls.amount.value,
          sign: this.form.controls.sign.value,
          observation: this.form.controls.observation.value,
          pharmacy_adjustment_id: this.form.controls.pharmacy_adjustment_id.value,
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