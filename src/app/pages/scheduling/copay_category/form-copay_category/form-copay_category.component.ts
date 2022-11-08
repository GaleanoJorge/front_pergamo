import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import {StatusBusinessService} from '../../../../business-controller/status-business.service';
import { NonWorkingDaysService } from '../../../../business-controller/non-working-days.service';
import { TypeContractService } from '../../../../business-controller/type-contract.service';
import { CopayParametersService } from '../../../../business-controller/copay-parameters.service';
import { CurrencyPipe, PercentPipe  } from '@angular/common';
import { StatusBusinessService } from '../../../../business-controller/status-business.service';
import { disable } from '@rxweb/reactive-form-validators';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

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

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private NonWorkingDaysS: NonWorkingDaysService,
    private toastService: NbToastrService,
    private typeContractS: TypeContractService,
    private StatusS: StatusBusinessService,
    private currency: CurrencyPipe,
    private percent: PercentPipe,
    private CopayParametersS: CopayParametersService
  ) {}

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        payment_type: '',
        category: '',
        value: '',
        status_id: '',
      };
    }

    this.form = this.formBuilder.group({
      payment_type: [
        String(this.data.payment_type),
        Validators.compose([Validators.required]),
      ],
      category: [
        {
          value: this.data.category,
          disabled: this.data.payment_type == 3 ? true : false,
        },
        Validators.compose([Validators.required]),
      ],
      value: [
        {
          value: this.data.value,
          disabled: this.data.payment_type == 3 ? true : false,
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

    this.onChanges();
  }

  onChanges() {
    this.form.get('payment_type').valueChanges.subscribe((val) => {
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

  Moneyformat(e) {
    console.log(e);
    var num = Number(e);
    if (num != NaN) {
      this.value = this.form.controls.payment_type.value == 2 ? num/100 : num;
      this.form.patchValue({
          value: this.form.controls.payment_type.value == 2 ?  this.percent.transform(this.value) : this.currency.transform(num),
      });
    } else {
      this.value = undefined;
      this.form.controls.value.setErrors({ incorrect: true });
    }
    return this.value;
  }

  close() {
    this.dialogRef.close();
  }
  save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      if (this.data.id) {
        this.CopayParametersS.Update({
          id: this.data.id,
          payment_type: this.form.controls.payment_type.value,
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
          payment_type: this.form.controls.payment_type.value,
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
