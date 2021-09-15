import { Component, OnInit, Input } from '@angular/core';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
// import {StatusBusinessService} from '../../../../business-controller/status-business.service';
import {FiscalCharacteristicService} from '../../../../business-controller/fiscal-characteristic.service';


@Component({
  selector: 'ngx-form-fiscal-characteristic',
  templateUrl: './form-fiscal-characteristic.component.html',
  styleUrls: ['./form-fiscal-characteristic.component.scss']
})
export class FormFiscalCharacteristicComponent implements OnInit {

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
    private FiscalCharacteristicS: FiscalCharacteristicService,
    private toastService: NbToastrService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        fsc_code: '',
        fsc_name: '',
      };
    }

    // this.statusBS.GetCollection().then(x => {
    //   this.status = x;
    // });
    
    
    this.form = this.formBuilder.group({      
      fsc_code: [this.data.fsc_code, Validators.compose([Validators.required])],
      fsc_name: [this.data.fsc_name, Validators.compose([Validators.required])],
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
        this.FiscalCharacteristicS.Update({
          id: this.data.id,
          fsc_code: this.form.controls.fsc_code.value,
          fsc_name: this.form.controls.fsc_name.value,
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
        
        this.FiscalCharacteristicS.Save({
          fsc_code: this.form.controls.fsc_code.value,
          fsc_name: this.form.controls.fsc_name.value,
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
