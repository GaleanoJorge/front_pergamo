import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DietTherapeuticService } from '../../../../business-controller/diet-therapeutic.service';
import { DietConsistencyService } from '../../../../business-controller/diet-consistency.service';
import { DietTherapeuticComponentService } from '../../../../business-controller/diet-therapeutic-component.service';
import { elementAt } from 'rxjs-compat/operator/elementAt';


@Component({
  selector: 'ngx-form-diet-therapeutic',
  templateUrl: './form-diet-therapeutic.component.html',
  styleUrls: ['./form-diet-therapeutic.component.scss']
})
export class FormDietTherapeuticComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;

  public diet_consistency: any[];
  public diet_therapeutic_component: any[];
  public selectedOptions: any[] = [];
  public selectedOptions2: any[] = [];

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private DietTherapeuticS: DietTherapeuticService,
    private toastService: NbToastrService,
    private dietConsistencyS: DietConsistencyService,
    private dietTherapeuticComponentS: DietTherapeuticComponentService,
    private toastS: NbToastrService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        name: '',
        diet_consistency_id: '',
      };
    }

    this.dietConsistencyS.GetCollection().then(x => {
      this.diet_consistency = x;
    });

    this.dietTherapeuticComponentS.GetCollection({ diet_therapeutic_id: this.data.id }).then(x => {
      this.diet_therapeutic_component = x;
      x.forEach(element => {
        this.selectedOptions2.push(element.diet_component_id);
      });
    });

    this.form = this.formBuilder.group({
      name: [this.data.name, Validators.compose([Validators.required])],
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

      if (this.data.id) {
        this.DietTherapeuticS.Update({
          id: this.data.id,
          name: this.form.controls.name.value,
          diet_consistency_id: this.form.controls.diet_consistency_id.value,
        }).then(x => {
          this.toastService.success('', x.message);
          this.close();
          var id = x.data.diet_therapeutic.id;
          var contador = 0;
          var err = 0;
          if (this.saved) {
            this.saved();
          }
          if (!this.selectedOptions.length) {
            this.toastS.danger(null, 'Debe seleccionar al menos un componente de dieta');
          }
          else {
            this.dietTherapeuticComponentS.Update({
              diet_therapeutic_id: id,
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

        this.DietTherapeuticS.Save({
          name: this.form.controls.name.value,
          diet_consistency_id: this.form.controls.diet_consistency_id.value,
        }).then(x => {
          this.toastService.success('', x.message);
          this.close();
          var id = x.data.diet_therapeutic.id;
          var contador = 0;
          var err = 0;
          if (this.saved) {
            this.saved();
          }
          if (!this.selectedOptions.length) {
            this.toastS.danger(null, 'Debe seleccionar al menos un componente de dieta');
          }
          else {
              this.dietTherapeuticComponentS.Save({
                diet_therapeutic_id: id,
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
