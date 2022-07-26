import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { ChNutritionAnthropometryService } from '../../../../../business-controller/ch-nutrition-anthropometry.service';


@Component({
  selector: 'ngx-form-anthropometry',
  templateUrl: './form-anthropometry.component.html',
  styleUrls: ['./form-anthropometry.component.scss']
})
export class FormAnthropometryComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Input() route: any = null;
  @Input() record_id: any = null;
  @Input() user_id: any = null;
  @Output() messageEvent = new EventEmitter<any>();

  linearMode = false;
  public form: FormGroup;
  public rips_typefile: any[];
  public isSubmitted: boolean = false;
  public saved: any = null;
  public botton_title: string = 'Guardar';
  public loading: boolean = false;
  public messageError = null;
  public is_functional = [
    { id: true, name: 'Si' },
    { id: false, name: 'NO' },
  ];
  public geteratedIMC = null;
  public estimated_weight = null;
  public estimated_size = null;
  public total_energy_expenditure = null;
  public classification = null;
  public age = null;
  public ch_nutrition_anthropometry = null;


  constructor(
    private formBuilder: FormBuilder,
    private ChNutritionAnthropometryS: ChNutritionAnthropometryService,
    private toastService: NbToastrService,
  ) {
  }

  ngOnInit(): void {
    this.age = this.getAge(this.data.birthday);
    this.form = this.formBuilder.group({
      is_functional: ['', Validators.required],
      weight: ['', Validators.required],
      size: ['', Validators.required],
      arm_circunferency: ['', Validators.required],
      calf_circumference: ['', Validators.required],
      knee_height: ['', Validators.required],
      abdominal_perimeter: ['', Validators.required],
      hip_perimeter: ['', Validators.required],
    });

    this.ChNutritionAnthropometryS.GetCollection({
      type_record_id: this.route,
      ch_record_id: this.record_id,
    }).then(x => {
      this.ch_nutrition_anthropometry = x[0];
      if (this.ch_nutrition_anthropometry != null) {
        this.geteratedIMC = this.ch_nutrition_anthropometry.geteratedIMC;
        this.classification = this.ch_nutrition_anthropometry.classification;
        this.estimated_weight = this.ch_nutrition_anthropometry.estimated_weight;
        this.estimated_size = this.ch_nutrition_anthropometry.estimated_size;
        this.total_energy_expenditure = this.ch_nutrition_anthropometry.total_energy_expenditure;
        this.form.patchValue({ is_functional: this.ch_nutrition_anthropometry.is_functional == 1 ? true : false });
        this.form.patchValue({ weight: this.ch_nutrition_anthropometry.weight });
        this.form.patchValue({ size: this.ch_nutrition_anthropometry.size });
        this.form.patchValue({ arm_circunferency: this.ch_nutrition_anthropometry.arm_circunferency });
        this.form.patchValue({ calf_circumference: this.ch_nutrition_anthropometry.calf_circumference });
        this.form.patchValue({ knee_height: this.ch_nutrition_anthropometry.knee_height });
        this.form.patchValue({ abdominal_perimeter: this.ch_nutrition_anthropometry.abdominal_perimeter });
        this.form.patchValue({ hip_perimeter: this.ch_nutrition_anthropometry.hip_perimeter });
        this.messageEvent.emit({
          name: 'weight',
          value: this.form.controls.weight.value
        });
        this.botton_title = 'Actualizar';
      }
    });
  }

  onInputChanges(event) {
    if (this.form.controls.weight.value != '' && this.form.controls.size.value != '') {
      this.geteratedIMC = (this.form.controls.weight.value /
        ((this.form.controls.size.value / 100) * (this.form.controls.size.value / 100))).toFixed(2);
      this.classification = this.getClassification(this.geteratedIMC);
    } else {
      this.geteratedIMC = null;
      this.classification = null;
    }

    if (this.form.controls.size.value != '' &&
      this.form.controls.abdominal_perimeter.value != '' &&
      this.form.controls.hip_perimeter.value != '') {
      var c1 = 1;
      var c2 = 1;
      var c3 = 1;
      var c4 = 1;
      if (this.data.gender_id == 2) {
        c1 = 137.432;
        c2 = 0.60035;
        c3 = 0.785;
        c4 = 0.392;
      } else if (this.data.gender_id == 1) {
        c1 = 110.924;
        c2 = 0.4053;
        c3 = 0.325;
        c4 = 0.836;
      }
      this.estimated_weight = (-c1 +
        (this.form.controls.size.value * c2) +
        (this.form.controls.abdominal_perimeter.value * c3) +
        (this.form.controls.hip_perimeter.value * c4)).toFixed(2);

    } else {
      this.estimated_weight = null;
    }

    if (this.form.controls.knee_height.value != '') {
      var c1 = 1;
      var c2 = 1;
      var c3 = 1;
      if (this.data.gender_id == 2) {
        c1 = 2.02;
        c2 = 0.04;
        c3 = 64.19;
      } else if (this.data.gender_id == 1) {
        c1 = 1.83;
        c2 = 0.24;
        c3 = 84.88;
      }
      this.estimated_size = ((c1 * this.form.controls.knee_height.value) - (c2 * this.age) + c3).toFixed(2);
    } else {
      this.estimated_size = null;
    }

    if (this.form.controls.size.value != '' &&
      this.form.controls.weight.value != '') {
      var c1 = 1;
      var c2 = 1;
      var c3 = 1;
      var c4 = 1;
      if (this.data.gender_id == 2) {
        c1 = 66;
        c2 = 13.7;
        c3 = 5;
        c4 = 6.8;
      } else if (this.data.gender_id == 1) {
        c1 = 655;
        c2 = 9.6;
        c3 = 1.8;
        c4 = 4.7;
      }
      this.total_energy_expenditure = (c1 +
        (this.form.controls.weight.value * c2) +
        (this.form.controls.size.value * c3) -
        (this.age * c4)).toFixed(2);

    } else {
      this.total_energy_expenditure = null;
    }
  }

  getClassification(imc: any) {
    if (imc < 18.5) {
      return 'Bajo Peso';
    } else if (imc >= 18.5 && imc <= 24.9) {
      return 'Normal';
    } else if (imc > 24.9 && imc <= 29.9) {
      return 'Sobrepeso';
    } else if (imc > 29.9 && imc <= 34.9) {
      return 'Obesidad I';
    } else if (imc > 34.9 && imc <= 39.9) {
      return 'Obesidad II';
    } else if (imc > 39.9) {
      return 'Obesidad III';
    }
  }

  getAge(birthday: string): number {
    var date = new Date(birthday);
    var ageDifMs = Date.now() - date.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.messageEvent.emit({
        name: 'weight',
        value: this.form.controls.weight.value
      });
      this.loading = true;
      this.messageError = null;
      if (this.ch_nutrition_anthropometry != null) {
        this.ChNutritionAnthropometryS.Update({
          id: this.ch_nutrition_anthropometry.id,
          ch_record_id: this.record_id,
          type_record_id: this.route,
          is_functional: this.form.controls.is_functional.value,
          weight: this.form.controls.weight.value,
          size: this.form.controls.size.value,
          arm_circunferency: this.form.controls.arm_circunferency.value,
          calf_circumference: this.form.controls.calf_circumference.value,
          knee_height: this.form.controls.knee_height.value,
          abdominal_perimeter: this.form.controls.abdominal_perimeter.value,
          hip_perimeter: this.form.controls.hip_perimeter.value,
          geteratedIMC: this.geteratedIMC,
          classification: this.classification,
          estimated_weight: this.estimated_weight,
          estimated_size: this.estimated_size,
          total_energy_expenditure: this.total_energy_expenditure,
        }).then(x => {
          this.saved = x;
          this.loading = false;
          this.ch_nutrition_anthropometry = x.data.ch_nutrition_anthropometry;
          this.botton_title = 'Actualizar';
          this.toastService.success('Registro actualizado correctamente', 'Correcto');
        }).catch(x => {
          this.loading = false;
          this.toastService.danger(x, 'Error');
        });
      } else {
        this.ChNutritionAnthropometryS.Save({
          ch_record_id: this.record_id,
          type_record_id: this.route,
          is_functional: this.form.controls.is_functional.value,
          weight: this.form.controls.weight.value,
          size: this.form.controls.size.value,
          arm_circunferency: this.form.controls.arm_circunferency.value,
          calf_circumference: this.form.controls.calf_circumference.value,
          knee_height: this.form.controls.knee_height.value,
          abdominal_perimeter: this.form.controls.abdominal_perimeter.value,
          hip_perimeter: this.form.controls.hip_perimeter.value,
          geteratedIMC: this.geteratedIMC,
          classification: this.classification,
          estimated_weight: this.estimated_weight,
          estimated_size: this.estimated_size,
          total_energy_expenditure: this.total_energy_expenditure,
        }).then(x => {
          this.saved = x;
          this.loading = false;
          this.ch_nutrition_anthropometry = x.data.ch_nutrition_anthropometry;
          this.botton_title = 'Actualizar';
          this.toastService.success('Registro guardado correctamente', 'Correcto');
        }).catch(x => {
          this.loading = false;
          this.toastService.danger(x, 'Error');
        });
      }
    }
  }

}
