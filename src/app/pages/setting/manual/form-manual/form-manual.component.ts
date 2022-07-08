import { Component, OnInit, Input } from '@angular/core';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
// import {StatusBusinessService} from '../../../../business-controller/status-business.service';
import {ManualService} from '../../../../business-controller/manual.service';
import {StatusBusinessService} from '../../../../business-controller/status-business.service';



@Component({
  selector: 'ngx-form-manual',
  templateUrl: './form-manual.component.html',
  styleUrls: ['./form-manual.component.scss']
})
export class FormManualComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Input() dataClon: any = null;

  public form: FormGroup;
  public region_id: number;
  // public status: Status[];
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public status: any [];
  public typemanual:"0";


  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    // private statusBS: StatusBusinessService,
    private ManualS: ManualService,
    private StatusS: StatusBusinessService,
    private toastService: NbToastrService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        name: '',
        year: '',
        type_manual: '',
        status_id: '',
      };
    }

    // this.statusBS.GetCollection().then(x => {
    //   this.status = x;
    // });
    
    this.StatusS.GetCollection().then(x => {
      this.status=x;
    });
    
    this.form = this.formBuilder.group({      
      name: [this.data.name, Validators.compose([Validators.required])],
      year: [this.data.year, Validators.compose([Validators.required])],
      type_manual: [this.data.type_manual, Validators.compose([Validators.required])],
      status_id: [this.data.status_id, Validators.compose([Validators.required])],
    });

  }
  

  close() {
    this.dialogRef.close();
  }

  clone() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;

      if (this.dataClon.id) {
        this.ManualS.Clone({
          id: this.data.id,
          name: this.form.controls.name.value,
          year: this.form.controls.year.value,
          type_manual: this.form.controls.type_manual.value,
          status_id: this.form.controls.status_id.value,
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

  save() {

    this.isSubmitted = true;

    if (!this.form.invalid) {
      this.loading = true;

      if (this.data.id) {
        this.ManualS.Update({
          id: this.data.id,
          name: this.form.controls.name.value,
          year: this.form.controls.year.value,
          type_manual: this.form.controls.type_manual.value,
          status_id: this.form.controls.status_id.value,
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
        
        this.ManualS.Save({
          name: this.form.controls.name.value,
          year: this.form.controls.year.value,
          type_manual: this.form.controls.type_manual.value,
          status_id: this.form.controls.status_id.value,
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
