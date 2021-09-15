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
        code: '',
        equivalent: '',
        name: '',
        category_id: '',
        nopos: '',
        age_id: '',
        gender_id: '',
        status_id: '',
        purpose_id: '',
        time: ''

      };   
    }

    // this.statusBS.GetCollection().then(x => {
    //   this.status = x;
    // });
    
    
    this.form = this.formBuilder.group({      
      code: [this.data.code, Validators.compose([Validators.required])],
      equivalent: [this.data.equivalent, Validators.compose([Validators.required])],
      name: [this.data.name, Validators.compose([Validators.required])],
      category_id: [this.data.category_id, Validators.compose([Validators.required])],
      nopos: [this.data.nopos, Validators.compose([Validators.required])],
      age_id: [this.data.age, Validators.compose([Validators.required])],
      gender_id: [this.data.gender_id, Validators.compose([Validators.required])],
      status_id: [this.data.status_id, Validators.compose([Validators.required])],
      purpose_id: [this.data.purpose_id, Validators.compose([Validators.required])],
      time: [this.data.time, Validators.compose([Validators.required])],
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
          code: this.form.controls.code.value,
          equivalent: this.form.controls.equivalent.value,
          name: this.form.controls.name.value,
          category_id: this.form.controls.category_id.value,
          nopos: this.form.controls.nopos.value,
          age_id: this.form.controls.age_id.value,
          gender_id: this.form.controls.gender_id.value,
          status_id: this.form.controls.status_id.value,
          purpose_id: this.form.controls.purpose_id.value,
          time: this.form.controls.time.value,

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
          code: this.form.controls.code.value,
          equivalent: this.form.controls.equivalent.value,
          name: this.form.controls.name.value,
          category_id: this.form.controls.category_id.value,
          nopos: this.form.controls.nopos.value,
          age_id: this.form.controls.age_id.value,
          gender_id: this.form.controls.gender_id.value,
          status_id: this.form.controls.status_id.value,
          purpose_id: this.form.controls.purpose_id.value,
          time: this.form.controls.time.value,
          
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
