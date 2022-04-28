import { CurrencyPipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { BillingStockService } from '../../../../business-controller/billing-stock.service';
import { BillingService } from '../../../../business-controller/billing.service';
import { PharmacyLotService } from '../../../../business-controller/pharmacy-lot.service';


@Component({
  selector: 'ngx-form-pharmacy-lot',
  templateUrl: './form-pharmacy-lot.component.html',
  styleUrls: ['./form-pharmacy-lot.component.scss']
})
export class FormPharmacyLotComponent implements OnInit {

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
  public billing_stock_id: any[];
  public billing_id: any[];
  public selectedOptions: any[] = [];
  public billing_value;
  public bill_value;

  constructor(
    private formBuilder: FormBuilder,
    private pharmalotS: PharmacyLotService,
    private productS: BillingStockService,
    private billingS: BillingService,
    private toastService: NbToastrService,
    private currency: CurrencyPipe,


  ) {
  }

  async ngOnInit() {
    if (!this.data) {
      this.data = {
        enter_amount: '',
        unit_value: '',
        lot: '',
        expiration_date: '',
        billing_id: '',
        billing_stock_id: '',
      };
    }

    this.form = this.formBuilder.group({
      enter_amount: [this.data.enter_amount, Validators.compose([Validators.required])],
      unit_value: [this.data.unit_value, Validators.compose([Validators.required])],
      lot: [this.data.lot, Validators.compose([Validators.required])],
      expiration_date: [this.data.expiration_date, Validators.compose([Validators.required])],
      billing_id: [this.data.billing_id, Validators.compose([Validators.required])],
      billing_stock_id: [this.data.billing_stock_id, Validators.compose([Validators.required])],
    });


    await this.billingS.GetCollection({ status_id: 1 }).then(x => {
      this.billing_id = x;
    });

  }

  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;

      if (this.data.id) {
        await this.pharmalotS.Update({
          id: this.data.id,
          enter_amount: this.form.controls.enter_amount.value,
          unit_value: this.form.controls.unit_value.value,
          lot: this.form.controls.lot.value,
          expiration_date: this.form.controls.expiration_date.value,
          billing_id: this.form.controls.billing_id.value,
          billing_stock_id: this.form.controls.billing_stock_id.value,
          pharmacy_stock_id: 1,

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
        await this.pharmalotS.Save({
          enter_amount: this.form.controls.enter_amount.value,
          unit_value: this.form.controls.unit_value.value,
          lot: this.form.controls.lot.value,
          expiration_date: this.form.controls.expiration_date.value,
          billing_id: this.form.controls.billing_id.value,
          billing_stock_id: this.form.controls.billing_stock_id.value,
          pharmacy_stock_id: 1,

        }).then(x => {
          this.toastService.success('', x.message);
          this.messageEvent.emit(true);
          this.form.setValue({ enter_amount: '', lot: '', expiration_date: '', billing_stock_id: '' });
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

  async BillingSelect(event) {
    this.billing_stock_id = [];
    this.form.controls.billing_stock_id.setValue('');
    this.billing_id.forEach(x => {
      if (x.id == event) {
        this.billing_value = this.currency.transform(x.invoice_value);
      }
    });
    await this.productS.GetCollection({ status_id: 1, billing_id: event }).then(x => {
      this.billing_stock_id = x;
    });
  }
  ProdSelect(event) {
    this.billing_stock_id.forEach(x => {
      if (x.id == event) {
        this.bill_value = x.amount;
        //    (selectedChange)="ProdSelect($event)"
      }
    });
  }
}
