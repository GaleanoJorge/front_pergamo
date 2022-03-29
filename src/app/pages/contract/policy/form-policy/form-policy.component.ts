import { Component, OnInit, Input } from '@angular/core';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {PolicyService} from '../../../../business-controller/policy.service';
import { environment } from '../../../../../environments/environment.prod';
import {DocumentService} from '../../../../business-controller/document.service';
import {CompanyService} from '../../../../business-controller/company.service';
import { ContractService } from '../../../../business-controller/contract.service';
import { PolicyTypeService } from '../../../../business-controller/policy-type.service';
import { InsuranceCarrierService } from '../../../../business-controller/insurance-carrier.service';
import { Contract } from '../../../../models/contract';


@Component({
  selector: 'ngx-form-policy',
  templateUrl: './form-policy.component.html',
  styleUrls: ['./form-policy.component.scss']
})
export class FormPolicyComponent implements OnInit {

  @Input() title: string;
  @Input() contract_id: any;
  @Input() data: any = null;

  public form: FormGroup;
  public messageError = null;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public previewFile = null;
  public contract: any[] = [];
  public policy_type: any[] = [];
  public insurance_carrier: any[] = [];
  name: any;


  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private PolicyS: PolicyService,
    private toastService: NbToastrService,
    private route: ActivatedRoute,
    private ContractS: ContractService,
    private PolicyTypeS: PolicyTypeService,
    private InsuranceCarrierS: InsuranceCarrierService,

  ) {
  }

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        contract_id: '',
        policy_value: '',
        policy_type_id: '',
        insurance_carrier_id: '',
        start_date: '',
        finish_date:'',
        policy_file: '',
      };
    }else{
      this.previewFile = environment.storage + this.data.policy_file;
    }

    // this.statusBS.GetCollection().then(x => {
    //   this.status = x;
    // });

    this.PolicyTypeS.GetCollection().then(x=> {
        this.policy_type = x;
    });
    
    this.InsuranceCarrierS.GetCollection().then(x=> {
        this.insurance_carrier = x;
    });

    this.form = this.formBuilder.group({      
      contract_id: [this.data.contract_id],
      policy_value: [this.data.policy_value, Validators.compose([Validators.required])],
      policy_type_id: [this.data.policy_type_id, Validators.compose([Validators.required])],
      insurance_carrier_id: [this.data.insurance_carrier_id, Validators.compose([Validators.required])],
      start_date: [this.data.start_date, Validators.compose([Validators.required])],
      finish_date: [this.data.finish_date, Validators.compose([Validators.required])],
      policy_file: [this.data.policy_file],
    });
    // if(this.data){
    //   this.name=this.nameProvider(this.data.contract_id);
    // }

  }
  

  close() {
    this.dialogRef.close();
  }

  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid){

    this.loading = true;

    var formData = new FormData();
    var data = this.form.controls;
    formData.append('contract_id', this.contract_id);
    formData.append('policy_value',data.policy_value.value);
    formData.append('policy_type_id', data.policy_type_id.value);
    formData.append('insurance_carrier_id', data.insurance_carrier_id.value);
    formData.append('start_date', data.start_date.value);
    formData.append('finish_date', data.finish_date.value);
    formData.append('policy_file', this.form.value.policy_file);


    try {
      let response;
      if (this.data?.id) {
        response = await this.PolicyS.Update(formData, this.data.id);
      } else {
        response = await this.PolicyS.Save(formData);
      }
      this.toastService.success('', response.message);
      this.messageError = null;
      this.close();
      if (this.saved) {
        this.saved();
      }
    } catch (response) {
      this.messageError = response;
      this.isSubmitted = false;
      this.loading = false;
      throw new Error(response);
    }
  }else{
    this.toastService.warning('', "Debe diligenciar los campos obligatorios");
  }
  }

  async changeImage(files, option) {
    if (!files.length) return false;

    const file = await this.toBase64(files[0]);

    switch (option) {
      case 1:
        this.form.patchValue({
          policy_file: files[0],
        });
        break;
    }
  }

  toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  })

}
