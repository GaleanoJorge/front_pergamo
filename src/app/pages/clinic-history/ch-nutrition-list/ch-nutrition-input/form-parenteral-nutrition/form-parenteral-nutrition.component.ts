import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';


@Component({
  selector: 'ngx-form-parenteral-nutrition',
  templateUrl: './form-parenteral-nutrition.component.html',
  styleUrls: ['./form-parenteral-nutrition.component.scss']
})
export class FormParenteralNutritionComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Input() weight: any = null;
  @Input() user_id: any = null;

  linearMode = false;
  public form: FormGroup;
  public rips_typefile: any[];
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public messageError = null;
  public total_grams_of_protein = null;
  public grams_of_nitrogen = null;
  public total_carbohydrates = null;
  public total_grams_of_lipids = null;
  public total_calories = 'Resultado';
  public amino_acid_volume = [
    { id: 8.5, name: '8.5%' },
    { id: 10, name: '10%' },
    { id: 15, name: '15%' },
  ];
  public ce_se = [
    { id: 'CE', name: 'CE' },
    { id: 'SE', name: 'SE' },
  ];
  public dextrose_volume = [
    { id: 5, name: '5%' },
    { id: 10, name: '10%' },
    { id: 50, name: '50%' },
  ];
  public lipid_volume = [
    { id: 5, name: '5%' },
    { id: 15, name: '15%' },
    { id: 20, name: '20%' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      protein_contributions: ['', Validators.required],
      carbohydrate_contribution: ['', Validators.required],
      lipid_contribution: ['', Validators.required],
      amino_acid_volume: ['', Validators.required],
      ce_se: ['', Validators.required],
      dextrose_volume: ['', Validators.required],
      lipid_volume: ['', Validators.required],
    });
  }

  onInputChanges(event) {
    if (this.form.controls.protein_contributions.value != '') {
      this.total_grams_of_protein = (this.form.controls.protein_contributions.value * this.weight).toFixed(2);
      this.grams_of_nitrogen = ((this.total_grams_of_protein*16)/100).toFixed(2);
    } else {
      this.total_grams_of_protein = null;
      this.grams_of_nitrogen = null;
    }

    if (this.form.controls.carbohydrate_contribution.value != '') {
      this.total_carbohydrates = ((this.form.controls.carbohydrate_contribution.value * this.weight*1440)-1000).toFixed(2);
    } else {
      this.total_carbohydrates = null;
    }

    if (this.form.controls.lipid_contribution.value != '') {
      this.total_grams_of_lipids = (this.form.controls.lipid_contribution.value * this.weight).toFixed(2);
    } else {
      this.total_grams_of_lipids = null;
    }
  }

  save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {

    }
  }

}
