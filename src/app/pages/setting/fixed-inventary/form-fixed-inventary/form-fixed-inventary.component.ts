import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FixedLocationCampusService } from '../../../../business-controller/fixed-location-campus.service';
import { FixedAddService } from '../../../../business-controller/fixed-add.service';
import { UserBusinessService } from '../../../../business-controller/user-business.service';

@Component({
  selector: 'ngx-form-fixed-inventary',
  templateUrl: './form-fixed-inventary.component.html',
  styleUrls: ['./form-fixed-inventary.component.scss']
})
export class FormFixedInventaryComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Input() my_pharmacy_id: any = null;

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
    private UserRoleBusinessS: UserBusinessService,
    private FixedAddS: FixedAddService,
  ) {
  }

  async ngOnInit() {
    if (!this.data) {
      this.data = {
        observation: '',
      };
    }
    this.form = this.formBuilder.group({
      fixed_location_campus_id: [this.data.fixed_location_campus_id, Validators.compose([Validators.required])],
      responsible_user_id: [this.data.responsible_user_id, Validators.compose([Validators.required])],
      observation: [this.data.observation, Validators.compose([Validators.required])],
    });

    await this.FixedLocationCampusS.GetCollection({}).then(x => {
      this.fixed_location_campus_id = x;
    });

    await this.UserRoleBusinessS.GetCollection().then(x => {
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
        this.FixedAddS.updateInventoryByLot({
          id: -1,
          fixed_assets_id: this.data.id,
          fixed_location_campus_id: this.form.controls.fixed_location_campus_id.value,
          responsible_user_id: this.form.controls.responsible_user_id.value,
          observation: this.form.controls.observation.value,
          status: 'ENVIADO',
          amount_provition: 1,
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