import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { ChSwNursingService } from '../../../../../business-controller/ch-sw-nursing.service';



@Component({
  selector: 'ngx-form-sw-nursing',
  templateUrl: './form-sw-nursing.component.html',
  styleUrls: ['./form-sw-nursing.component.scss']
})
export class FormSwNursingComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Input() admission_id: any = null;
  @Input() savedUser: any = true;
  @Input() showTable: any = null;
  @Input() user_id: any = null;
  @Input() record_id: any = null;
  @Input() type_record: any = null;
  @Output() messageEvent = new EventEmitter<any>();

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public diagnosis: any[] = [];
  public disabled: boolean = false;
  checked = false;

  constructor(
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private nursingS: ChSwNursingService,

  ) {
  }

  toggle(checked: boolean) {
    this.checked = checked;
  }

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        firstname: '',
        middlefirstname: '',
        lastname: '',
        middlelastname: '',
        phone: '',
        service: false,
      };
    }

    this.form = this.formBuilder.group({

      firstname: [this.data[0] ? this.data[0].firstname : this.data.firstname,],
      middlefirstname: [this.data[0] ? this.data[0].middlefirstname : this.data.middlefirstname,],
      lastname: [this.data[0] ? this.data[0].lastname : this.data.lastname,],
      middlelastname: [this.data[0] ? this.data[0].middlelastname : this.data.middlelastname,],
      phone: [this.data[0] ? this.data[0].phone : this.data.phone,],
      service: [this.data[0] ? this.data[0].service : this.data.service,],
    });

    this.onChange();

  }

  save() {
    this.isSubmitted = true;

    if (!this.form.invalid) {
      this.loading = true;

      if (this.data.id) {
        this.nursingS.Update({
          id: this.data.id,
          firstname: this.form.controls.firstname.value,
          middlefirstname: this.form.controls.middlefirstname.value,
          lastname: this.form.controls.lastname.value,
          middlelastname: this.form.controls.middlelastname.value,
          phone: this.form.controls.phone.value,
          service: this.form.controls.service.value,
          type_record_id: 1,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          // this.close();
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      } else {
        this.nursingS.Save({
          firstname: this.form.controls.firstname.value,
          middlefirstname: this.form.controls.middlefirstname.value,
          lastname: this.form.controls.lastname.value,
          middlelastname: this.form.controls.middlelastname.value,
          phone: this.form.controls.phone.value,
          service: this.form.controls.service.value,
          type_record_id: 1,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.messageEvent.emit(true);
          this.form.patchValue({
            firstname: '', middlefirstname: '', lastname: '', middlelastname: '', phone: '',
            landline: '', service: false,
          });
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      }

    } else {
      this.toastService.warning('', "Debe diligenciar los campos obligatorios");
    }
  }

  async onChange() {

    this.form.get('service').valueChanges.subscribe(val => {
      if (val === false) {

        this.form.controls.firstname.clearValidators();
        this.form.controls.middlefirstname.clearValidators();
        this.form.controls.lastname.clearValidators();
        this.form.controls.middlelastname.clearValidators();
        this.form.controls.phone.clearValidators();
        this.form.controls.service.clearValidators();

        this.form.controls.firstname.setErrors(null);
        this.form.controls.middlefirstname.setErrors(null);
        this.form.controls.lastname.setErrors(null);
        this.form.controls.middlelastname.setErrors(null);
        this.form.controls.phone.setErrors(null);
        this.form.controls.service.setErrors(null);

      } else {

        this.form.controls.firstname.setValidators(Validators.compose([Validators.required]));
        this.form.controls.middlefirstname.setValidators(Validators.compose([Validators.required]));
        this.form.controls.lastname.setValidators(Validators.compose([Validators.required]));
        this.form.controls.middlelastname.setValidators(Validators.compose([Validators.required]));
        this.form.controls.phone.setValidators(Validators.compose([Validators.required]));
        this.form.controls.service.setValidators(Validators.compose([Validators.required]));

      };
    });
  }
}
