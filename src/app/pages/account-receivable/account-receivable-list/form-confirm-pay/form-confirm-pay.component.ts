import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountReceivableService } from '../../../../business-controller/account-receivable.service';


@Component({
  selector: 'ngx-form-confirm-pay',
  templateUrl: './form-confirm-pay.component.html',
  styleUrls: ['./form-confirm-pay.component.scss']
})
export class FormConfirmPayComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private toastService: NbToastrService,
    private formBuilder: FormBuilder,
    private AccountReceivableS: AccountReceivableService,
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({});
  }


  close() {
    this.dialogRef.close();
  }

  save() {

    this.isSubmitted = true;

    this.loading = true;

    if (this.data.id) {
      this.AccountReceivableS.Update({
        id: this.data.id,
        file_payment: this.data.file_payment,
        gross_value_activities: this.data.gross_value_activities,
        source_retention: this.data.source_retention,
        ica_retention: this.data.ica_retention,
        net_value_activities: this.data.net_value_activities,
        user_id: this.data.user_id,
        status_bill_id: 3,
        minimum_salary_id: this.data.minimum_salary_id,
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
