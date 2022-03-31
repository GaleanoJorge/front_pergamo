import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DietMenuTypeService } from '../../../../business-controller/diet-menu-type.service';
import { DietWeekService } from '../../../../business-controller/diet-week.service';
import { DietDayService } from '../../../../business-controller/diet-day.service';
import { DietMenuService } from '../../../../business-controller/diet-menu.service';
import { DietMenuDishService } from '../../../../business-controller/diet-menu-dish.service';
import { DietConsistencyService } from '../../../../business-controller/diet-consistency.service';
import { DietComponentService } from '../../../../business-controller/diet-componet.service';


@Component({
  selector: 'ngx-form-diet-menu',
  templateUrl: './form-diet-menu.component.html',
  styleUrls: ['./form-diet-menu.component.scss'],
})
export class FormDietMenuComponent implements OnInit {
  @Input() title: string;
  @Input() data: any = null;

  public form: FormGroup;
  public loading: boolean = false;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public geteratedName: string = '----';

  public diet_consistency: any[];
  public diet_menu_type: any[];
  public diet_week: any[];
  public diet_component: any[];
  public diet_day: any[];
  public selectedOptions: any[] = [];
  public diet_menu_dish: any[];


  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private dietMenuDishS: DietMenuDishService,
    private dietConsistencyS: DietConsistencyService,
    private dietMenuTypeS: DietMenuTypeService,
    private dietComponentS: DietComponentService,
    private dietWeekS: DietWeekService,
    private dietDayS: DietDayService,
    private dietMenuS: DietMenuService,
    private toastS: NbToastrService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        name: '',
        diet_consistency_id: '',
        diet_menu_type_id: '',
        diet_component_id: '',
        diet_week_id: '',
        diet_day_id: '',
      };
    } else {
      this.geteratedName = this.data.name;
    }

    this.dietMenuDishS.GetCollection({ diet_menu_id: this.data.id }).then(x => {
      this.diet_menu_dish = x;
      x.forEach(element => {
        this.selectedOptions.push(element.diet_dish_id);
      });
    });

    this.dietConsistencyS.GetCollection().then(x => {
      this.diet_consistency = x;
    });
    this.dietComponentS.GetCollection().then(x => {
      this.diet_component = x;
    });
    this.dietMenuTypeS.GetCollection().then(x => {
      this.diet_menu_type = x;
    });
    this.dietWeekS.GetCollection().then(x => {
      this.diet_week = x;
    });
    this.dietDayS.GetCollection().then(x => {
      this.diet_day = x;
    });

    this.form = this.formBuilder.group({
      diet_consistency_id: [this.data.diet_consistency_id, Validators.compose([Validators.required])],
      diet_menu_type_id: [this.data.diet_menu_type_id, Validators.compose([Validators.required])],
      diet_component_id: [this.data.diet_component_id, Validators.compose([Validators.required])],
      diet_week_id: [this.data.diet_week_id, Validators.compose([Validators.required])],
      diet_day_id: [this.data.diet_day_id, Validators.compose([Validators.required])],
    });


  }

  ChangeName($event) {
    if (this.form.controls.diet_consistency_id.value &&
      this.form.controls.diet_menu_type_id.value &&
      this.form.controls.diet_component_id.value &&
      this.form.controls.diet_week_id.value &&
      this.form.controls.diet_day_id.value) {
      this.geteratedName =
        (this.diet_consistency[this.form.controls.diet_consistency_id.value - 1].name ?? '')
        + '-' +
        (this.diet_component[this.form.controls.diet_component_id.value - 1].name ?? '')
        + '-' +
        (this.diet_menu_type[this.form.controls.diet_menu_type_id.value - 1].name ?? '')
        + '-' +
        (this.diet_week[this.form.controls.diet_week_id.value - 1].name ?? '')
        + '-' +
        (this.diet_day[this.form.controls.diet_day_id.value - 1].name ?? '');
    }
  }

  receiveMessage($event) {
    this.selectedOptions = $event;
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      var valid_values = true;
      if (!this.selectedOptions || this.selectedOptions.length == 0) {
        valid_values = false;
        this.toastS.danger('Debe seleccionar al menos un plato', 'Error');
      }
      if (valid_values) {
        this.loading = true;
        if (this.data.id) {
          this.dietMenuS.Update({
            id: this.data.id,
            name: this.geteratedName,
            diet_consistency_id: this.form.controls.diet_consistency_id.value,
            diet_menu_type_id: this.form.controls.diet_menu_type_id.value,
            diet_component_id: this.form.controls.diet_component_id.value,
            diet_week_id: this.form.controls.diet_week_id.value,
            diet_day_id: this.form.controls.diet_day_id.value,
          }).then(x => {
            this.toastService.success('', x.message);
            this.close();
            var id = x.data.diet_menu.id;
            var contador = 0;
            var err = 0;
            this.dietMenuDishS.Update({
              diet_menu_id: id,
              diet_dish_id: JSON.stringify(this.selectedOptions),
            }, id).then(x => {
            }).catch(x => {
              err++;
            });
            contador++;

            if (contador > 0) {
              this.toastS.success(null, 'Se actualizaron ' + contador + ' elemetos');
            } else if (err > 0) {
              this.toastS.danger(null, 'No se actualizaron ' + contador + ' elemetos');
            }
            this.selectedOptions = [];
            if (this.saved) {
              this.saved();
            }
          }).catch(x => {
            this.isSubmitted = false;
            this.loading = false;
          });
        } else {
          this.dietMenuS.Save({
            name: this.geteratedName,
            diet_consistency_id: this.form.controls.diet_consistency_id.value,
            diet_menu_type_id: this.form.controls.diet_menu_type_id.value,
            diet_component_id: this.form.controls.diet_component_id.value,
            diet_week_id: this.form.controls.diet_week_id.value,
            diet_day_id: this.form.controls.diet_day_id.value,
          }).then(x => {
            this.toastService.success('', x.message);
            this.close();
            var id = x.data.diet_menu.id;
            var contador = 0;
            var err = 0;
            if (this.saved) {
              this.saved();
            }
            else {
              this.dietMenuDishS.Save({
                diet_menu_id: id,
                diet_dish_id: JSON.stringify(this.selectedOptions),
              }).then(x => {
              }).catch(x => {
                err++;
              });
              contador++;
              if (contador > 0) {
                this.toastS.success(null, 'Se actualizaron ' + contador + ' elemetos');
              } else if (err > 0) {
                this.toastS.danger(null, 'No se actualizaron ' + contador + ' elemetos');
              }
              this.selectedOptions = [];
            }
            if (this.saved) {
              this.saved();
            }
          }).catch(x => {
            this.toastService.danger('', x);
            this.isSubmitted = false;
            this.loading = false;
          });
        }
      }
    }
  }
}
