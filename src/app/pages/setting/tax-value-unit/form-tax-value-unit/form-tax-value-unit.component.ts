import { Component, OnInit, Input } from '@angular/core';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
// import {StatusBusinessService} from '../../../../business-controller/status-business.service';
import {TaxValueUnitService} from '../../../../business-controller/tax-value-unit.service';
import {StatusBusinessService} from '../../../../business-controller/status-business.service';


@Component({
  selector: 'ngx-form-tax-value-unit',
  templateUrl: './form-tax-value-unit.component.html',
  styleUrls: ['./form-tax-value-unit.component.scss']
})
export class FormTaxValueUnitComponent implements OnInit {

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
    private TaxValueUnitS: TaxValueUnitService,
    private toastService: NbToastrService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        name: '',
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
        this.TaxValueUnitS.Update({
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
        
        this.TaxValueUnitS.Save({
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
