import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DietDishService } from '../../../../business-controller/diet-dish.service';
import { DietDishStockService } from '../../../../business-controller/diet-dish-stock.service';


@Component({
  selector: 'ngx-form-diet-dish',
  templateUrl: './form-diet-dish.component.html',
  styleUrls: ['./form-diet-dish.component.scss']
})
export class FormDietDishComponent implements OnInit {

  @Input() title: string;
  @Input() view: boolean = false;
  @Input() data: any = null;

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public parentData;
  public enabled_name = true;

  public selectedOptions: any[] = [];
  // public selectedOptions2: any[] = [];

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private DietDishS: DietDishService,
    private toastService: NbToastrService,
    private dietDishStockS: DietDishStockService,
    private toastS: NbToastrService,
  ) {
  }

  ngOnInit(): void {
    this.parentData = {
      selectedOptions: [],
      entity: 'diet_supplies',
      customData: 'diet_supplies',
      };
    if (!this.data) {
      this.data = {
        name: '',
      };
    } else if (this.data.view) {
      this.enabled_name = false
      this.parentData.entity = 'diet_dish_stock?diet_dish_id=' + this.data.id;
      this.parentData.customData = 'diet_dish_stock';
    }

    this.dietDishStockS.GetCollection({ diet_dish_id: this.data.id }).then(x => {
      this.parentData.selectedOptions = x;
    });

    this.form = this.formBuilder.group({
      name: [this.data.name, Validators.compose([Validators.required])],
    });
    if(!this.enabled_name){
      this.form.get('name').disable();
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
        this.toastS.danger('Debe seleccionar al menos un insumo', 'Error');
      } else {
        this.selectedOptions.forEach(element => {
          if (element.amount == null || element.amount <= 0 || element.amount_damaged <= 0) {
            valid_values = false;
          }
        });
        if (!valid_values) {
          this.toastS.danger('Debe ingresar una cantidad valida', 'Error');
        }
      }
      if (valid_values) {
        this.loading = true;
        if (this.data.id) {
          this.DietDishS.Update({
            id: this.data.id,
            name: this.form.controls.name.value,
          }).then(x => {
            this.toastService.success('', x.message);
            this.close();
            var id = x.data.diet_dish.id;
            var contador = 0;
            var err = 0;
            if (this.saved) {
              this.saved();
            }
            this.dietDishStockS.Update({
              diet_dish_id: id,
              diet_supplies_id: JSON.stringify(this.selectedOptions),
              amount: 10,
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

          this.DietDishS.Save({
            name: this.form.controls.name.value,
          }).then(x => {
            this.toastService.success('', x.message);
            this.close();
            var id = x.data.diet_dish.id;
            var contador = 0;
            var err = 0;
            this.dietDishStockS.Save({
              diet_dish_id: id,
              diet_supplies_id: JSON.stringify(this.selectedOptions),
              amount: 10,
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
            if (this.saved) {
              this.saved();
            }
          }).catch(x => {
            this.isSubmitted = false;
            this.loading = false;
          });
        }
      }
    }
  }

}
