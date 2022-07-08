import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { ChNutritionParentalService } from '../../../../../business-controller/ch-nutrition-parenteral.service';


@Component({
  selector: 'ngx-form-parenteral-nutrition',
  templateUrl: './form-parenteral-nutrition.component.html',
  styleUrls: ['./form-parenteral-nutrition.component.scss']
})
export class FormParenteralNutritionComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Input() weight: any = null;
  @Input() route: any = null;
  @Input() record_id: any = null;
  @Input() user_id: any = null;

  linearMode = false;
  public form: FormGroup;
  public rips_typefile: any[];
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public messageError = null;
  public total_grams_of_protein = 0.00;
  public grams_of_nitrogen = 0.00;
  public total_carbohydrates = 0.00;
  public total_grams_of_lipids = 0.00;
  public total_amino_acid_volume = 0.00;
  public total_dextrose_volume = 0.00;
  public total_lipid_volume = 0.00;
  public total_calories = 0.00;
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
    private ChNutritionParentalNutritionS: ChNutritionParentalService,
    private toastService: NbToastrService,
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      protein_contributions: [''],
      carbohydrate_contribution: [''],
      lipid_contribution: [''],
      amino_acid_volume: [''],
      ce_se: [''],
      dextrose_volume: [''],
      lipid_volume: [''],
    });
  }

  onInputChanges(event) {
    if (this.form.controls.protein_contributions.value != '') {
      this.total_grams_of_protein = parseFloat((this.form.controls.protein_contributions.value * this.weight).toFixed(2));
      this.grams_of_nitrogen = parseFloat(((this.total_grams_of_protein * 16) / 100).toFixed(2));
    } else {
      this.total_grams_of_protein = 0.00;
      this.grams_of_nitrogen = 0.00;
    }

    if (this.form.controls.carbohydrate_contribution.value != '') {
      this.total_carbohydrates = parseFloat(((this.form.controls.carbohydrate_contribution.value * this.weight * 1440) / 1000).toFixed(2));
    } else {
      this.total_carbohydrates = 0.00;
    }

    if (this.form.controls.lipid_contribution.value != '') {
      this.total_grams_of_lipids = parseFloat((this.form.controls.lipid_contribution.value * this.weight).toFixed(2));
    } else {
      this.total_grams_of_lipids = 0.00;
    }

    if (this.form.controls.amino_acid_volume.value != '') {
      this.total_amino_acid_volume = parseFloat(((100 * this.total_grams_of_protein) / this.form.controls.amino_acid_volume.value).toFixed(2));
    } else {
      this.total_amino_acid_volume = 0.00;
    }

    if (this.form.controls.dextrose_volume.value != '') {
      this.total_dextrose_volume = parseFloat(((100 * this.total_carbohydrates) / this.form.controls.dextrose_volume.value).toFixed(2));
    } else {
      this.total_dextrose_volume = 0.00;
    }

    if (this.form.controls.lipid_volume.value != '') {
      this.total_lipid_volume = parseFloat(((100 * this.total_grams_of_lipids) / this.form.controls.lipid_volume.value).toFixed(2));
    } else {
      this.total_lipid_volume = 0.00;
    }

    if (this.total_grams_of_protein != null && this.total_carbohydrates != null && this.total_grams_of_lipids != null) {
      this.total_calories = parseFloat(((this.total_grams_of_protein * 4) + (this.total_carbohydrates * 3.4) + (this.total_grams_of_lipids * 10)).toFixed(2));
    } else {
      this.total_calories = 0.00;
    }
  }

  save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.messageError = null;
      this.ChNutritionParentalNutritionS.Save({
        ch_record_id: this.record_id,
        type_record_id: this.route,
        protein_contributions: this.form.controls.protein_contributions.value,
        carbohydrate_contribution: this.form.controls.carbohydrate_contribution.value,
        lipid_contribution: this.form.controls.lipid_contribution.value,
        amino_acid_volume: this.form.controls.amino_acid_volume.value,
        ce_se: this.form.controls.ce_se.value,
        dextrose_volume: this.form.controls.dextrose_volume.value,
        lipid_volume: this.form.controls.lipid_volume.value,
        total_grams_of_protein: this.total_grams_of_protein,
        grams_of_nitrogen: this.grams_of_nitrogen,
        total_carbohydrates: this.total_carbohydrates,
        total_grams_of_lipids: this.total_grams_of_lipids,
        total_amino_acid_volume: this.total_amino_acid_volume,
        total_dextrose_volume: this.total_dextrose_volume,
        total_lipid_volume: this.total_lipid_volume,
        total_calories: this.total_calories,
      }).then(x => {
        this.saved = x;
        this.toastService.success('Registro guardado correctamente', 'Correcto');
      }).catch(x => {
        this.loading = false;
        this.toastService.danger(x, 'Error');
      });
    }
  }

}
