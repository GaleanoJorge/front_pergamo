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
  @Input() auth_status: any = null;

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
        auth_number: '',
        copay: '',
        copay_value: '',
        file_auth: '',
      };
    }

    
    this.form = this.formBuilder.group({
      observation: [
        this.data.observation,
      ],
      auth_number: [
        this.data.auth_number,
        Validators.compose([Validators.required]),
      ],
      copay: [
        this.data.copay ? true : null,
      ],
      copay_value: [
        this.data.copay_value,
      ],
      file_auth: [
        null,
      ]
    });

    if (this.Managemen) {
      this.title = 'AUTORIZACIÓN PLAN DE MANEJO';
    } else if(this.auth_status == 3){
      this.title = 'Autorizar paquete: ' + this.data.services_briefcase.manual_price.name;
    } else {
      this.title = this.auth_status == 4 ? 'OBSERVACIÓN MOTIVO DE CANCELACIÓN' : 'GESTIONAR ERRADA POR EPS';
      this.form.controls.auth_number.clearValidators();
      this.form.controls.auth_number.updateValueAndValidity();
      this.form.controls.observation.setValidators(Validators.compose([Validators.required]));
    }
  }


  close() {
    this.saved()
    this.dialogRef.close();
  }

  async changeImage(files, option) {
    if (!files.length) return false;

    const file = await this.toBase64(files[0]);

    switch (option) {
      case 1:
        this.form.patchValue({
          file_auth: files[0],
        });
        break;
    }
  }

  toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  })

  save() {
    this.isSubmitted = true;

    if (!this.form.invalid) {
      this.loading = true;
      if (this.data.id) {
        this.authorizationS.Update({
          id: this.data.id,
          auth_status_id: this.auth_status,
          auth_number: this.form.controls.auth_number.value,
          observation: this.form.controls.observation.value,
          copay: this.form.controls.copay.value,
          copay_value: this.form.controls.copay_value.value,
          file_auth: this.form.value.file_auth,
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
