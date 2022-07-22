import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { ChNutritionFoodHistoryService } from '../../../../../business-controller/ch-nutrition-food-history.service';
import { BaseTableComponent } from '../../../../components/base-table/base-table.component';


@Component({
  selector: 'ngx-form-food-history',
  templateUrl: './form-food-history.component.html',
  styleUrls: ['./form-food-history.component.scss']
})
export class FormFoodHistoryComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Input() route: any = null;
  @Input() record_id: any = null;
  @Input() user_id: any = null;

  linearMode = false;
  public form: FormGroup;
  public messageError: string = null;
  public subtitle: string = null;
  public messageToltip: string = `Búsqueda por:`;
  public rips_typefile: any[];
  public isSubmitted: boolean = false;
  public show_alergy: boolean = false;
  public saved: any = null;
  public ch_nutrition_food_history: any = null;
  public loading: boolean = false;
  public is_allergic = [
    { id: true, name: 'Si' },
    { id: false, name: 'NO' },
  ];
  public appetite = [
    { id: 'AUMENTADO', name: 'AUMENTADO' },
    { id: 'BUENO', name: 'BUENO' },
    { id: 'DISMINUIDO', name: 'DISMINUIDO' },
    { id: 'MALO', name: 'MALO' },
    { id: 'REGULAR', name: 'REGULAR' },
  ];
  public intake = [
    { id: 'LENTA', name: 'LENTA' },
    { id: 'NORMAL', name: 'NORMAL' },
    { id: 'RAPIDA', name: 'RAPIDA' },
  ];
  public swallowing = [
    { id: 'DEFICIENTE', name: 'DEFICIENTE' },
    { id: 'NORMAL', name: 'NORMAL' },
  ];
  public parenteral_nutrition = [
    { id: 'PERIFÉRICA', name: 'PERIFÉRICA' },
    { id: 'TOTAL', name: 'TOTAL' },
  ];
  public diet_type = [
    { id: "LIQUIDA CLARA", name: "LIQUIDA CLARA" },
    { id: "LIQUIDA COMPLETA", name: "LIQUIDA COMPLETA" },
    { id: "BLANDA - TODO MIEL ", name: "BLANDA - TODO MIEL " },
    { id: "BLANDA - TODO MOLIDO", name: "BLANDA - TODO MOLIDO" },
    { id: "BLANDA - PURE", name: "BLANDA - PURE" },
    { id: "BLANDA - TODO PICADO", name: "BLANDA - TODO PICADO" },
    { id: "BLANDA - ESTIMULO", name: "BLANDA - ESTIMULO" },
    { id: "SEMIBLANDA", name: "SEMIBLANDA" },
    { id: "NORMAL", name: "NORMAL" },
    { id: "HIPOCALORICA", name: "HIPOCALORICA" },
    { id: "HIPERCALORICA", name: "HIPERCALORICA" },
    { id: "HIPOPROTEICA", name: "HIPOPROTEICA" },
    { id: "HIPERPROTEICA", name: "HIPERPROTEICA" },
    { id: "HIPOGLUCIDA", name: "HIPOGLUCIDA" },
    { id: "HIPOSODICA", name: "HIPOSODICA" },
    { id: "HIPOGRASA", name: "HIPOGRASA" },
    { id: "ALTA EN FIBRA", name: "ALTA EN FIBRA" },
    { id: "VEGETARIANA", name: "VEGETARIANA" },
    { id: "CETOGENICA", name: "CETOGENICA" },
    { id: "SOPORTE NUTRICIONAL ESPECIALIZADO - GASTROSTOMIA", name: "SOPORTE NUTRICIONAL ESPECIALIZADO - GASTROSTOMIA" },
    { id: "SOPORTE NUTRICIONAL ESPECIALIZADO - SONDA NASOGASTRICA", name: "SOPORTE NUTRICIONAL ESPECIALIZADO - SONDA NASOGASTRICA" },
    { id: "SOPORTE NUTRICIONAL ESPECIALIZADO - SONDA OROGASTRICA", name: "SOPORTE NUTRICIONAL ESPECIALIZADO - SONDA OROGASTRICA" },
    { id: "SOPORTE NUTRICIONAL ESPECIALIZADO - YEYUNOSTOMIA", name: "SOPORTE NUTRICIONAL ESPECIALIZADO - YEYUNOSTOMIA" },
  ];



  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  public settings = {
    pager: {
      display: true,
      perPage: 10,
    },
    columns: {
      observation: {
        title: 'Antecedentes',
        type: 'string',
      },
    },
  };

  constructor(
    private formBuilder: FormBuilder,
    private ChNutritionFoodHistoryS: ChNutritionFoodHistoryService,
    private toastService: NbToastrService,
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      description: ['', Validators.required],
      is_allergic: ['', Validators.required],
      allergy: ['', Validators.required],
      appetite: ['', Validators.required],
      intake: ['', Validators.required],
      swallowing: ['', Validators.required],
      diet_type: [[], Validators.required],
      parenteral_nutrition: ['', Validators.required],
      intake_control: ['', Validators.required],
    });

    this.form.get('is_allergic').valueChanges.subscribe(val => {
      if (val) {
        this.show_alergy = true;
        this.form.controls.allergy.setValidators([Validators.required]);
        this.form.controls.allergy.updateValueAndValidity();
      } else {
        this.show_alergy = false;
        this.form.patchValue({ allergy: '' });
        this.form.controls.allergy.setValidators([]);
        this.form.controls.allergy.updateValueAndValidity();
      }
    });

    this.ChNutritionFoodHistoryS.GetCollection({
      type_record_id: this.route,
      ch_record_id: this.record_id,
    }).then(x => {
      this.ch_nutrition_food_history = x;
      if (this.ch_nutrition_food_history.id) {
        this.form.patchValue({ description: this.ch_nutrition_food_history.description });
        this.form.patchValue({ appetite: this.ch_nutrition_food_history.appetite });
        this.form.patchValue({ intake: this.ch_nutrition_food_history.intake });
        this.form.patchValue({ swallowing: this.ch_nutrition_food_history.swallowing });
        this.form.patchValue({ diet_type: JSON.parse(this.ch_nutrition_food_history.diet_type) });
        this.form.patchValue({ parenteral_nutrition: this.ch_nutrition_food_history.parenteral_nutrition });
        this.form.patchValue({ intake_control: this.ch_nutrition_food_history.intake_control });
        if (this.ch_nutrition_food_history.is_allergic == 1) {
          this.show_alergy = true;
          this.form.patchValue({ allergy: this.ch_nutrition_food_history.allergy });
          this.form.patchValue({ is_allergic: true });
          this.form.controls.allergy.setValidators([Validators.required]);
          this.form.controls.allergy.updateValueAndValidity();
        } else {
          this.show_alergy = false;
          this.form.patchValue({ allergy: '' });
          this.form.patchValue({ is_allergic: false });
          this.form.controls.allergy.setValidators([]);
          this.form.controls.allergy.updateValueAndValidity();
        }
      }
    });
  }

  save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.messageError = null;
      if (this.ch_nutrition_food_history.id) {
        this.ChNutritionFoodHistoryS.Update({
          id: this.ch_nutrition_food_history.id,
          ch_record_id: this.record_id,
          type_record_id: this.route,
          is_allergic: this.form.controls.is_allergic.value,
          allergy: this.form.controls.allergy.value,
          description: this.form.controls.description.value,
          appetite: this.form.controls.appetite.value,
          intake: this.form.controls.intake.value,
          swallowing: this.form.controls.swallowing.value,
          diet_type: JSON.stringify(this.form.controls.diet_type.value),
          parenteral_nutrition: this.form.controls.parenteral_nutrition.value,
          intake_control: this.form.controls.intake_control.value,
        }).then(x => {
          this.saved = x;
          this.ch_nutrition_food_history = x;
          this.toastService.success('Registro actualizado correctamente', 'Correcto');
        }).catch(x => {
          this.loading = false;
          this.toastService.danger(x, 'Error');
        });
      } else {
        this.ChNutritionFoodHistoryS.Save({
          ch_record_id: this.record_id,
          type_record_id: this.route,
          is_allergic: this.form.controls.is_allergic.value,
          allergy: this.form.controls.allergy.value,
          description: this.form.controls.description.value,
          appetite: this.form.controls.appetite.value,
          intake: this.form.controls.intake.value,
          swallowing: this.form.controls.swallowing.value,
          diet_type: JSON.stringify(this.form.controls.diet_type.value),
          parenteral_nutrition: this.form.controls.parenteral_nutrition.value,
          intake_control: this.form.controls.intake_control.value,
        }).then(x => {
          this.saved = x;
          this.ch_nutrition_food_history = x;
          this.toastService.success('Registro guardado correctamente', 'Correcto');
        }).catch(x => {
          this.loading = false;
          this.toastService.danger(x, 'Error');
        });
      }
    }
  }

}
