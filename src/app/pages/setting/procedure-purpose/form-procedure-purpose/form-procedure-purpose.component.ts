import { Component, OnInit, Input } from '@angular/core';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
// import {StatusBusinessService} from '../../../../business-controller/status-business.service';
import {ProcedurePurposeService} from '../../../../business-controller/procedure-purpose.service';


@Component({
  selector: 'ngx-form-procedure-purpose',
  templateUrl: './form-procedure-purpose.component.html',
  styleUrls: ['./form-procedure-purpose.component.scss']
})
export class FormProcedurePurposeComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;

  public form: FormGroup;
  // public status: Status[];
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    // private statusBS: StatusBusinessService,
    private ProcedurePurposeS: ProcedurePurposeService,
    private toastService: NbToastrService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        prp_name: '',
        prp_code: '',
        
      };
    }

    // this.statusBS.GetCollection().then(x => {
    //   this.status = x;
    // });
    
    
    this.form = this.formBuilder.group({      
      prp_name: [this.data.prp_name, Validators.compose([Validators.required])],
      prp_code: [this.data.prp_code, Validators.compose([Validators.required])],

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
        this.ProcedurePurposeS.Update({
          id: this.data.id,
          prp_name: this.form.controls.prp_name.value,
          prp_code: this.form.controls.prp_code.value,
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
        
        this.ProcedurePurposeS.Save({
          prp_name: this.form.controls.prp_name.value,
          prp_code: this.form.controls.prp_code.value,

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
