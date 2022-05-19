import { Component, OnInit, Input } from '@angular/core';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'ngx-form-pre-billing-admission',
  templateUrl: './form-pre-billing-admission.component.html',
  styleUrls: ['./form-pre-billing-admission.component.scss']
})
export class FormPreBillingAdmissionComponent implements OnInit {

  @Input() title: string;
  @Input() data:any = null;

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
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
        // this.PreBillingAdmissionS.Update({
        //   id: this.data.id,
        //   name: this.form.controls.name.value,
        // }).then(x => {
        //   this.toastService.success('', x.message);
        //   this.close();
        //   if (this.saved) {
        //     this.saved();
        //   }
        // }).catch(x => {
        //   this.isSubmitted = false;
        //   this.loading = false;
        // });
      } else {
        
        // this.PreBillingAdmissionS.Save({
        //   name: this.form.controls.name.value,
        // }).then(x => {
        //   this.toastService.success('', x.message);
        //   this.close();
        //   if (this.saved) {
        //     this.saved();
        //   }
        // }).catch(x => {
        //   this.isSubmitted = false;
        //   this.loading = false;
        // });
      }

    }
  }

}
