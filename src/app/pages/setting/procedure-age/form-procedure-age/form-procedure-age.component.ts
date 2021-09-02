import { Component, OnInit, Input } from '@angular/core';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
// import {StatusBusinessService} from '../../../../business-controller/status-business.service';
import {ProcedureAgeService} from '../../../../business-controller/procedure-age.service';


@Component({
  selector: 'ngx-form-procedure-age',
  templateUrl: './form-procedure-age.component.html',
  styleUrls: ['./form-procedure-age.component.scss']
})
export class FormProcedureAgeComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;

  public form: FormGroup;
  public region_id: number;
  // public status: Status[];
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    // private statusBS: StatusBusinessService,
    private ProcedureAgeS: ProcedureAgeService,
    private toastService: NbToastrService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        pra_name: '',
        pra_begin: '',
        pra_end: '',
      };
    }

    // this.statusBS.GetCollection().then(x => {
    //   this.status = x;
    // });
    
    
    this.form = this.formBuilder.group({      
      pra_name: [this.data.pra_name, Validators.compose([Validators.required])],
      pra_begin: [this.data.pra_begin, Validators.compose([Validators.required])],
      pra_end: [this.data.pra_end, Validators.compose([Validators.required])],
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
        this.ProcedureAgeS.Update({
          id: this.data.id,
          pra_name: this.form.controls.pra_name.value,
          pra_begin: this.form.controls.pra_begin.value,
          pra_end: this.form.controls.pra_end.value,
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
        
        this.ProcedureAgeS.Save({
          pra_name: this.form.controls.pra_name.value,
          pra_begin: this.form.controls.pra_begin.value,
          pra_end: this.form.controls.pra_end.value,
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
