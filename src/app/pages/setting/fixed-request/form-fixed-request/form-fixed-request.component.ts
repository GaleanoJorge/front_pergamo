import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { FixedAccessoriesService } from '../../../../business-controller/fixed-accessories.service';
import { FixedAddService } from '../../../../business-controller/fixed-add.service';
import { FixedAssetsService } from '../../../../business-controller/fixed-assets.service';
import { FixedLocationCampusService } from '../../../../business-controller/fixed-location-campus.service';
import { FixedTypeService } from '../../../../business-controller/fixed-type.service';
import { UserBusinessService } from '../../../../business-controller/user-business.service';

@Component({
  selector: 'ngx-form-fixed-request',
  templateUrl: './form-fixed-request.component.html',
  styleUrls: ['./form-fixed-request.component.scss']
})
export class FormFixedRequestComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Output() messageEvent = new EventEmitter<any>();

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public disabled: boolean = false;
  public showTable;
  public fixed_type_id: any[];
  public fixed_assets_id: any[];
  public fixed_accessories_id: any[];
  public fixed_location_campus_id: any[];
  public responsible_user: any[];


  constructor(
    private formBuilder: FormBuilder,
    private FixedTypeS: FixedTypeService,
    private FixedAssetsS: FixedAssetsService,
    private FixedAddS: FixedAddService,
    private toastService: NbToastrService,
    private FixedAccessoriesS: FixedAccessoriesService,
    private FixedLocationCampusS: FixedLocationCampusService,
    private UserRoleBusinessS: UserBusinessService,

  ) {
  }

  async ngOnInit() {
    if (!this.data) {
      this.data = {
        fixed_type_id: '',
        fixed_accessories_id: '',
        fixed_assets_id: '',
        fixed_location_campus_id: '',
        request_amount: '',
        responsible_user_id: '',
      };
    }

    this.form = this.formBuilder.group({
      fixed_type_id: [this.data.fixed_type_id],
      fixed_accessories_id: [this.data.fixed_accessories_id],
      fixed_assets_id: [this.data.fixed_assets_id],
      fixed_location_campus_id: [this.data.fixed_location_campus_id, Validators.compose([Validators.required])],
      request_amount: [this.data.request_amount, Validators.compose([Validators.required])],
      responsible_user_id: [this.data.responsible_user_id, Validators.compose([Validators.required])],
    });

    await this.FixedTypeS.GetCollection().then(x => {
      this.fixed_type_id = x;
    });
    await this.FixedAssetsS.GetCollection().then(x => {
      this.fixed_assets_id = x;
    });
    await this.FixedAccessoriesS.GetCollection().then(x => {
      this.fixed_accessories_id = x;
    });
    await this.FixedLocationCampusS.GetCollection().then(x => {
      this.fixed_location_campus_id = x;
    });

    await this.UserRoleBusinessS.GetCollection().then(x => {
      this.responsible_user = x;
    });
  }

  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;

      if (this.data.id) {
        this.FixedAddS.Update({
          id: this.data.id,
          fixed_type_id: this.form.controls.fixed_type_id.value,
          fixed_assets_id: this.form.controls.fixed_assets_id.value,
          fixed_accessories_id: this.form.controls.fixed_accessories_id.value,
          request_amount: this.form.controls.request_amount.value,
          fixed_location_campus_id: this.form.controls.fixed_location_campus_id.value,
          status: 'SOLICITADO',
          responsible_user_id: this.form.controls.responsible_user_id.value,
        }).then(x => {
          this.toastService.success('', x.message);
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      } else {

        this.FixedAddS.Save({
          fixed_type_id: this.form.controls.fixed_type_id.value,
          fixed_assets_id: this.form.controls.fixed_assets_id.value,
          fixed_accessories_id: this.form.controls.fixed_accessories_id.value,
          request_amount: this.form.controls.request_amount.value,
          fixed_location_campus_id: this.form.controls.fixed_location_campus_id.value,
          status: 'SOLICITADO',
          responsible_user_id: this.form.controls.responsible_user_id.value,
          observation: ''
        }).then(x => {
          this.toastService.success('', x.message);
          this.messageEvent.emit(true);
          this.form.setValue({ fixed_type_id: '', fixed_assets_id: '', fixed_accessories_id: '', request_amount: '', fixed_location_campus_id: '', responsible_user_id: '' });
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
