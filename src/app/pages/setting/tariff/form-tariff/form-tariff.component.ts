import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TariffService } from '../../../../business-controller/tariff.service';
import { PadRiskService } from '../../../../business-controller/pad-risk.service';
import { ScopeOfAttentionService } from '../../../../business-controller/scope-of-attention.service';
import { RoleBusinessService } from '../../../../business-controller/role-business.service';
import { ProgramService } from '../../../../business-controller/program.service';
import { TypeOfAttentionService } from '../../../../business-controller/type-of-attention.service';
import { AdmissionsService } from '../../../../business-controller/admissions.service';


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
  public has_car: boolean = false;
  public failed: boolean = false;
  public pad_risk: any[];
  public program: any[];
  public admissions: any[] = null;
  public admissions_id;
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
  public tariff_type: any[] = [
    {
      value: 1,
      name: 'TARIFA NORMAL'
    },
    {
      value: 2,
      name: 'TARIFA ESPECIAL A PACIENTE'
    }
  ];

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private PadRiskS: PadRiskService,
    private ProgramS: ProgramService,
    private AdmissionsS: AdmissionsService,
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
        has_car: '',
        phone_consult: '',
        quantity: '',
        pad_risk_id: '',
        program_id: '',
        type_of_attention_id: '',
        nombre_completo: '',
        tariff_type: 1,
      };
    } else {
      this.admissions_id = this.data.admissions_id;
      this.data = {
        id: this.data.id,
        amount: this.data.amount,
        name: this.data.name,
        extra_dose: this.data.extra_dose,
        has_car: this.data.has_car,
        phone_consult: this.data.phone_consult,
        quantity: this.data.quantity,
        pad_risk_id: this.data.pad_risk_id,
        program_id: this.data.program_id,
        type_of_attention_id: this.data.type_of_attention_id,
        nombre_completo: this.data.nombre_completo,
        tariff_type: this.data.nombre_completo == '' ? 1 : 2,
      };
      if (!this.data.quantity) {
        this.data['quantity'] = '';
      }
      var a: number = this.data.extra_dose;
      if (a) {
        this.extra_dose = true;
      }
      var c: number = this.data.has_car;
      if (c) {
        this.has_car = true;
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
      pad_risk_id: [this.data.pad_risk_id],
      program_id: [this.data.program_id],
      quantity: [this.data.quantity],
      type_of_attention_id: [this.data.type_of_attention_id, Validators.compose([Validators.required])],
      nombre_completo: [this.data.nombre_completo],
      tariff_type: [this.data.tariff_type],
    });


    if (this.data.tariff_type == 1) {
      this.form.get('program_id').setValidators(Validators.required);
      this.form.get('program_id').updateValueAndValidity();

      this.form.get('pad_risk_id').setValidators(Validators.required);
      this.form.get('pad_risk_id').updateValueAndValidity();

      this.form.get('nombre_completo').clearValidators();
      this.form.get('nombre_completo').updateValueAndValidity();
    } else {
      this.form.get('program_id').clearValidators();
      this.form.get('program_id').updateValueAndValidity();

      this.form.get('quantity').clearValidators();
      this.form.get('quantity').updateValueAndValidity();

      this.form.get('pad_risk_id').clearValidators();
      this.form.get('pad_risk_id').updateValueAndValidity();

      this.form.get('nombre_completo').setValidators(Validators.required);
      this.form.get('nombre_completo').updateValueAndValidity();
    }

  }

  changeType(e): void {
    if (this.form.controls.tariff_type.value == 2) {
      if (this.admissions == null) {
        this.AdmissionsS.GetActiveAdmissions().then(x => {
          this.admissions = x;
        });
      }
      this.form.get('program_id').clearValidators();
      this.form.get('program_id').updateValueAndValidity();

      this.form.get('pad_risk_id').clearValidators();
      this.form.get('pad_risk_id').updateValueAndValidity();

      this.form.get('nombre_completo').setValidators(Validators.required);
      this.form.get('nombre_completo').updateValueAndValidity();
    } else {
      this.form.get('program_id').setValidators(Validators.required);
      this.form.get('program_id').updateValueAndValidity();

      this.form.get('quantity').setValidators(Validators.required);
      this.form.get('quantity').updateValueAndValidity();

      this.form.get('pad_risk_id').setValidators(Validators.required);
      this.form.get('pad_risk_id').updateValueAndValidity();

      this.form.get('nombre_completo').clearValidators();
      this.form.get('nombre_completo').updateValueAndValidity();
    }
  }

  saveCode(e): void {
    var localidentify = this.admissions.find(item => item.nombre_completo == e);

    if (localidentify) {
      this.admissions_id = localidentify.id;
      this.form.controls.nombre_completo.setErrors(null);

    } else {
      this.admissions_id = null;
      this.toastService.warning('', 'Debe seleccionar un paciente de la lista');
      this.form.controls.nombre_completo.setErrors({ 'incorrect': true });
    }
  }

  failedChange(event) {
    this.failed = event.target.checked;
  }

  phoneConsultChange(event) {
    this.phone_consult = event.target.checked;
  }

  extraDoseChange(event) {
    this.extra_dose = event.target.checked;
  }

  hasCarChange(event) {
    this.has_car = event.target.checked;
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      if (this.form.controls.tariff_type.value == 1) {
        this.admissions_id = null;
      } else {
        this.form.controls.pad_risk_id.setValue('');
        this.form.controls.program_id.setValue('');
        this.form.controls.quantity.setValue('');
      }
      this.loading = true;
      if (this.data.id) {
        this.tariffS.Update({
          id: this.data.id,
          name: this.form.controls.name.value,
          amount: this.form.controls.amount.value,
          extra_dose: this.extra_dose,
          has_car: this.has_car,
          failed: this.failed,
          phone_consult: this.phone_consult,
          pad_risk_id: this.form.controls.pad_risk_id.value,
          program_id: this.form.controls.program_id.value,
          quantity: this.form.controls.quantity.value,
          status_id: 1,
          type_of_attention_id: this.form.controls.type_of_attention_id.value,
          admissions_id: this.admissions_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.close();
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          this.toastService.danger(x, 'Error');
          this.isSubmitted = false;
          this.loading = false;
        });
      } else {
        this.tariffS.Save({
          name: this.form.controls.name.value,
          amount: this.form.controls.amount.value,
          extra_dose: this.extra_dose,
          has_car: this.has_car,
          failed: this.failed,
          phone_consult: this.phone_consult,
          pad_risk_id: this.form.controls.pad_risk_id.value,
          program_id: this.form.controls.program_id.value,
          quantity: this.form.controls.quantity.value,
          status_id: 1,
          type_of_attention_id: this.form.controls.type_of_attention_id.value,
          admissions_id: this.admissions_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.close();
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          this.toastService.danger(x, 'Error');
          this.isSubmitted = false;
          this.loading = false;
        });
      }
    }
  }
}
