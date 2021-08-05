import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NbToastrService} from '@nebular/theme';
import {BudgetContractsBussinesService} from '../../../../business-controller/budget-contracts-bussines.service';
import {UserBusinessService} from '../../../../business-controller/user-business.service';

@Component({
  selector: 'ngx-form-contratcs',
  templateUrl: './form-contratcs.component.html',
  styleUrls: ['./form-contratcs.component.scss'],
})
export class FormContratcsComponent implements OnInit {
  @Input() title = null;
  @Input() routes = null;
  @Input() messageError = null;
  @Input() routeBack = '/pages/budget/contracts/';
  @Input() data = null;

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public currentProveedor = null;

  public states = [];

  constructor(
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private contractsBS: BudgetContractsBussinesService,
    private usersBS: UserBusinessService,
  ) {
  }

  ngOnInit(): void {
    this.contractsBS.GetAuxiliarData().then(x => {
      this.states = x.states;
    });
    this.form = this.formBuilder.group({
      code: [this.data?.code, Validators.compose([Validators.required])],
      date_ini: [this.data?.date_ini, Validators.compose([Validators.required])],
      date_fin: [this.data?.date_fin, Validators.compose([Validators.required])],
      user_id: [this.data?.user_id, Validators.compose([Validators.required])],
      allocation_resource: [this.data?.allocation_resource, Validators.compose([Validators.required])],
      contract_value: [this.data?.contract_value, Validators.compose([Validators.required])],
      object: [this.data?.object, Validators.compose([Validators.required])],
      observations: [this.data?.observations],
      contract_state_id: [this.data?.contract_state_id ?? '', Validators.compose([Validators.required])],
    });

    this.onChange();
  }

  onChange() {
    this.form.get('user_id').valueChanges.subscribe(val => {
      this.currentProveedor = val;
    });
  }

  async Save() {
    this.isSubmitted = true;

    if (this.form.invalid) return false;

    try {
      let response;
      const data = {
        ...this.form.value,
      };

      data.user_id = data.user_id.id;

      if (this.data?.id) {
        response = await this.contractsBS.Update(data, this.data.id);
      } else {
        response = await this.contractsBS.Save(data);
      }

      this.toastService.success('', response.message);
      this.data = response.data.contract;

    } catch (e) {
      this.messageError = e;
    }
  }

  renderLabelUsers(data) {
    return data.nombre_completo;
  }

  async searchUser(value) {
    return await this.usersBS.GetUserById(value);
  }

}
