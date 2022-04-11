import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyService } from '../../../../business-controller/company.service';
import { TypeContractService } from '../../../../business-controller/type-contract.service';
import { ContractStatusService } from '../../../../business-controller/contract-status.service';
import { FirmsService } from '../../../../business-controller/firms.service';
import { InsuranceCarrierService } from '../../../../business-controller/insurance-carrier.service';
import { ContractService } from '../../../../business-controller/contract.service';
import { TypeBriefcaseService } from '../../../../business-controller/type-briefcase.service';
import { ServicesBriefcaseService } from '../../../../business-controller/services-briefcase.service';


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
  public contract_status: any[] = [];
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
    private TypeContractS: TypeContractService,
    private statusS: ContractStatusService,
    private firmsS: FirmsService,
    private InsuranceCarrierS: InsuranceCarrierService,
    private contractS: ContractService,
    private regimeS: TypeBriefcaseService,
    private ServiceBriefcaseS: ServicesBriefcaseService,
  ) {
  }

  ngOnInit(): void {

    if (!this.data) {
      this.data = {
        number_contract: '',
        name: '',
        company_id: '',
        type_contract_id: '',
        occasional: '',
        amount: '',
        start_date: '',
        finish_date: '',
        contract_status_id: '',
        firms_contractor_id: '',
        firms_contracting_id: '',
        regime_id: '',
        start_date_invoice: '',
        finish_date_invoice: '',
        expiration_days_portafolio: '',
        discount: '',
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
      this.contract_status = x;
    });
    this.firmsS.GetCollection().then(x => {
      this.firms = x;
    });
    // this.InsuranceCarrierS.GetCollection().then(x => {
    //   this.insurance_carrier = x;
    // });
    this.regimeS.GetCollection().then(x => {
      this.regime = x;
    });



    this.form = this.formBuilder.group({
      number_contract: [this.data.number_contract,
      ],
      name: [this.data.name,
      Validators.compose([Validators.required])
      ],
      company_id: [this.data.company_id,
      Validators.compose([Validators.required])
      ],
      type_contract_id: [this.data.type_contract_id,
      Validators.compose([Validators.required])
      ],
      occasional: [this.data.occasional,
      Validators.compose([Validators.required])
      ],
      amount: [this.data.amount,
      ],
      start_date: [this.data.start_date],
      finish_date: [this.data.finish_date],
      contract_status_id: [this.data.contract_status_id],
      firms_contractor_id: [this.data.firms_contractor_id],
      firms_contracting_id: [this.data.firms_contracting_id],
      regime_id: [this.data.regime_id],
      start_date_invoice: [this.data.start_date_invoice],
      finish_date_invoice: [this.data.finish_date_invoice],
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
            start_date: this.form.controls.start_date.value,
            finish_date: this.form.controls.finish_date.value,
            contract_status_id: this.form.controls.contract_status_id.value,
            firms_contractor_id: this.form.controls.firms_contractor_id.value,
            firms_contracting_id: this.form.controls.firms_contracting_id.value,
            regime_id: this.form.controls.regime_id.value,
            start_date_invoice: this.form.controls.start_date_invoice.value,
            finish_date_invoice: this.form.controls.finish_date_invoice.value,
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
            start_date: this.form.controls.start_date.value,
            finish_date: this.form.controls.finish_date.value,
            contract_status_id: this.form.controls.contract_status_id.value,
            firms_contractor_id: this.form.controls.firms_contractor_id.value,
            firms_contracting_id: this.form.controls.firms_contracting_id.value,
            regime_id: this.form.controls.regime_id.value,
            start_date_invoice: this.form.controls.start_date_invoice.value,
            finish_date_invoice: this.form.controls.finish_date_invoice.value,
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
