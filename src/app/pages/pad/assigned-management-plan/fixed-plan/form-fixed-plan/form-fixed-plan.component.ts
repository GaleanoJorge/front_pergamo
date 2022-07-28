import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { FixedAccessoriesService } from '../../../../../business-controller/fixed-accessories.service';
import { FixedAddService } from '../../../../../business-controller/fixed-add.service';
import { FixedNomProductService } from '../../../../../business-controller/fixed-nom-product.service';
import { FixedTypeService } from '../../../../../business-controller/fixed-type.service';
import { PatientService } from '../../../../../business-controller/patient.service';
import { UserBusinessService } from '../../../../../business-controller/user-business.service';

@Component({
  selector: 'ngx-form-fixed-plan',
  templateUrl: './form-fixed-plan.component.html',
  styleUrls: ['./form-fixed-plan.component.scss']
})
export class FormFixedPlanComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Output() messageEvent = new EventEmitter<any>();
  @Input() admissions: any = null;

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public disabled: boolean = false;
  public showTable;
  public fixed_type_id: any[];
  public fixed_accessories_id: any[];
  public responsible_user: any[];
  public fixed_nom_product_id: any[];
  public user = null;

  constructor(
    private formBuilder: FormBuilder,
    private FixedTypeS: FixedTypeService,
    private FixedAddS: FixedAddService,
    private toastService: NbToastrService,
    private FixedAccessoriesS: FixedAccessoriesService,
    private UserRoleBusinessS: UserBusinessService,
    private FixedNomProductS: FixedNomProductService,
    private patienBS: PatientService,
  ) {
  }

  async ngOnInit() {
    if (!this.data) {
      this.data = {
        fixed_type_id: '',
        fixed_accessories_id: '',
        request_amount: '',
        responsible_user_id: '',
        fixed_nom_product_id: '',
      };
    }

    this.form = this.formBuilder.group({
      fixed_type_id: [this.data.fixed_type_id],
      fixed_nom_product_id: [this.data.fixed_nom_product_id],
      fixed_accessories_id: [this.data.fixed_accessories_id],
      request_amount: [this.data.request_amount, Validators.compose([Validators.required])],
      responsible_user_id: [this.data.responsible_user_id, Validators.compose([Validators.required])],
    });
    await this.patienBS.GetUserById(this.user).then(x => {
      this.user = x;
    });
    await this.FixedTypeS.GetCollection().then(x => {
      this.fixed_type_id = x;
    });
    await this.FixedAccessoriesS.GetCollection().then(x => {
      this.fixed_accessories_id = x;
    });
    await this.UserRoleBusinessS.GetCollection().then(x => {
      this.responsible_user = x;
    });
    await this.FixedNomProductS.GetCollection().then(x => {
      this.fixed_nom_product_id = x;
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
          request_amount: this.form.controls.request_amount.value,
          fixed_nom_product_id: this.form.controls.fixed_nom_product_id.value,
          fixed_accessories_id: this.form.controls.fixed_accessories_id.value,
          responsible_user_id: this.form.controls.responsible_user_id.value,
          fixed_type_id: this.form.controls.fixed_type_id.value,
          status: 'PATIENT',
          admissions_id:this.admissions,
        }).then(x => {
          this.toastService.success('', x.message);
          this.messageEvent.emit(true);
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
          fixed_nom_product_id: this.form.controls.fixed_nom_product_id.value,
          fixed_accessories_id: this.form.controls.fixed_accessories_id.value,
          request_amount: this.form.controls.request_amount.value,
          responsible_user_id: this.form.controls.responsible_user_id.value,
          status: 'PATIENT',
          admissions_id:this.admissions,
        }).then(x => {
          this.toastService.success('', x.message);
          this.messageEvent.emit(true);
          this.form.setValue({ fixed_type_id: '', fixed_nom_product_id: '', fixed_accessories_id: '', request_amount: '', responsible_user_id: '' });
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


