import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';


@Component({
  selector: 'ngx-form-anthropometry',
  templateUrl: './form-anthropometry.component.html',
  styleUrls: ['./form-anthropometry.component.scss']
})
export class FormAnthropometryComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Input() user_id: any = null;
  @Output() messageEvent = new EventEmitter<any>();

  linearMode = false;
  public form: FormGroup;
  public rips_typefile: any[];
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public messageError = null;
  public is_functional = [
    {id: 'SI', name: 'Si'},
    {id: 'NO', name: 'NO'},
  ];
  public geteratedIMC = null;
  public estimated_weight = null;
  public estimated_size = null;
  public total_energy_expenditure = null;
  public classification = null;
  public age = null;


  constructor(
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
  ) {
  }

  ngOnInit(): void {
    this.age = this.getAge(this.data.birthday);
    this.form = this.formBuilder.group({
      is_functional: ['', Validators.required],
      weight: ['', Validators.required],
      size: ['', Validators.required],
      leg_height: ['', Validators.required],
      calf_circumference: ['', Validators.required],
      knee_height: ['', Validators.required],
      abdominal_perimeter: ['', Validators.required],
      hip_perimeter: ['', Validators.required],
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
        c1 = 65.5;
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
    }
  }

}
