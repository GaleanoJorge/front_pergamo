import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import {StatusBusinessService} from '../../../../business-controller/status-business.service';
import { BillingPadService } from '../../../../business-controller/billing-pad.service';


@Component({
  selector: 'ngx-form-create-billing-pgp',
  templateUrl: './form-create-billing-pgp.component.html',
  styleUrls: ['./form-create-billing-pgp.component.scss']
})
export class FormCreateBillingPgpComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private BillingPadS: BillingPadService,
    private toastService: NbToastrService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        name: '',
      };
    }

    this.form = this.formBuilder.group({
    });
  }


  close() {
    this.dialogRef.close();
  }

  save() {

    this.isSubmitted = true;

    if (!this.form.invalid) {
      this.loading = true;

      this.BillingPadS.GeneratePgpBilling({
        id: this.data.id,
      }, this.data.id).then(x => {
        this.toastService.success('', x.message);
        this.close();
        if (this.saved) {
          this.saved();
        }
      }).catch(x => {
        this.toastService.danger(x, 'Error');
        this.isSubmitted = false;
        this.loading = false;
      });

    }
  }

}
