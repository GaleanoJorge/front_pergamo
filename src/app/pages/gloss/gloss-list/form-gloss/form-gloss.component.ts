import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyService } from '../../../../business-controller/company.service';
import { FirmsService } from '../../../../business-controller/firms.service';
import { InsuranceCarrierService } from '../../../../business-controller/insurance-carrier.service';
import { TypeBriefcaseService } from '../../../../business-controller/type-briefcase.service';


@Component({
  selector: 'ngx-form-gloss',
  templateUrl: './form-gloss.component.html',
  styleUrls: ['./form-gloss.component.scss'],
})
export class FormGlossComponent implements OnInit {
  @Input() title: string;
  @Input() data: any = null;

  public form: FormGroup;
  public company: any[] = [];
  public type_gloss: any[] = [];
  public gloss_status: any[] = [];
  public firms: any[] = [];
  public insurance_carrier: any[] = [];
  public saved: any = null;
  public loading: boolean = false;
  public isSubmitted: boolean = false;
  public regime: any[];

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private companyS: CompanyService,
    private toastService: NbToastrService,
    private firmsS: FirmsService,
    private InsuranceCarrierS: InsuranceCarrierService,
    private regimeS: TypeBriefcaseService,
  ) {
  }

  ngOnInit(): void {

    if (!this.data) {
      this.data = {
        number_gloss: '',
        name:'',
        company_id: '',
        type_gloss_id: '',
        occasional: '',
        amount: '',
        start_date: '',
        finish_date: '',
        gloss_status_id: '',
        firms_glossor_id: '',
        firms_glossing_id: '',
        regime_id:'',
        value_civil_policy: '',
        start_date_civil_policy:'',
        finish_date_civil_policy: '',
        civil_policy_insurance_id:'',
        value_glossual_policy:'',
        start_date_glossual_policy: '',
        finish_date_glossual_policy:'',
        glossual_policy_insurance_id: '',
        start_date_invoice: '',
        finish_date_invoice: '',
        time_delivery_invoice: '',
        expiration_days_portafolio: '',
        discount:'',
        observations: '',
        objective: '',
      };
    } 

    this.companyS.GetCollection().then(x => {
      this.company = x;
    });
    this.firmsS.GetCollection().then(x => {
      this.firms = x;
    });
    this.InsuranceCarrierS.GetCollection().then(x => {
      this.insurance_carrier = x;
    });
    this.regimeS.GetCollection().then(x => {
      this.regime = x;
    });


    this.form = this.formBuilder.group({
      number_gloss: [this.data.number_gloss, Validators.compose([Validators.required])],
      name: [this.data.name, Validators.compose([Validators.required])],
      company_id: [this.data.company_id, Validators.compose([Validators.required])],
      type_gloss_id: [this.data.type_gloss_id, Validators.compose([Validators.required])],
      occasional: [this.data.occasional, Validators.compose([Validators.required])],
      amount: [this.data.amount, Validators.compose([Validators.required])],
      start_date: [this.data.start_date],
      finish_date: [this.data.finish_date],
      gloss_status_id: [this.data.gloss_status_id],
      firms_glossor_id: [this.data.firms_glossor_id],
      firms_glossing_id: [this.data.firms_glossing_id],
      value_civil_policy: [this.data.value_civil_policy, Validators.compose([Validators.required])],
      start_date_civil_policy: [this.data.start_date_civil_policy, Validators.compose([Validators.required])],
      finish_date_civil_policy: [this.data.finish_date_civil_policy],
      regime_id: [this.data.regime_id],
      civil_policy_insurance_id: [this.data.civil_policy_insurance_id],
      value_glossual_policy: [this.data.value_glossual_policy],
      start_date_glossual_policy: [this.data.start_date_glossual_policy, Validators.compose([Validators.required])],
      finish_date_glossual_policy: [this.data.finish_date_glossual_policy, Validators.compose([Validators.required])],
      glossual_policy_insurance_id: [this.data.glossual_policy_insurance_id, Validators.compose([Validators.required])],
      start_date_invoice: [this.data.start_date_invoice],
      finish_date_invoice: [this.data.finish_date_invoice],
      time_delivery_invoice: [this.data.time_delivery_invoice],
      expiration_days_portafolio: [this.data.expiration_days_portafolio],
      discount: [this.data.discount],
      observations: [this.data.observations],
      objective: [this.data.objective],
    });
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      if (Date.parse(this.form.controls.finish_date.value) < Date.parse(this.form.controls.start_date.value)) {
        this.toastService.danger(null, 'Revise las fechas');
        this.loading = false;
      } else {
        if (this.data.id) {
        //   this.glossS.Update({
        //     id: this.data.id,
        //     number_gloss: this.form.controls.number_gloss.value,
        //     name: this.form.controls.name.value,
        //     company_id: this.form.controls.company_id.value,
        //     type_gloss_id: this.form.controls.type_gloss_id.value,
        //     occasional: this.form.controls.occasional.value,
        //     amount: this.form.controls.amount.value,
        //     start_date:this.form.controls.start_date.value,
        //     finish_date: this.form.controls.finish_date.value,
        //     gloss_status_id: this.form.controls.gloss_status_id.value,
        //     firms_glossor_id: this.form.controls.firms_glossor_id.value,
        //     firms_glossing_id: this.form.controls.firms_glossing_id.value,
        //     value_civil_policy: this.form.controls.value_civil_policy.value,
        //     start_date_civil_policy: this.form.controls.start_date_civil_policy.value,
        //     finish_date_civil_policy:this.form.controls.finish_date_civil_policy.value,
        //     regime_id:this.form.controls.regime_id.value,
        //     civil_policy_insurance_id: this.form.controls.civil_policy_insurance_id.value,
        //     value_glossual_policy: this.form.controls.value_glossual_policy.value,
        //     start_date_glossual_policy: this.form.controls.start_date_glossual_policy.value,
        //     finish_date_glossual_policy: this.form.controls.finish_date_glossual_policy.value,
        //     glossual_policy_insurance_id: this.form.controls.glossual_policy_insurance_id.value,
        //     start_date_invoice: this.form.controls.start_date_invoice.value,
        //     finish_date_invoice: this.form.controls.finish_date_invoice.value,
        //     time_delivery_invoice: this.form.controls.time_delivery_invoice.value,
        //     expiration_days_portafolio: this.form.controls.expiration_days_portafolio.value,
        //     discount: this.form.controls.discount.value,
        //     observations: this.form.controls.observations.value,
        //     objective: this.form.controls.objective.value,
        //   }).then(x => {
        //     this.toastService.success('', x.message);
        //     this.close();
        //     if (this.saved) {
        //       this.saved();
        //     }
        //   }).catch(x => {
        //     this.isSubmitted = false;
        //     this.loading = false;
        //   });
        // } else {
        //   this.glossS.Save({
        //     number_gloss: this.form.controls.number_gloss.value,
        //     name: this.form.controls.name.value,
        //     company_id: this.form.controls.company_id.value,
        //     type_gloss_id: this.form.controls.type_gloss_id.value,
        //     occasional: this.form.controls.occasional.value,
        //     amount: this.form.controls.amount.value,
        //     start_date:this.form.controls.start_date.value,
        //     finish_date: this.form.controls.finish_date.value,
        //     gloss_status_id: this.form.controls.gloss_status_id.value,
        //     firms_glossor_id: this.form.controls.firms_glossor_id.value,
        //     firms_glossing_id: this.form.controls.firms_glossing_id.value,
        //     regime_id:this.form.controls.regime_id.value,
        //     value_civil_policy: this.form.controls.value_civil_policy.value,
        //     start_date_civil_policy: this.form.controls.start_date_civil_policy.value,
        //     finish_date_civil_policy:this.form.controls.finish_date_civil_policy.value,
        //     civil_policy_insurance_id: this.form.controls.civil_policy_insurance_id.value,
        //     value_glossual_policy: this.form.controls.value_glossual_policy.value,
        //     start_date_glossual_policy: this.form.controls.start_date_glossual_policy.value,
        //     finish_date_glossual_policy: this.form.controls.finish_date_glossual_policy.value,
        //     glossual_policy_insurance_id: this.form.controls.glossual_policy_insurance_id.value,
        //     start_date_invoice: this.form.controls.start_date_invoice.value,
        //     finish_date_invoice: this.form.controls.finish_date_invoice.value,
        //     time_delivery_invoice: this.form.controls.time_delivery_invoice.value,
        //     expiration_days_portafolio: this.form.controls.expiration_days_portafolio.value,
        //     discount: this.form.controls.discount.value,
        //     observations: this.form.controls.observations.value,
        //     objective: this.form.controls.objective.value,
        //   }).then(x => {
        //     this.toastService.success('', x.message);
        //     this.close();
        //     if (this.saved) {
        //       this.saved();
        //     }
        //   }).catch(x => {
        //     this.isSubmitted = false;
        //     this.loading = false;
        //   });
        }
      }
    }
  }
}
