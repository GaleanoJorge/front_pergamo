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
import {PbsTypeService} from '../../../../business-controller/pbs-type.service';
import {PurposeServiceService} from '../../../../business-controller/purpose-service.service';
import {ProcedureTypeService} from '../../../../business-controller/procedure-type.service';


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
  public procedure_category: any [];
  public gender: any [];
  public procedure_age: any [];
  public procedure_purpose: any [];
  public purpose_service: any [];
  public procedure_type: any [];
  public pbs_type: any [];
  public status: any [];
  public procedure_cups: any[];
  public showSelect: Boolean = false;


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
    private statusS: StatusBusinessService,
    private PbsTypeS: PbsTypeService,
    private PurposeServiceS: PurposeServiceService,
    private ProcedureTypeS: ProcedureTypeService,
  ) {
  }

  async ngOnInit() {
    if (!this.data) {
      this.data = {
        code: '',
        equivalent: '',
        name: '',
        procedure_category_id: '',
        pbs_type_id: '',
        procedure_age_id: '',
        gender_id: '',
        status_id: '',
        procedure_purpose_id: '',
        purpose_service_id:'',
        procedure_type_id:'',
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
      procedure_category_id: [this.data.procedure_category_id, Validators.compose([Validators.required])],
      pbs_type_id: [this.data.pbs_type_id, Validators.compose([Validators.required])],
      procedure_age_id: [this.data.procedure_age_id, Validators.compose([Validators.required])],
      gender_id: [this.data.gender_id, Validators.compose([Validators.required])],
      status_id: [this.data.status_id, Validators.compose([Validators.required])],
      procedure_purpose_id: [this.data.procedure_purpose_id, Validators.compose([Validators.required])],
      purpose_service_id: [this.data.purpose_service_id, Validators.compose([Validators.required])],
      procedure_type_id: [this.data.procedure_type_id, Validators.compose([Validators.required])],
      time: [this.data.time, Validators.compose([Validators.required])],
    });

    await this.ProcedureCategoryS.GetCollection().then(x => {
      this.procedure_category=x;
    });
    await this.GenderS.GetCollection().then(x => {
      this.gender=x;
    });
    await this.ProcedureAgeS.GetCollection().then(x => {
      this.procedure_age=x;
    });
    await this.ProcedurePurposeS.GetCollection().then(x => {
      this.procedure_purpose=x;
    });

    await this.statusS.GetCollection().then(x => {
      this.status=x;
    });
    await this.PbsTypeS.GetCollection().then(x => {
      this.pbs_type=x;
    });
    await this.PurposeServiceS.GetCollection().then(x => {
      this.purpose_service=x;
    });
    await this.ProcedureTypeS.GetCollection().then(x => {
      this.procedure_type=x;
    });
    await this.ProcedureS.GetCollection().then(x => {
      this.procedure_cups=x;
    });
  }
  onChange(tipoId) {
    if(tipoId==1){
      this.form.controls.equivalent.disable();
      this.showSelect=false;
    }else{
      this.showSelect=true;
      this.form.controls.equivalent.disable();
    }
}

public saveCode(e): void {
  this.form.controls.equivalent.setValue(e.target.value);

}
  cups() {
    this.form.controls.equivalent.setValue(this.form.controls.code.value);
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
          procedure_category_id: this.form.controls.procedure_category_id.value,
          pbs_type_id: this.form.controls.pbs_type_id.value,
          procedure_age_id: this.form.controls.procedure_age_id.value,
          gender_id: this.form.controls.gender_id.value,
          status_id: this.form.controls.status_id.value,
          procedure_purpose_id: this.form.controls.procedure_purpose_id.value,
          purpose_service_id: this.form.controls.purpose_service_id.value,
          procedure_type_id: this.form.controls.procedure_type_id.value,
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
          procedure_category_id: this.form.controls.procedure_category_id.value,
          pbs_type_id: this.form.controls.pbs_type_id.value,
          procedure_age_id: this.form.controls.procedure_age_id.value,
          gender_id: this.form.controls.gender_id.value,
          status_id: this.form.controls.status_id.value,
          procedure_purpose_id: this.form.controls.procedure_purpose_id.value,
          purpose_service_id: this.form.controls.purpose_service_id.value,
          procedure_type_id: this.form.controls.procedure_type_id.value,
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
