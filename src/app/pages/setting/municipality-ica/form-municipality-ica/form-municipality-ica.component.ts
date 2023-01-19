import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import {StatusBusinessService} from '../../../../business-controller/status-business.service';
import { MunicipalityIcaService } from '../../../../business-controller/municipality-ica.service';
import { StatusBusinessService } from '../../../../business-controller/status-business.service';
import { MunicipalityService } from '../../../../business-controller/municipality.service';


@Component({
  selector: 'ngx-form-municipality-ica',
  templateUrl: './form-municipality-ica.component.html',
  styleUrls: ['./form-municipality-ica.component.scss']
})
export class FormMunicipalityIcaComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public municipality: any[];
  public municipality_id;

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private MunicipalityIcaS: MunicipalityIcaService,
    private toastService: NbToastrService,
    private MunicipalityS: MunicipalityService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        municipality: {
          name: '',
        },
        value: '',
      };
    } else {
      this.municipality_id = this.data.municipality.id;
    }

    this.MunicipalityS.GetCollection().then(x => {
      this.municipality = x;
    });

    this.form = this.formBuilder.group({
      municipality_id: [this.data.municipality.name, Validators.compose([Validators.required])],
      value: [this.data.value, Validators.compose([Validators.required])],
    });
  }

  saveCode(e): void {
    var localidentify = this.municipality.find(item => item.name == e);

    if (localidentify) {
      this.municipality_id = localidentify.id;
    } else {
      this.municipality_id = null;
      this.toastService.warning('Debe seleccionar un item de la lista', 'Aviso');
      this.form.controls.municipality_id.setErrors({'incorrect': true});
    }
  }


  close() {
    this.dialogRef.close();
  }

  save() {

    this.isSubmitted = true;

    if (!this.form.invalid) {
      this.loading = true;

      if (this.data.id) {
        this.MunicipalityIcaS.Update({
          id: this.data.id,
          municipality_id: this.municipality_id,
          value: this.form.controls.value.value,
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

        this.MunicipalityIcaS.Save({
          municipality_id: this.municipality_id,
          value: this.form.controls.value.value,
        }).then(x => {
          this.toastService.success('', x.message);
          this.close();
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
          this.toastService.danger(x, 'Error');
        });
      }

    } else {
      this.toastService.danger('Por favor verifique que todos los campos estén diligenciados', 'AVISO');
    }
  }

}
