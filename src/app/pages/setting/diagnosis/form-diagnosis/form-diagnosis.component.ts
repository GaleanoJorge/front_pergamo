import { Component, OnInit, Input } from '@angular/core';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
// import {StatusBusinessService} from '../../../../business-controller/status-business.service';
import {DiagnosisService} from '../../../../business-controller/diagnosis.service';




  

@Component({
  selector: 'ngx-form-diagnosis',
  templateUrl: './form-diagnosis.component.html',
  styleUrls: ['./form-diagnosis.component.scss']
})
export class FormDiagnosisComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;

  public form: FormGroup;
  public rips_typefile: any[];
  // public status: Status[];
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public coverage:any[];
  public status_diagnosis:any[];
  public pavilion:any[];


  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    // private statusBS: StatusBusinessService,
    private DiagnosisS: DiagnosisService,
    private toastService: NbToastrService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        name: '',
        code: '',
        status_diagnosis_id:'',
        pavilion_id: '',
        diagnosis_or_office:''
      };
    }

    // this.statusBS.GetCollection().then(x => {
    //   this.status = x;
    // });
    
    
    this.form = this.formBuilder.group({      
      name: [this.data.name, Validators.compose([Validators.required])],
      code: [this.data.code, Validators.compose([Validators.required])],
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
        this.DiagnosisS.Update({
          id: this.data.id,
          code: this.form.controls.code.value,
          name: this.form.controls.name.value,
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
        this.DiagnosisS.Save({
          code: this.form.controls.code.value,
          name: this.form.controls.name.value,
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
