import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocationCapacityService } from '../../../../../business-controller/location-capacity.service';
import { WorkLocationPackageComponent } from '../../../../components/form-users/work-location-package/work-location-package.component';
import { BaseLocationCapacityService } from '../../../../../business-controller/base-location-capacity.service';
import { AuthService } from '../../../../../services/auth.service';


@Component({
  selector: 'ngx-form-location-capacity',
  templateUrl: './form-location-capacity.component.html',
  styleUrls: ['./form-location-capacity.component.scss']
})
export class FormLocationCapacityComponent implements OnInit {
  @ViewChild(WorkLocationPackageComponent) table: WorkLocationPackageComponent;

  @Input() title: string;
  @Input() data: any = null;
  @Input() procedence: any = null;

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = true;
  public show: boolean = false;
  public parentData;
  public user;
  public phone_consult = false;
  public phone_consult_amount = null;
  public currentRole;
  public months = [
    { id: 1, name: "ENERO" },
    { id: 2, name: "FEBRERO" },
    { id: 3, name: "MARZO" },
    { id: 4, name: "ABRIL" },
    { id: 5, name: "MAYO" },
    { id: 6, name: "JUNIO" },
    { id: 7, name: "JULIO" },
    { id: 8, name: "AGOSTO" },
    { id: 9, name: "SEPTIEMBRE" },
    { id: 10, name: "OCTUBRE" },
    { id: 11, name: "NOVIEMBRE" },
    { id: 12, name: "DICIEMBRE" },
  ];
  public months2 = [];

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private LocationCapacityS: LocationCapacityService,
    private toastService: NbToastrService,
    private BaseLocationCapacityS: BaseLocationCapacityService,
    private authService: AuthService,
  ) {
  }

  async ngOnInit(): Promise<void> {
    this.user = this.authService.GetUser();
    var curr = this.authService.GetRole();
    this.currentRole = this.user.roles.find(x => {
      return x.id == curr;
    });
    this.parentData = {
      selectedOptions: [],
      entity: 'residence/locationbyMunicipality',
      customData: 'locality'
    };

    if (!this.data) {
      this.data = {
        name: '',
      };
    }

    this.months.forEach(x => {
      if (x.id == new Date().getMonth() + 1 || x.id == new Date().getMonth() + 2) {
        this.months2.push(x);
      }
    });

    this.form = this.formBuilder.group({
      month: ['', Validators.compose([Validators.required])],
    });

    // if (this.procedence == 1) {
    //   this.form.controls.month.setValidators([Validators.required]);
    //     this.form.controls.month.updateValueAndValidity();
    // }

    await this.BaseLocationCapacityS.GetCollection({ assistance_id: this.data.id }).then(x => {
      this.loading = false;
      this.show = true;
      this.parentData.selectedOptions = x;
    });
  }

  receiveMessage($event) {
    if ($event.phone_consult == 0) {
      this.phone_consult = true;
      if ($event.phone_consult_amount) {
        this.phone_consult_amount = $event.phone_consult_amount;
      } else {
        this.phone_consult_amount = 0;
      }
    } else if ($event.phone_consult == 1) {
      this.phone_consult = false;
      this.phone_consult_amount = null;
    } else {
      this.parentData.selectedOptions = $event;
    }
  }

  close() {
    this.dialogRef.close();
  }

  save() {

    this.isSubmitted = true;

    if (!this.form.invalid) {
      this.loading = true;
      var valid_values = true;
      if (!this.parentData.selectedOptions || this.parentData.selectedOptions.length == 0) {
        valid_values = false;
        this.loading = false;
        this.isSubmitted = false;
        this.toastService.danger('Debe seleccionar al menos una Comuna, Localidad o Vereda', 'Error');
      } else {
        this.parentData.selectedOptions.forEach(element => {
          if (element.PAD_base_patient_quantity == null || element.PAD_base_patient_quantity <= 0) {
            valid_values = false;
          }
        });
        if (!valid_values) {
          this.loading = false;
          this.isSubmitted = false;
          this.toastService.danger('Debe ingresar una cantidad valida', 'Error');
        }
      }
      if (valid_values) {
        this.LocationCapacityS.Save({
          assistance_id: this.data.id,
          localities_id: JSON.stringify(this.parentData.selectedOptions),
          phone_consult: this.phone_consult_amount,
          procedence: this.procedence,
          month: this.form.controls.month.value,
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

    } else {
      this.toastService.danger('Debe seleccionar un mes', 'Error');
    }
  }

}
