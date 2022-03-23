import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DietWeekService } from '../../../../business-controller/diet-week.service';
import { DietDayService } from '../../../../business-controller/diet-day.service';
import { DietAdmissionService } from '../../../../business-controller/diet-admission.service';
import { DietConsistencyService } from '../../../../business-controller/diet-consistency.service';
import { DietComponentService } from '../../../../business-controller/diet-componet.service';
import { DietAdmissionComponentService } from '../../../../business-controller/diet-admission-component.service';


@Component({
  selector: 'ngx-form-diet-admission',
  templateUrl: './form-diet-admission.component.html',
  styleUrls: ['./form-diet-admission.component.scss'],
})
export class FormDietAdmissionComponent implements OnInit {
  @Input() title: string;
  @Input() data: any = null;

  public form: FormGroup;
  public loading: boolean = false;
  public isSubmitted: boolean = false;
  public saved: any = null;

  public diet_consistency: any[];
  public selectedOptions: any[] = [];


  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private dietAdmissionComponentS: DietAdmissionComponentService,
    private dietConsistencyS: DietConsistencyService,
    private dietAdmissionS: DietAdmissionService,
    private toastS: NbToastrService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data) {
      // this.data = {
      //   diet_admission_id: '',
      //   diet_consistency_id: '',
      // };
    }
    
    this.dietConsistencyS.GetCollection().then(x => {
      this.diet_consistency = x;
    });

    this.dietAdmissionS.GetCollection({admissions_id: this.data.admissions[0].id}).then(x => {
      this.data.diet_admission_id = x[0].id;
      this.data.diet_consistency_id = x[0].diet_consistency_id;
    });



    this.form = this.formBuilder.group({
      diet_consistency_id: [this.data.diet_consistency_id, Validators.compose([Validators.required])],
    });


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
      this.loading = true;
      if (this.data.diet_admission_id) {
        this.dietAdmissionS.Update({
          id: this.data.diet_admission_id,
          admissions_id: this.data.admissions[0].id,
          diet_consistency_id: this.form.controls.diet_consistency_id.value,
        }).then(x => {
          this.toastService.success('', x.message);
          this.close();
          var id = x.data.diet_admission.id;
          var contador = 0;
          var err = 0;
          
          if (!this.selectedOptions.length) {
            this.toastS.danger(null, 'Debe seleccionar al menos un componente');
          }
          else {
            this.dietAdmissionComponentS.Update({
              diet_admission_id: id,
              diet_component_id: JSON.stringify(this.selectedOptions),
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
          }
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      } else {
        this.dietAdmissionS.Save({
          admissions_id: this.data.admissions[0].id,
          diet_consistency_id: this.form.controls.diet_consistency_id.value,
        }).then(x => {
          this.toastService.success('', x.message);
          this.close();
          var id = x.data.diet_admission.id;
          var contador = 0;
          var err = 0;
          if (this.saved) {
            this.saved();
          }
          if (!this.selectedOptions.length) {
            this.toastS.danger(null, 'Debe seleccionar al menos un plato');
          }
          else {
            this.dietAdmissionComponentS.Save({
              diet_admission_id: id,
              diet_component_id: JSON.stringify(this.selectedOptions),
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
          this.isSubmitted = false;
          this.loading = false;
        });
      }
    }
  }
}
