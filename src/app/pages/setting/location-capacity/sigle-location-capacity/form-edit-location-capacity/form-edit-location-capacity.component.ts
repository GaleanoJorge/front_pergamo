import { Component, OnInit, Input } from '@angular/core';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { LocationCapacityService } from '../../../../../business-controller/location-capacity.service';
import { DateFormatPipe } from '../../../../../pipe/date-format.pipe';


@Component({
  selector: 'ngx-form-edit-location-capacity',
  templateUrl: './form-edit-location-capacity.component.html',
  styleUrls: ['./form-edit-location-capacity.component.scss']
})
export class FormEditLocationCapacityComponent implements OnInit {

  @Input() title: string;
  @Input() data:any = null;

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public new_location_capacity: number;
  public capacity_month;

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private locationCapacityS: LocationCapacityService,
    private toastService: NbToastrService,
    public datePipe: DateFormatPipe,
  ) {
  }

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        assistance_id: '',
        phone_consult: '',
        location_id: '',
        validation_date: '',
        PAD_patient_quantity: '',
        PAD_patient_attended: '',
        PAD_patient_actual_capacity: '',
      };
    }

    this.new_location_capacity = this.data.PAD_patient_actual_capacity;
    this.capacity_month = this.datePipe.getMonthPretty(this.data.validation_date)
    
    this.form = this.formBuilder.group({
      assistance_id: [this.data.assistance_id],
      phone_consult: [this.data.phone_consult],
      location_id: [this.data.location_id],
      validation_date: [this.data.validation_date],
      PAD_patient_quantity: [this.data.PAD_patient_quantity],
      PAD_patient_attended: [this.data.PAD_patient_attended],
      PAD_patient_actual_capacity: [this.data.PAD_patient_actual_capacity],
    });
  }
  
  changeLocationCapacity(event) {
    var A = Math.abs(Math.floor(event.target.valueAsNumber));
    this.new_location_capacity = A;
  }

  close() {
    this.dialogRef.close();
  }

  save() {

    this.isSubmitted = true;
    if (this.new_location_capacity<0){
      return this.toastService.warning('ALERTA', 'La capacidad actual no puede ser menor a 0');
    }
    if (!this.form.invalid) {
      this.loading = true;

      if (this.data.id) {
        this.locationCapacityS.Update({
          id: this.data.id,
          assistance_id: this.form.controls.assistance_id.value,
          phone_consult: this.form.controls.phone_consult.value,
          location_id: this.form.controls.location_id.value,
          validation_date: this.form.controls.validation_date.value,
          PAD_patient_quantity: this.form.controls.PAD_patient_quantity.value + (this.new_location_capacity - this.data.PAD_patient_actual_capacity),
          PAD_patient_attended: this.form.controls.PAD_patient_attended.value,
          PAD_patient_actual_capacity: this.new_location_capacity,
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
        
        this.locationCapacityS.Save({
          name: this.form.controls.name.value,
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
