import { Component, OnInit, Input } from '@angular/core';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
// import {StatusBusinessService} from '../../../../business-controller/status-business.service';
import {ProcedureService} from '../../../../business-controller/procedure.service';
import {ProcedureCategoryService} from '../../../../business-controller/procedure-category.service';
import { GenderBusinessService} from '../../../../business-controller/gender-business.service';
import {ProcedureAgeService} from '../../../../business-controller/procedure-age.service';
import {ProcedurePurposeService} from '../../../../business-controller/procedure-purpose.service';
import {StatusBusinessService} from '../../../../business-controller/status-business.service';



@Component({
  selector: 'ngx-form-procedure',
  templateUrl: './form-procedure.component.html',
  styleUrls: ['./form-procedure.component.scss']
})
export class FormProcedureComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;

  public form: FormGroup;
  public region_id: number;
  // public status: Status[];
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public category: any [];
  public gender: any [];
  public age: any [];
  public purpose: any [];
  public status: any [];


  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    // private statusBS: StatusBusinessService,
    private ProcedureS: ProcedureService,
    private toastService: NbToastrService,
    private  ProcedureCategoryS: ProcedureCategoryService,
    private GenderS: GenderBusinessService,
    private ProcedureAgeS: ProcedureAgeService,
    private ProcedurePurposeS: ProcedurePurposeService,
    private statusS: StatusBusinessService
  ) {
  }

  async ngOnInit() {
    if (!this.data) {
      this.data = {
        prd_code: '',
        prd_equivalent: '',
        prd_name: '',
        prd_category: '',
        prd_nopos: '',
        prd_age: '',
        prd_gender: '',
        prd_state: '',
        prd_purpose: '',
        prd_time: ''

      };   
    }

    // this.statusBS.GetCollection().then(x => {
    //   this.status = x;
    // });
    
    
    this.form = this.formBuilder.group({      
      prd_code: [this.data.prd_code, Validators.compose([Validators.required])],
      prd_equivalent: [this.data.prd_equivalent, Validators.compose([Validators.required])],
      prd_name: [this.data.prd_name, Validators.compose([Validators.required])],
      prd_category: [this.data.prd_category, Validators.compose([Validators.required])],
      prd_nopos: [this.data.prd_nopos, Validators.compose([Validators.required])],
      prd_age: [this.data.prd_age, Validators.compose([Validators.required])],
      prd_gender: [this.data.prd_gender, Validators.compose([Validators.required])],
      prd_state: [this.data.prd_state, Validators.compose([Validators.required])],
      prd_purpose: [this.data.prd_purpose, Validators.compose([Validators.required])],
      prd_time: [this.data.prd_time, Validators.compose([Validators.required])],
    });

    await this.ProcedureCategoryS.GetCollection().then(x => {
      this.category=x;
    });
    await this.GenderS.GetCollection().then(x => {
      this.gender=x;
    });
    await this.ProcedureAgeS.GetCollection().then(x => {
      this.age=x;
    });
    await this.ProcedurePurposeS.GetCollection().then(x => {
      this.purpose=x;
    });

    await this.statusS.GetCollection().then(x => {
      this.status=x;
    });
    console.log (this.age);
  }

  

  close() {
    this.dialogRef.close();
  }

  save() {

    this.isSubmitted = true;

    if (!this.form.invalid) {
      this.loading = true;

      if (this.data.id) {
        this.ProcedureS.Update({
          id: this.data.id,
          prd_code: this.form.controls.prd_code.value,
          prd_equivalent: this.form.controls.prd_equivalent.value,
          prd_name: this.form.controls.prd_name.value,
          prd_category: this.form.controls.prd_category.value,
          prd_nopos: this.form.controls.prd_nopos.value,
          prd_age: this.form.controls.prd_age.value,
          prd_gender: this.form.controls.prd_gender.value,
          prd_state: this.form.controls.prd_state.value,
          prd_purpose: this.form.controls.prd_purpose.value,
          prd_time: this.form.controls.prd_time.value,

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
        
        this.ProcedureS.Save({
          prd_code: this.form.controls.prd_code.value,
          prd_equivalent: this.form.controls.prd_equivalent.value,
          prd_name: this.form.controls.prd_name.value,
          prd_category: this.form.controls.prd_category.value,
          prd_nopos: this.form.controls.prd_nopos.value,
          prd_age: this.form.controls.prd_age.value,
          prd_gender: this.form.controls.prd_gender.value,
          prd_state: this.form.controls.prd_state.value,
          prd_purpose: this.form.controls.prd_purpose.value,
          prd_time: this.form.controls.prd_time.value,
          
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
