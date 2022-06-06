import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { FixedAccessoriesService } from '../../../../business-controller/fixed-accessories.service';
import { FixedAssetsService } from '../../../../business-controller/fixed-assets.service';
import { FixedLocationCampusService } from '../../../../business-controller/fixed-location-campus.service';
import { FixedRequestService } from '../../../../business-controller/fixed-request.service';
import { FixedTypeService } from '../../../../business-controller/fixed-type.service';

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

  constructor(
    private formBuilder: FormBuilder,
    private FixedTypeS: FixedTypeService,
    private FixedAssetsS: FixedAssetsService,
    private FixedRequestS: FixedRequestService,
    private toastService: NbToastrService,
    private FixedAccessoriesS: FixedAccessoriesService,
    private FixedLocationCampusS: FixedLocationCampusService,
  ) {
  }

  async ngOnInit() {
    if (!this.data) {
      this.data = {
        request_amount: '',
      };
    }

    this.form = this.formBuilder.group({
      fixed_type_id: [this.data.fixed_type_id],
      fixed_accessories_id: [this.data.fixed_accessories_id],
      fixed_assets_id: [this.data.fixed_assets_id],
      fixed_location_campus_id: [this.data.fixed_location_campus_id],
      request_amount: [this.data.request_amount],
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
  }

  async save(inventario_id) {
    if (inventario_id == 1) {
      this.form.controls.fixed_type_id.setValidators(Validators.compose([Validators.required]));
      this.form.controls.fixed_assets_id.setValidators(Validators.compose([Validators.required]));
      this.form.controls.fixed_location_campus_id.setValidators(Validators.compose([Validators.required]));
      this.form.controls.request_amount.setValidators(Validators.compose([Validators.required]));
      this.isSubmitted = true;
      if (!this.form.invalid) {
        this.loading = true;
        this.showTable = false;

        if (this.data.id) {
          this.FixedRequestS.Update({
            id: this.data.id,
            fixed_type_id: this.form.controls.fixed_type_id.value,
            fixed_assets_id: this.form.controls.fixed_assets_id.value,
            request_amount: this.form.controls.request_amount.value,
            fixed_location_campus_id: this.form.controls.fixed_location_campus_id.value,
            status: 'REQUERIDO',
            request_user_id: 1,
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

          this.FixedRequestS.Save({
            fixed_type_id: this.form.controls.fixed_type_id.value,
            fixed_assets_id: this.form.controls.fixed_assets_id.value,
            request_amount: this.form.controls.request_amount.value,
            fixed_location_campus_id: this.form.controls.fixed_location_campus_id.value,
            status: 'REQUERIDO',
            request_user_id: 1,
          }).then(x => {
            this.toastService.success('', x.message);
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


    if (inventario_id == 2) {
      this.form.controls.fixed_type_id.setValidators(Validators.compose([Validators.required]));
      this.form.controls.fixed_accessories_id.setValidators(Validators.compose([Validators.required]));
      this.form.controls.request_amount.setValidators(Validators.compose([Validators.required]));
      this.form.controls.fixed_location_campus_id.setValidators(Validators.compose([Validators.required]));
      this.isSubmitted = true;
      if (!this.form.invalid) {
        this.loading = true;
        this.showTable = false;

        if (this.data.id) {
          this.FixedRequestS.Update({
            id: this.data.id,
            fixed_type_id: this.form.controls.fixed_type_id.value,
            fixed_accessories_id: this.form.controls.fixed_accessories_id.value,
            request_amount: this.form.controls.request_amount.value,
            fixed_location_campus_id: this.form.controls.fixed_location_campus_id.value,
            status: 'REQUERIDO',
            request_user_id: 1,
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

          this.FixedRequestS.Save({
            fixed_type_id: this.form.controls.fixed_type_id.value,
            fixed_accessories_id: this.form.controls.fixed_accessories_id.value,
            request_amount: this.form.controls.request_amount.value,
            fixed_location_campus_id: this.form.controls.fixed_location_campus_id.value,
            status: 'REQUERIDO',
            request_user_id: 1,
          }).then(x => {
            this.toastService.success('', x.message);
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
}
