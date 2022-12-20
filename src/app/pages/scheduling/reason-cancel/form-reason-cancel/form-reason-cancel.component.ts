import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import {StatusBusinessService} from '../../../../business-controller/status-business.service';
import { NonWorkingDaysService } from '../../../../business-controller/non-working-days.service';
import { TypeContractService } from '../../../../business-controller/type-contract.service';
import { CopayParametersService } from '../../../../business-controller/copay-parameters.service';
import { CurrencyPipe } from '@angular/common';
import { StatusBusinessService } from '../../../../business-controller/status-business.service';
import { ReasonCancelService } from '../../../../business-controller/reason-cancel.service';

@Component({
  selector: 'ngx-form-reason-cancel',
  templateUrl: './form-reason-cancel.component.html',
  styleUrls: ['./form-reason-cancel.component.scss'],
})
export class FormReasonCancelComponent implements OnInit {
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
    private ReasonCancelS: ReasonCancelService,
    private CopayParametersS: CopayParametersService
  ) {}

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        name: '',
        status_id: '',
      };
    }

    this.form = this.formBuilder.group({
      name: [this.data.value, Validators.compose([Validators.required])],
      status_id: [
        this.data.status_id == '' ? 1 : this.data.status_id ,
        Validators.compose([Validators.required]),
      ],
    });

    this.StatusS.GetCollection().then((x) => {
      this.status = x;
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
        this.ReasonCancelS.Update({
          id: this.data.id,
          name: this.form.controls.name.value,
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
        this.ReasonCancelS.Save({
          name: this.form.controls.name.value,
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
