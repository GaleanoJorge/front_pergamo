import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TariffService } from '../../../../business-controller/tariff.service';
import { PadRiskService } from '../../../../business-controller/pad-risk.service';
import { ScopeOfAttentionService } from '../../../../business-controller/scope-of-attention.service';
import { RoleBusinessService } from '../../../../business-controller/role-business.service';


@Component({
  selector: 'ngx-form-tariff',
  templateUrl: './form-tariff.component.html',
  styleUrls: ['./form-tariff.component.scss'],
})
export class FormTariffComponent implements OnInit {
  @Input() title: string;
  @Input() data: any = null;

  public form: FormGroup;
  public loading: boolean = false;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public geteratedName: string = '----';

  public pad_risk: any[];
  public role: any[];
  public scope_of_attention: any[];


  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private PadRiskS: PadRiskService,
    private RoleS: RoleBusinessService,
    private ScopeOfAttentionS: ScopeOfAttentionService,
    private tariffS: TariffService,
    private toastS: NbToastrService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        name: '',
        amount: '',
        pad_risk_id: '',
        role_id: '',
        diet_component_id: '',
        scope_of_attention_id: '',
      };
    } else {
      this.geteratedName = this.data.name;
    }

    this.PadRiskS.GetCollection().then(x => {
      this.pad_risk = x;
    });
    this.RoleS.GetCollection({
      role_type_id: 2,
    }).then(x => {
      this.role = x;
    });
    this.ScopeOfAttentionS.GetCollection({ admission_route_id: 2 }).then(x => {
      this.scope_of_attention = x;
    });

    this.form = this.formBuilder.group({
      amount: [this.data.amount, Validators.compose([Validators.required])],
      pad_risk_id: [this.data.pad_risk_id, Validators.compose([Validators.required])],
      role_id: [this.data.role_id, Validators.compose([Validators.required])],
      scope_of_attention_id: [this.data.scope_of_attention_id, Validators.compose([Validators.required])],
    });


  }

  ChangeName($event) {
    if ($event) {
      if (this.form.controls.pad_risk_id.value && this.form.controls.role_id.value && this.form.controls.scope_of_attention_id.value) {
        var A = this.pad_risk[this.form.controls.pad_risk_id.value - 1].name;
        var B = this.role[this.form.controls.role_id.value - 1].name;
        var C = this.scope_of_attention[this.form.controls.scope_of_attention_id.value - 3].name;
        this.geteratedName = A + '-' + B + '-' + C;
      }
    }
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      if (this.data.id) {
        this.tariffS.Update({
          id: this.data.id,
          name: this.geteratedName,
          amount: this.form.controls.amount.value,
          pad_risk_id: this.form.controls.pad_risk_id.value,
          role_id: this.form.controls.role_id.value,
          scope_of_attention_id: this.form.controls.scope_of_attention_id.value,
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
        this.tariffS.Save({
          name: this.geteratedName,
          amount: this.form.controls.amount.value,
          pad_risk_id: this.form.controls.pad_risk_id.value,
          role_id: this.form.controls.role_id.value,
          scope_of_attention_id: this.form.controls.scope_of_attention_id.value,
        }).then(x => {
          this.toastService.success('', x.message);
          this.close();
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          this.toastService.danger('Error', x);
          this.isSubmitted = false;
          this.loading = false;
        });
      }
    }
  }
}
