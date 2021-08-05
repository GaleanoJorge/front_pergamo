import {Component, OnInit, Input} from '@angular/core';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {StatusBusinessService} from '../../../../business-controller/status-business.service';
import {Status} from '../../../../models/status';
import {District} from '../../../../models/district';
import {CircuitService} from '../../../../business-controller/circuit.service';
import {DistrictService} from '../../../../business-controller/district.service';

@Component({
  selector: 'ngx-form-circuit',
  templateUrl: './form-circuit.component.html',
  styleUrls: ['./form-circuit.component.scss'],
})
export class FormCircuitComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;

  public form: FormGroup;
  public status_id: number;
  public district_id: number;
  public status: Status[];
  public district: District[];
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public status_label = 'Activo';
  public temp = 1;

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private statusBS: StatusBusinessService,
    private circuitS: CircuitService,
    private districtS: DistrictService,
    private toastService: NbToastrService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        name: '',
        status_id: '',
        district_id: '',
      };
    }

    this.statusBS.GetCollection().then(x => {
      this.status = x;
    });


    this.form = this.formBuilder.group({
      name: [this.data.name, Validators.compose([Validators.required])],
      status_id: [this.data.status_id],
      district_id: [this.data.district_id, Validators.compose([Validators.required])],
    });

    const params: any = {};

    if (!this.data.id) params.status_id = 1;

    this.districtS.GetCollection(params).then(x => {
      this.district = x;
    });
  }

  close() {
    this.dialogRef.close();
  }

  ChangeLabel() {
    if (this.status_label === 'Activo') {
      this.status_label = 'Inactivo';
      this.temp = 2;
    } else {
      this.status_label = 'Activo';
      this.temp = 1;
    }

  }

  save() {

    this.isSubmitted = true;

    if (!this.form.invalid) {
      this.loading = true;

      if (this.data.id) {
        this.circuitS.Update({
          id: this.data.id,
          name: this.form.controls.name.value,
          district_id: this.form.controls.district_id.value,
          status_id: this.temp,
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

        this.circuitS.Save({
          name: this.form.controls.name.value,
          district_id: this.form.controls.district_id.value,
          status_id: this.temp,
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
