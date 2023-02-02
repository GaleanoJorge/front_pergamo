import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import {StatusBusinessService} from '../../../../business-controller/status-business.service';
import { NonWorkingDaysService } from '../../../../business-controller/non-working-days.service';
import { TypeContractService } from '../../../../business-controller/type-contract.service';
import { CopayParametersService } from '../../../../business-controller/copay-parameters.service';
import { CurrencyPipe, PercentPipe } from '@angular/common';
import { StatusBusinessService } from '../../../../business-controller/status-business.service';
import { disable } from '@rxweb/reactive-form-validators';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { PaymentTypeService } from '../../../../business-controller/payment-type.service';

@Component({
  selector: 'ngx-form-copay_category',
  templateUrl: './form-copay_category.component.html',
  styleUrls: ['./form-copay_category.component.scss'],
})
export class FormCopayCategoryComponent implements OnInit {
  @Input() title: string;
  @Input() data: any = null;

  public form: FormGroup;
  public rips_typefile: any[];
  // public status: Status[];
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public type_contracts: any[] = [];
  public status: any[] = [];
  public value;
  public paymentType: any[] = [];

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private NonWorkingDaysS: NonWorkingDaysService,
    private toastService: NbToastrService,
    private typeContractS: TypeContractService,
    private StatusS: StatusBusinessService,
    private currency: CurrencyPipe,
    private percent: PercentPipe,
    private CopayParametersS: CopayParametersService,
    private paymenTypeS: PaymentTypeService
  ) { }

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        category: '',
        value: '',
        status_id: '',
        payment_type_id: ''
      };
    } else {
      if (this.data.payment_type_id == 2) {
        this.data.value = this.data.value * 100;
      }
      this.data.value = this.data.value.toString();
    }

    this.form = this.formBuilder.group({
      payment_type_id: [
        this.data.payment_type_id,
        Validators.compose([Validators.required]),
      ],
      category: [
        {
          value: this.data.category,
          disabled: this.data.payment_type_id == 3 ? true : false,
        },
        Validators.compose([Validators.required]),
      ],
      value: [
        {
          value: this.data.value,
          disabled: this.data.payment_type_id == 3 ? true : false,
        },
        Validators.compose([Validators.required]),
      ],
      status_id: [
        this.data.status_id == '' ? 1 : this.data.status_id,
        Validators.compose([Validators.required]),
      ],
    });

    this.StatusS.GetCollection().then((x) => {
      this.status = x;
    });

    this.paymenTypeS.GetCollection().then((x) => {
      this.paymentType = x;
    })

    this.onChanges();
  }

  onChanges() {
    this.form.get('payment_type_id').valueChanges.subscribe((val) => {
      if (val == 3) {
        this.form.get('category').disable();
        this.form.get('value').disable();
        this.form.patchValue({
          category: 'EXENTO',
          value: 0,
        });
      } else {
        this.form.get('category').enable();
        this.form.get('value').enable();
        this.form.patchValue({
          category: '',
          value: '',
        });
      }
    });

    // this.form.get('value').valueChanges.subscribe(val => {
    //   var num = Number(val);
    //   if (num != NaN) {
    //     this.value = num;
    //     this.form.patchValue({
    //       value: this.form.controls.payment_type.value == 1 ? this.currency.transform(num) : this.percent.transform(num),
    //     });
    //   } else {
    //     this.value = undefined;
    //     this.form.controls.value.setErrors({ incorrect: true });
    //   }
    // });
  }

  validateCharacter(keyChar) {
    if (this.form.controls.payment_type_id.value == 2) {
      if (isNaN(keyChar) && keyChar != '.') {
        return false;
      }
      if (keyChar == '.' && this.form.controls.value.value.includes(".")) {
        return false;
      }
      if (this.form.controls.value.value.length == 1 && this.form.controls.value.value[0] == '0' && keyChar != ".") {
        return false;
      }
      let lengthValue = this.form.controls.value.value.length;
      if (this.form.controls.value.value.includes(".") && this.form.controls.value.value[lengthValue - 1] == '0' && keyChar == "0") {
        return false;
      }
    } else {
      if (isNaN(keyChar) && keyChar != '.') {
        return false;
      }
      if (keyChar == '.' && this.form.controls.value.value.includes(".")) {
        return false;
      }
      if (this.form.controls.value.value.length == 1 && this.form.controls.value.value[0] == '0' && keyChar != ".") {
        return false;
      }
      /*if (isNaN(keyChar)){
        return false;
      }
      if (this.form.controls.value.value.length == 1 && this.form.controls.value.value[0] == '0') {
        return false;
      }*/
    }
  }

  addPercentSign() {
    if (this.form.controls.payment_type_id.value == 2 && !this.form.controls.value.value.includes("%") && this.form.controls.value.value != "") {
      let valueInput = document.getElementById("value") as HTMLInputElement;
      valueInput.value = this.form.controls.value.value + "%";
    }
  }

  removePercentSign() {
    let currentValue = this.form.controls.value.value;
    currentValue = currentValue.replace("%", "");
    this.form.controls.value.setValue(currentValue);
  }

  close() {
    this.dialogRef.close();
  }
  save() {
    if (this.form.controls.payment_type_id.value == 2) {
      let currentValue = this.form.controls.value.value;
      currentValue = currentValue.replace("%", "");
      this.value = currentValue / 100;
    } else {
      this.value = this.form.controls.value.value;
    }

    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      if (this.data.id) {
        this.CopayParametersS.Update({
          id: this.data.id,
          payment_type: this.form.controls.payment_type_id.value,
          category: this.form.controls.category.value,
          value: this.value,
          status_id: this.form.controls.status_id.value,
        })
          .then((x) => {
            this.toastService.success('', x.message);
            this.dialogRef.close();
            if (this.saved) {
              this.saved();
            }
          })
          .catch((x) => {
            this.toastService.warning('', x);
            this.isSubmitted = false;
            this.loading = false;
          });
      } else {
        this.CopayParametersS.Save({
          payment_type: this.form.controls.payment_type_id.value,
          category: this.form.controls.category.value,
          value: this.value ? this.value : 0,
          status_id: this.form.controls.status_id.value,
        })
          .then((x) => {
            this.toastService.success('', x.message);
            this.dialogRef.close();
            if (this.saved) {
              this.saved();
            }
          })
          .catch((x) => {
            this.toastService.warning('', x);
            this.isSubmitted = false;
            this.loading = false;
          });
      }
    }
  }
}
