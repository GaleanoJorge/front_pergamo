import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyService } from '../../../../business-controller/company.service';
import { TypeContractService } from '../../../../business-controller/type-contract.service';
import { StatusBusinessService } from '../../../../business-controller/status-business.service';
import { FirmsService } from '../../../../business-controller/firms.service';
import { InsuranceCarrierService } from '../../../../business-controller/insurance-carrier.service';
import { ContractService } from '../../../../business-controller/contract.service';


@Component({
  selector: 'ngx-form-contract',
  templateUrl: './form-contract.component.html',
  styleUrls: ['./form-contract.component.scss'],
})
export class FormContractComponent implements OnInit {
  @Input() title: string;
  @Input() data: any = null;

  public form: FormGroup;
  public company: any[] = [];
  public type_contract: any[] = [];
  public status: any[] = [];
  public firms: any[] = [];
  public insurance_carrier: any[] = [];
  public saved: any = null;
  public loading: boolean = false;
  public isSubmitted: boolean = false;

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private companyS: CompanyService,
    private toastService: NbToastrService,
    private TypeContractS: TypeContractService,
    private statusS: StatusBusinessService,
    private firmsS: FirmsService,
    private InsuranceCarrierS: InsuranceCarrierService,
    private contractS: ContractService,
  ) {
  }

  ngOnInit(): void {

    if (!this.data) {
      this.data = {
        number_contract: '',
        name:'',
        company_id: '',
        type_contract_id: '',
        occasional: '',
        amount: '',
        start_date: '',
        finish_date: '',
        status_id: '',
        firms_id: '',
        value_civil_policy: '',
        start_date_civil_policy:'',
        finish_date_civil_policy: '',
        civil_policy_insurance_id:'',
        value_contractual_policy:'',
        start_date_contractual_policy: '',
        finish_date_contractual_policy:'',
        contractual_policy_insurance_id: '',
        date_of_delivery_of_invoices: '',
        expiration_days_portafolio: '',
        discount:'',
        observations: '',
        objective: '',
      };
    } 

    this.companyS.GetCollection().then(x => {
      this.company = x;
    });
    this.TypeContractS.GetCollection().then(x => {
      this.type_contract = x;
    });
    this.statusS.GetCollection().then(x => {
      this.status = x;
    });
    this.firmsS.GetCollection().then(x => {
      this.firms = x;
    });
    this.InsuranceCarrierS.GetCollection().then(x => {
      this.insurance_carrier = x;
    });


    this.form = this.formBuilder.group({
      number_contract: [this.data.number_contract, Validators.compose([Validators.required])],
      name: [this.data.name, Validators.compose([Validators.required])],
      company_id: [this.data.company_id, Validators.compose([Validators.required])],
      type_contract_id: [this.data.type_contract_id, Validators.compose([Validators.required])],
      occasional: [this.data.occasional, Validators.compose([Validators.required])],
      amount: [this.data.amount, Validators.compose([Validators.required])],
      start_date: [this.data.start_date],
      finish_date: [this.data.finish_date],
      status_id: [this.data.status_id],
      firms_id: [this.data.firms_id],
      value_civil_policy: [this.data.value_civil_policy, Validators.compose([Validators.required])],
      start_date_civil_policy: [this.data.start_date_civil_policy, Validators.compose([Validators.required])],
      finish_date_civil_policy: [this.data.finish_date_civil_policy],
      civil_policy_insurance_id: [this.data.civil_policy_insurance_id],
      value_contractual_policy: [this.data.value_contractual_policy],
      start_date_contractual_policy: [this.data.start_date_contractual_policy, Validators.compose([Validators.required])],
      finish_date_contractual_policy: [this.data.finish_date_contractual_policy, Validators.compose([Validators.required])],
      contractual_policy_insurance_id: [this.data.contractual_policy_insurance_id, Validators.compose([Validators.required])],
      date_of_delivery_of_invoices: [this.data.date_of_delivery_of_invoices],
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
          this.contractS.Update({
            id: this.data.id,
            number_contract: this.form.controls.number_contract.value,
            name: this.form.controls.name.value,
            company_id: this.form.controls.company_id.value,
            type_contract_id: this.form.controls.type_contract_id.value,
            occasional: this.form.controls.occasional.value,
            amount: this.form.controls.amount.value,
            start_date:this.form.controls.start_date.value,
            finish_date: this.form.controls.finish_date.value,
            status_id: this.form.controls.status_id.value,
            firms_id: this.form.controls.firms_id.value,
            civil_liability_policy: this.form.controls.civil_liability_policy.value,
            value_civil_policy: this.form.controls.value_civil_policy.value,
            start_date_civil_policy: this.form.controls.start_date_civil_policy.value,
            finish_date_civil_policy:this.form.controls.finish_date_civil_policy.value,
            civil_policy_insurance_id: this.form.controls.civil_policy_insurance_id.value,
            contractual_liability_policy: this.form.controls.contractual_liability_policy.value,
            value_contractual_policy: this.form.controls.value_contractual_policy.value,
            start_date_contractual_policy: this.form.controls.start_date_contractual_policy.value,
            finish_date_contractual_policy: this.form.controls.finish_date_contractual_policy.value,
            contractual_policy_insurance_id: this.form.controls.contractual_policy_insurance_id.value,
            date_of_delivery_of_invoices: this.form.controls.value_contractual_policy.value,
            expiration_days_portafolio: this.form.controls.expiration_days_portafolio.value,
            discount: this.form.controls.discount.value,
            observations: this.form.controls.observations.value,
            objective: this.form.controls.objective.value,
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
          this.contractS.Save({
            number_contract: this.form.controls.number_contract.value,
            name: this.form.controls.name.value,
            company_id: this.form.controls.company_id.value,
            type_contract_id: this.form.controls.type_contract_id.value,
            occasional: this.form.controls.occasional.value,
            amount: this.form.controls.amount.value,
            start_date:this.form.controls.start_date.value,
            finish_date: this.form.controls.finish_date.value,
            status_id: this.form.controls.status_id.value,
            firms_id: this.form.controls.firms_id.value,
            value_civil_policy: this.form.controls.value_civil_policy.value,
            start_date_civil_policy: this.form.controls.start_date_civil_policy.value,
            finish_date_civil_policy:this.form.controls.finish_date_civil_policy.value,
            civil_policy_insurance_id: this.form.controls.civil_policy_insurance_id.value,
            value_contractual_policy: this.form.controls.value_contractual_policy.value,
            start_date_contractual_policy: this.form.controls.start_date_contractual_policy.value,
            finish_date_contractual_policy: this.form.controls.finish_date_contractual_policy.value,
            contractual_policy_insurance_id: this.form.controls.contractual_policy_insurance_id.value,
            date_of_delivery_of_invoices: this.form.controls.value_contractual_policy.value,
            expiration_days_portafolio: this.form.controls.expiration_days_portafolio.value,
            discount: this.form.controls.discount.value,
            observations: this.form.controls.observations.value,
            objective: this.form.controls.objective.value,
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
}
