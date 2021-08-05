import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {BudgetPaymentsBussinesService} from '../../../../business-controller/budget-payments-bussines.service';

@Component({
  selector: 'ngx-form-payments',
  templateUrl: './form-payments.component.html',
  styleUrls: ['./form-payments.component.scss'],
})
export class FormPaymentsComponent implements OnInit {
  @Input() title = null;
  @Input() contract_id = null;
  @Input() data = null;
  @Input() refreshData = null;

  public isSubmitted = false;
  public form: FormGroup;
  public messageError = null;
  public loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private dialogRef: NbDialogRef<any>,
    private paymentBS: BudgetPaymentsBussinesService,
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      contract_id: [this.contract_id, Validators.compose([Validators.required])],
      code: [this.data?.code, Validators.compose([Validators.required])],
      date_code: [this.data?.date_code, Validators.compose([Validators.required])],
      code_technical_concept: [this.data?.code_technical_concept, Validators.compose([Validators.required])],
      date_technical_concept: [this.data?.date_technical_concept, Validators.compose([Validators.required])],
      value_payment: [this.data?.value_payment, Validators.compose([Validators.required])],
    });
  }

  async Save() {
    this.isSubmitted = true;

    if (this.form.invalid) return false;

    try {
      let response;
      const data = {
        ...this.form.value,
      };

      if (this.data?.id) {
        response = await this.paymentBS.Update(data, this.data.id);
      } else {
        response = await this.paymentBS.Save(data);
      }

      this.toastService.success('', response.message);

      if (this.refreshData) this.refreshData();
      this.close();

    } catch (e) {
      this.messageError = e;
    }
  }

  public close() {
    this.dialogRef.close();
  }

}
