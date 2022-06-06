import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FixedLocationCampusService } from '../../../../business-controller/fixed-location-campus.service';
import { UserBusinessService } from '../../../../business-controller/user-business.service';
import { FixedAddService } from '../../../../business-controller/fixed-add.service';

@Component({
  selector: 'ngx-form-fixed-inventary-accesories',
  templateUrl: './form-fixed-inventary-accesories.component.html',
  styleUrls: ['./form-fixed-inventary-accesories.component.scss']
})
export class FormFixedInventaryAccesoriesComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public fixed_location_campus_id: any[];
  public responsible_user_id: any[];
  public selectedOptions: any[] = [];

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private FixedLocationCampusS: FixedLocationCampusService,
    private RoleBusinessS: UserBusinessService,
    private FixedAddS: FixedAddService,
  ) {
  }

  async ngOnInit() {
    if (!this.data) {
      this.data = {
        fixed_location_campus_id: '',
        responsible_user_id: '',
        observation: '',
        amount_ship: '',
      };
    }
    this.form = this.formBuilder.group({
      fixed_location_campus_id: [this.data.fixed_location_campus_id, Validators.compose([Validators.required])],
      responsible_user_id: [this.data.responsible_user_id, Validators.compose([Validators.required])],
      observation: [this.data.observation, Validators.compose([Validators.required])],
      amount_ship: [this.data.amount_ship, Validators.compose([Validators.required])],

    });

    await this.FixedLocationCampusS.GetCollection({}).then(x => {
      this.fixed_location_campus_id = x;
    });

    await this.RoleBusinessS.GetCollection().then(x => {
      this.responsible_user_id = x;
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
        this.FixedAddS.Save({
          fixed_accessories_id: this.data.id,
          fixed_location_campus_id: this.form.controls.fixed_location_campus_id.value,
          responsible_user_id: this.form.controls.responsible_user_id.value,
          observation: this.form.controls.observation.value,
          amount_ship: this.form.controls.amount_ship.value,
          status: 'ADICION',
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