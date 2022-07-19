import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import {StatusBusinessService} from '../../../../business-controller/status-business.service';
import { BillingPadConsecutiveService } from '../../../../business-controller/billing-pad-consecutive.service';
import { StatusBusinessService } from '../../../../business-controller/status-business.service';
import { BillingPadPrefixService } from '../../../../business-controller/billing-pad-prefix.service';


@Component({
  selector: 'ngx-form-billing-pad-consecutive',
  templateUrl: './form-billing-pad-consecutive.component.html',
  styleUrls: ['./form-billing-pad-consecutive.component.scss']
})
export class FormBillingPadConsecutiveComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public show_status: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public status: any = [
    {
      name: 'ACTIVO',
      id: 1
    },
    {
      name: 'INACTIVO',
      id: 2
    },
  ];
  public billing_pad_prefix: any = null;

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private BillingPadConsecutiveS: BillingPadConsecutiveService,
    private toastService: NbToastrService,
    private BillingPadPrefixS: BillingPadPrefixService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        status_id: '',
        resolution: '',
        expiracy_date: '',
        final_consecutive: '',
        initial_consecutive: '',
        billing_pad_prefix_id: '',
      };

      
    } else {
      this.show_status = true;
    }

    this.form = this.formBuilder.group({
      status_id: [this.data.status_id],
      resolution: [this.data.resolution, Validators.compose([Validators.required])],
      expiracy_date: [this.data.expiracy_date, Validators.compose([Validators.required])],
      final_consecutive: [this.data.final_consecutive, Validators.compose([Validators.required])],
      initial_consecutive: [this.data.initial_consecutive, Validators.compose([Validators.required])],
      billing_pad_prefix_id: [this.data.billing_pad_prefix_id, Validators.compose([Validators.required])],
    });

    this.BillingPadPrefixS.GetCollection().then( x => {
      this.billing_pad_prefix = x;
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
        this.BillingPadConsecutiveS.Update({
          id: this.data.id,
          status_id: this.form.controls.status_id.value,
          resolution: this.form.controls.resolution.value,
          expiracy_date: this.form.controls.expiracy_date.value,
          final_consecutive: this.form.controls.final_consecutive.value,
          initial_consecutive: this.form.controls.initial_consecutive.value,
          billing_pad_prefix_id: this.form.controls.billing_pad_prefix_id.value,
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

        this.BillingPadConsecutiveS.Save({
          status_id: 1,
          resolution: this.form.controls.resolution.value,
          expiracy_date: this.form.controls.expiracy_date.value,
          final_consecutive: this.form.controls.final_consecutive.value,
          initial_consecutive: this.form.controls.initial_consecutive.value,
          billing_pad_prefix_id: this.form.controls.billing_pad_prefix_id.value,
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
