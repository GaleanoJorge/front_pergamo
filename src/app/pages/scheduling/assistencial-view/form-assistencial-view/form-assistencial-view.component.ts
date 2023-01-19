import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import {StatusBusinessService} from '../../../../business-controller/status-business.service';
import { NonWorkingDaysService } from '../../../../business-controller/non-working-days.service';
import { TypeContractService } from '../../../../business-controller/type-contract.service';
import { CopayParametersService } from '../../../../business-controller/copay-parameters.service';
import { CurrencyPipe } from '@angular/common';
import { StatusBusinessService } from '../../../../business-controller/status-business.service';

@Component({
  selector: 'ngx-form-assistencial-view',
  templateUrl: './form-assistencial-view.component.html',
  styleUrls: ['./form-assistencial-view.component.scss'],
})
export class FormAssistencialViewComponent implements OnInit {
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
    private CopayParametersS: CopayParametersService
  ) {}

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        type_contract_id: '',
        category: '',
        value: '',
        status_id: '',
      };
    }

    this.form = this.formBuilder.group({
      type_contract_id: [
        this.data.type_contract_id,
        Validators.compose([Validators.required]),
      ],
      category: [this.data.category, Validators.compose([Validators.required])],
      value: [this.data.value, Validators.compose([Validators.required])],
      status_id: [
        this.data.status_id == '' ? 1 : this.data.status_id ,
        Validators.compose([Validators.required]),
      ],
    });

    this.typeContractS.GetCollection().then((x) => {
      this.type_contracts = x;
    });

    this.StatusS.GetCollection().then((x) => {
      this.status = x;
    });
  }

  Moneyformat(e){
    console.log(e);
    var num = Number(e.target.value);
    if(num != NaN){
      this.value = num;
      this.form.patchValue({
        value: this.currency.transform(num),
      });
    }else{
      this.value = undefined;
      this.form.controls.value.setErrors({incorrect: true});
    }
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
          type_contract_id: this.form.controls.type_contract_id.value,
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
          type_contract_id: this.form.controls.type_contract_id.value,
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
      }
    }
  }
}
