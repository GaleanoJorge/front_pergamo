import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyService } from '../../../../business-controller/company.service';
import { ObjetionTypeService } from '../../../../business-controller/objetion-type.service';
import { RepeatedInitialService } from '../../../../business-controller/repeated-initial.service';
import { CampusService } from '../../../../business-controller/campus.service';
import { GlossModalityService } from '../../../../business-controller/gloss-modality.service';
import { GlossAmbitService } from '../../../../business-controller/gloss-ambit.service';
import { GlossServiceService } from '../../../../business-controller/gloss-service.service';
import { ObjetionCodeService } from '../../../../business-controller/objetion-code.service';
import { ReceivedByService } from '../../../../business-controller/received-by.service';
import { GlossService } from '../../../../business-controller/gloss.service';
import { UserBusinessService } from '../../../../business-controller/user-business.service';
import { TypeBriefcaseService } from '../../../../business-controller/type-briefcase.service';
import { compare } from '@rxweb/reactive-form-validators';


@Component({
  selector: 'ngx-form-telemedicine',
  templateUrl: './form-telemedicine.component.html',
  styleUrls: ['./form-telemedicine.component.scss'],
})
export class FormTelemedicineComponent implements OnInit {
  @Input() title: string;
  @Input() data:any = null;

  public form: FormGroup;
  public loading: boolean = false;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public objetion_type: any[];
  public repeated_initial: any[];
  public company: any[];
  public campus: any[];
  public gloss_modality: any[];
  public gloss_ambit: any[];
  public gloss_service: any[];
  public objetion_code: any[];
  public received_by: any[];
  public assing_user: any[];
  public code_id;
  public objetion_name;
  public regime: any[];
  public factureValue: any = null;
  public objeted_value: any = null;

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private glossS: GlossService,
    private objetionTypeS: ObjetionTypeService,
    private repeatedInitialS: RepeatedInitialService,
    private companyS: CompanyService,
    private campusS: CampusService,
    private glossModalityS: GlossModalityService,
    private glossAmbitS: GlossAmbitService,
    private glossServiceS: GlossServiceService,
    private objetionCodeS: ObjetionCodeService,
    private receivedByS: ReceivedByService,
    private userS: UserBusinessService,
    private regimeS: TypeBriefcaseService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        id: '',
        invoice_prefix: '',
        invoice_consecutive: '',
        objetion_detail: '',
        regime_id: '',
        received_date: '',
        emission_date: '',
        radication_date: '',
        objetion_type_id: '',
        repeated_initial_id: '',
        company_id: '',
        campus_id: '',
        gloss_modality_id: '',
        gloss_ambit_id: '',
        gloss_service_id: '',
        objetion_code_id: '',
        received_by_id: '',
        assing_user_id: ''
      };
    }

    this.objetionTypeS.GetCollection().then(x => {
      this.objetion_type = x;
    });
    this.repeatedInitialS.GetCollection().then(x => {
      this.repeated_initial = x;
    });
    this.companyS.GetCollection().then(x => {
      this.company = x;
    });
    this.campusS.GetCollection({status_id: 1,}).then(x => {
      this.campus = x;
    });
    this.glossModalityS.GetCollection({ status_id: 1 }).then(x => {
      this.gloss_modality = x;
    });
    this.glossAmbitS.GetCollection({ status_id: 1 }).then(x => {
      this.gloss_ambit = x;
    });
    this.glossServiceS.GetCollection({ status_id: 1 }).then(x => {
      this.gloss_service = x;
    });
    this.objetionCodeS.GetCollection().then(x => {
      this.objetion_code = x;
    });
    this.receivedByS.GetCollection().then(x => {
      this.received_by = x;
    });
    this.userS.UserByRole(5).then(x => {
      this.assing_user = x;
    });
    this.regimeS.GetCollection().then(x => {
      this.regime = x;
    });

    this.form = this.formBuilder.group({
      invoice_prefix: [this.data.invoice_prefix, Validators.compose([Validators.required])],
      objetion_detail: [this.data.objetion_detail, Validators.compose([Validators.required])],
      objeted_value: [this.data.objeted_value, Validators.compose([Validators.required])],
      invoice_value: [this.data.invoice_value, Validators.compose([Validators.required])],
      invoice_consecutive: [this.data.invoice_consecutive, Validators.compose([Validators.required])],
      received_date: [this.data.received_date],
      emission_date: [this.data.emission_date],
      radication_date: [this.data.radication_date],
      regime_id: [this.data.regimen_id],
      objetion_type_id: [this.data.objetion_type_id, Validators.compose([Validators.required])],
      company_id: [this.data.company_id, Validators.compose([Validators.required])],
      campus_id: [this.data.campus_id, Validators.compose([Validators.required])],
      gloss_modality_id: [this.data.gloss_modality_id, Validators.compose([Validators.required])],
      gloss_ambit_id: [this.data.gloss_ambit_id, Validators.compose([Validators.required])],
      gloss_service_id: [this.data.gloss_service_id, Validators.compose([Validators.required])],
      objetion_code_id: [this.data.objetion_code ? this.data.objetion_code.name : ''],
      received_by_id: [this.data.received_by_id, Validators.compose([Validators.required])],
      assing_user_id: [this.data.assing_user_id, Validators.compose([Validators.required])],
    });


  }

  close() {
    this.dialogRef.close();
  }
  saveValue(e) {

    this.factureValue= +e.target.value;
    if(this.factureValue<=0){
      this.factureValue=null;
    }
    if(this.objeted_value){
      this.ValueCompare(this.objeted_value);
    }
  }
  ValueCompare(n) {
    if(typeof(n) == 'number'){
      
    } else {
      this.objeted_value = +n.target.value;
    }
    if(this.factureValue){
      if (this.factureValue >= this.objeted_value) {
        // this.toastService.success('', "Excelente");
      } else {
        this.toastService.warning('', "El valor objetado no puede ser mayor al valor de la factura");
        this.form.controls.objeted_value.setErrors({'incorrect':true})
        ;
        this.objeted_value=null;
      }
    }
  }
  public saveCode(e): void {
    var name = this.objetion_code.find(item => item.name == e.target.value);
    if (name) {
      this.code_id = name.id;
    } else {
      this.code_id = null;
    }
  }

  save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      if (this.data.id) {
        this.glossS.Update({
          id: this.data.id,
          invoice_prefix: this.form.controls.invoice_prefix.value,
          objetion_detail: this.form.controls.objetion_detail.value,
          objeted_value: this.form.controls.objeted_value.value,
          invoice_value: this.form.controls.invoice_value.value,
          invoice_consecutive: this.form.controls.invoice_consecutive.value,
          received_date: this.form.controls.received_date.value,
          emission_date: this.form.controls.emission_date.value,
          radication_date: this.form.controls.radication_date.value,
          objetion_type_id: this.form.controls.objetion_type_id.value,
          company_id: this.form.controls.company_id.value,
          regime_id: this.form.controls.regime_id.value,
          campus_id: this.form.controls.campus_id.value,
          gloss_modality_id: this.form.controls.gloss_modality_id.value,
          gloss_ambit_id: this.form.controls.gloss_ambit_id.value,
          gloss_service_id: this.form.controls.gloss_service_id.value,
          objetion_code_id: this.code_id,
          received_by_id: this.form.controls.received_by_id.value,
          assing_user_id: this.form.controls.assing_user_id.value,
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
        this.glossS.Save({
          invoice_prefix: this.form.controls.invoice_prefix.value,
          objetion_detail: this.form.controls.objetion_detail.value,
          objeted_value: this.form.controls.objeted_value.value,
          invoice_value: this.form.controls.invoice_value.value,
          invoice_consecutive: this.form.controls.invoice_consecutive.value,
          received_date: this.form.controls.received_date.value,
          regime_id: this.form.controls.regime_id.value,
          emission_date: this.form.controls.emission_date.value,
          radication_date: this.form.controls.radication_date.value,
          objetion_type_id: this.form.controls.objetion_type_id.value,
          company_id: this.form.controls.company_id.value,
          campus_id: this.form.controls.campus_id.value,
          gloss_modality_id: this.form.controls.gloss_modality_id.value,
          gloss_ambit_id: this.form.controls.gloss_ambit_id.value,
          gloss_service_id: this.form.controls.gloss_service_id.value,
          objetion_code_id: this.code_id,
          assing_user_id: this.form.controls.assing_user_id.value,
          received_by_id: this.form.controls.received_by_id.value,
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
