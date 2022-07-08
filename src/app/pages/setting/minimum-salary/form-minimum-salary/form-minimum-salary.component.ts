import { Component, OnInit, Input } from '@angular/core';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
// import {StatusBusinessService} from '../../../../business-controller/status-business.service';
import {MinimumSalaryService} from '../../../../business-controller/minimum-salary.service';
import {StatusBusinessService} from '../../../../business-controller/status-business.service';


@Component({
  selector: 'ngx-form-minimum-salary',
  templateUrl: './form-minimum-salary.component.html',
  styleUrls: ['./form-minimum-salary.component.scss']
})
export class FormMinimumSalaryComponent implements OnInit {

  @Input() title: string;
  @Input() data:any = null;

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public disable: boolean = false;

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private MinimumSalaryS: MinimumSalaryService,
    private toastService: NbToastrService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        value: '',
        year: '',
      };
    } else {
      this.disable = true;
    }
    
    this.form = this.formBuilder.group({      
      value: [this.data.value, Validators.compose([Validators.required])],
      year: [this.data.year, Validators.compose([Validators.required])],
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
        this.MinimumSalaryS.Update({
          id: this.data.id,
          value: this.form.controls.value.value,
          year: this.form.controls.year.value,
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
        
        this.MinimumSalaryS.Save({
          value: this.form.controls.value.value,
          year: this.form.controls.year.value,
        }).then(x => {
          this.toastService.success('', x.message);
          this.close();
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
          this.toastService.danger(x, 'Error');
        });
      }

    }
  }

}
