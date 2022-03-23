import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DietSuppliesService } from '../../../../business-controller/diet-supplies.service';
import { MeasurementUnitsService } from '../../../../business-controller/measurement-units.service';
import { DietSupplyTypeService } from '../../../../business-controller/diet-supply-type.service';


@Component({
  selector: 'ngx-form-diet-supplies',
  templateUrl: './form-diet-supplies.component.html',
  styleUrls: ['./form-diet-supplies.component.scss']
})
export class FormDietSuppliesComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;

  public diet_supply_type: any[];
  public measurement_units: any[];

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private DietSuppliesS: DietSuppliesService,
    private toastService: NbToastrService,
    private dietSupplyTypeS: DietSupplyTypeService,
    private measurementUnitsS: MeasurementUnitsService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        name: '',
        diet_supply_type_id: '',
        measurement_units_id: '',
      };
    }

    this.dietSupplyTypeS.GetCollection().then(x => {
      this.diet_supply_type = x;
    });
    this.measurementUnitsS.GetCollection().then(x => {
      this.measurement_units = x;
    });

    this.form = this.formBuilder.group({
      name: [this.data.name, Validators.compose([Validators.required])],
      diet_supply_type_id: [this.data.diet_supply_type_id, Validators.compose([Validators.required])],
      measurement_units_id: [this.data.measurement_units_id, Validators.compose([Validators.required])],
    });
  }


  close() {
    this.dialogRef.close();
  }

  save() {

    this.isSubmitted = true;

    if (!this.form.invalid) {
      this.loading = true;

      if (this.data.id) {
        this.DietSuppliesS.Update({
          id: this.data.id,
          name: this.form.controls.name.value,
          diet_supply_type_id: this.form.controls.diet_supply_type_id.value,
          measurement_units_id: this.form.controls.measurement_units_id.value,
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

        this.DietSuppliesS.Save({
          name: this.form.controls.name.value,
          diet_supply_type_id: this.form.controls.diet_supply_type_id.value,
          measurement_units_id: this.form.controls.measurement_units_id.value,
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
      }

    }
  }

}
