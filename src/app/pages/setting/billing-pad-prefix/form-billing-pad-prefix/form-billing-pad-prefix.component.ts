import { Component, OnInit, Input } from '@angular/core';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
// import {StatusBusinessService} from '../../../../business-controller/status-business.service';
import {BillingPadPrefixService} from '../../../../business-controller/billing-pad-prefix.service';
import {StatusBusinessService} from '../../../../business-controller/status-business.service';


@Component({
  selector: 'ngx-form-billing-pad-prefix',
  templateUrl: './form-billing-pad-prefix.component.html',
  styleUrls: ['./form-billing-pad-prefix.component.scss']
})
export class FormBillingPadPrefixComponent implements OnInit {

  @Input() title: string;
  @Input() data:any = null;

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private BillingPadPrefixS: BillingPadPrefixService,
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
      name: [this.data.name, Validators.compose([Validators.required])],
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
        this.BillingPadPrefixS.Update({
          id: this.data.id,
          name: this.form.controls.name.value,
        }).then(x => {
          this.toastService.success('', x.message);
          this.close();
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          this.toastService.danger(x, 'ERROR');
          this.isSubmitted = false;
          this.loading = false;
        });
      } else {
        
        this.BillingPadPrefixS.Save({
          name: this.form.controls.name.value,
        }).then(x => {
          this.toastService.success('', x.message);
          this.close();
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          this.toastService.danger(x, 'ERROR');
          this.isSubmitted = false;
          this.loading = false;
        });
      }

    }
  }

}
