import { Component, OnInit, Input } from '@angular/core';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
// import {StatusBusinessService} from '../../../../business-controller/status-business.service';
import { NonWorkingDaysService } from '../../../../business-controller/non-working-days.service';


 
@Component({
  selector: 'ngx-form-non-working-days',
  templateUrl: './form-non-working-days.component.html',
  styleUrls: ['./form-non-working-days.component.scss']
})
export class FormNonWorkingDaysComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;

  public form: FormGroup;
  public rips_typefile: any[];
  // public status: Status[];
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
 



  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private NonWorkingDaysS: NonWorkingDaysService,
    private toastService: NbToastrService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        day: '',
        description: ''
      };
    }

    this.form = this.formBuilder.group({      
      day: [this.data.day, Validators.compose([Validators.required])],
      description: [this.data.description, Validators.compose([Validators.required])],
    });
  }

  close(){
    this.dialogRef.close();
  }
  save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
    this.loading = true;
      if (this.data.id) {
        this.NonWorkingDaysS.Update({
          id: this.data.id,
          day: this.form.controls.day.value,
          description: this.form.controls.description.value,
        }).then(x => {
          this.toastService.success('', x.message);
          this.dialogRef.close();
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      } else {
        this.NonWorkingDaysS.Save({
          day: this.form.controls.day.value,
          description: this.form.controls.description.value,
        }).then(x => {
          this.toastService.success('', x.message);
          this.dialogRef.close();
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
