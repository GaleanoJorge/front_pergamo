import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthorizationService } from '../../../../../business-controller/authorization.service';



@Component({
  selector: 'ngx-form-observation',
  templateUrl: './form-observation.component.html',
  styleUrls: ['./form-observation.component.scss']
})
export class FormObservationComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Input() Managemen: any = null;

  public form: FormGroup;
  // public status: Status[];
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public max: any;

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private authorizationS: AuthorizationService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        observation: '',
        authorized_amount: '',
        auth_number: '',
      };
    }

    if (this.Managemen) {
      this.title = 'AUTORIZACIÓN PLAN DE MANEJO';
      this.form = this.formBuilder.group({
        auth_number: [this.data.auth_number, Validators.compose([Validators.required])],
        observation: [this.data.observation,]
      });
    } else {
      this.title = 'OBSERVACIÓN MOTIVO DE CANCELACIÓN';
      this.form = this.formBuilder.group({
        auth_number: [this.data.auth_number,],
        observation: [this.data.observation, Validators.compose([Validators.required])],
      });
    }

    // this.statusBS.GetCollection().then(x => {
    //   this.status = x;
    // });



    // this.CoverageS.GetCollection().then(x => {
    //   this.coverage = x;
    // });
  }


  close() {
    this.saved()
    this.dialogRef.close();
  }

  // compareQuantity() {

  //   if (this.form.controls.authorized_amount.value > this.max) {
  //     this.toastService.warning('','El valor autorizado no puede exceder el valor solicitado en el plan de manejo')
  //     this.form.controls.authorized_amount.setErrors({ 'incorrect': true });
  //   } else {
  //     this.form.controls.authorized_amount.setErrors( null) ;
  //   }
  // }

  save() {

    // if (this.Managemen) {
    //   this.compareQuantity()
    // }
    this.isSubmitted = true;

    if (!this.form.invalid) {
      this.loading = true;
      if (this.data.id) {
        this.authorizationS.Update({
          id: this.data.id,
          auth_number: this.form.controls.auth_number.value ? this.form.controls.auth_number.value : null,
          // authorized_amount: this.form.controls.authorized_amount.value ? this.form.controls.authorized_amount.value : null,
          observation: this.form.controls.observation.value ? this.form.controls.observation.value : null,
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
        this.authorizationS.Save({
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
