import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TariffService } from '../../../../business-controller/tariff.service';
import { PadRiskService } from '../../../../business-controller/pad-risk.service';
import { ScopeOfAttentionService } from '../../../../business-controller/scope-of-attention.service';
import { RoleBusinessService } from '../../../../business-controller/role-business.service';
import { ProgramService } from '../../../../business-controller/program.service';
import { TypeOfAttentionService } from '../../../../business-controller/type-of-attention.service';


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

  public phone_consult: boolean = false;
  public extra_dose: boolean = false;
  public pad_risk: any[];
  public program: any[];
  public type_of_attention: any[];
  public quantity: any[] = [
    {
      value: 1,
      name: '1 HORA'
    },
    {
      value: 2,
      name: '2 HORAS'
    },
    {
      value: 3,
      name: '3 HORAS'
    },
    {
      value: 4,
      name: '4 HORAS'
    },
    {
      value: 6,
      name: '6 HORAS'
    },
    {
      value: 8,
      name: '8 HORAS'
    },
    {
      value: 12,
      name: '12 HORAS'
    },
    {
      value: 24,
      name: '24 HORAS'
    }
  ];


  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private PadRiskS: PadRiskService,
    private ProgramS: ProgramService,
    private TypeOfAttentionS: TypeOfAttentionService,
    private tariffS: TariffService,
    private toastS: NbToastrService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        amount: '',
        name: '',
        extra_dose: '',
        phone_consult: '',
        quantity: '',
        pad_risk_id: '',
        program_id: '',
        type_of_attention_id: '',
      };
    } else {
      if (!this.data.quantity) {
        this.data['quantity'] = '';
      }
      var a: number = this.data.extra_dose;
      if (a) {
        this.extra_dose = true;
      }
      var b: number = this.data.phone_consult;
      if (b) {
        this.phone_consult = true;
      }
    }

    this.PadRiskS.GetCollection().then(x => {
      this.pad_risk = x;
    });
    this.ProgramS.GetCollection().then(x => {
      this.program = x;
    });
    this.TypeOfAttentionS.GetCollection().then(x => {
      this.type_of_attention = x;
    });

    this.form = this.formBuilder.group({
      amount: [this.data.amount, Validators.compose([Validators.required])],
      name: [this.data.name, Validators.compose([Validators.required])],
      pad_risk_id: [this.data.pad_risk_id, Validators.compose([Validators.required])],
      program_id: [this.data.program_id, Validators.compose([Validators.required])],
      quantity: [this.data.quantity],
      type_of_attention_id: [this.data.type_of_attention_id, Validators.compose([Validators.required])],
    });


  }

  phoneConsultChange(event) {
    this.phone_consult = event.target.checked;
  }

  extraDoseChange(event) {
    this.extra_dose = event.target.checked;
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
          name: this.form.controls.name.value,
          amount: this.form.controls.amount.value,
          extra_dose: this.extra_dose,
          phone_consult: this.phone_consult,
          pad_risk_id: this.form.controls.pad_risk_id.value,
          program_id: this.form.controls.program_id.value,
          quantity: this.form.controls.quantity.value,
          status_id: 1,
          type_of_attention_id: this.form.controls.type_of_attention_id.value,
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
          name: this.form.controls.name.value,
          amount: this.form.controls.amount.value,
          extra_dose: this.extra_dose,
          phone_consult: this.phone_consult,
          pad_risk_id: this.form.controls.pad_risk_id.value,
          program_id: this.form.controls.program_id.value,
          quantity: this.form.controls.quantity.value,
          status_id: 1,
          type_of_attention_id: this.form.controls.type_of_attention_id.value,
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
