import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { FixedAddService } from '../../../../business-controller/fixed-add.service';
import { FixedLocationCampusService } from '../../../../business-controller/fixed-location-campus.service';
import { FixedNomProductService } from '../../../../business-controller/fixed-nom-product.service';
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
  public fixed_location_campus_id: any[];
  public responsible_user: any[];
  public fixed_nom_product_id: any[];
  public product_id;

  constructor(
    private formBuilder: FormBuilder,
    private FixedAddS: FixedAddService,
    private toastService: NbToastrService,
    private FixedLocationCampusS: FixedLocationCampusService,
    private UserRoleBusinessS: UserBusinessService,
    private FixedNomProductS: FixedNomProductService,


  ) {
  }

  async ngOnInit() {
    if (!this.data) {
      this.data = {
        fixed_location_campus_id: '',
        request_amount: '',
        responsible_user_id: '',
        fixed_nom_product_id: '',
      };
    }

    this.form = this.formBuilder.group({
      request_amount: [this.data.request_amount, Validators.compose([Validators.required])],
      fixed_nom_product_id: [this.data.fixed_nom_product_id],
      fixed_location_campus_id: [this.data.fixed_location_campus_id, Validators.compose([Validators.required])],
      responsible_user_id: [this.data.responsible_user_id, Validators.compose([Validators.required])],
    });

    await this.FixedLocationCampusS.GetCollection().then(x => {
      this.fixed_location_campus_id = x;
    });
    await this.UserRoleBusinessS.GetCollection().then(x => {
      this.responsible_user = x;
    });
    await this.FixedNomProductS.GetCollection().then(x => {
      this.fixed_nom_product_id = x;
    });
  }

  
  saveCode(e): void {
    var localidentify = this.fixed_nom_product_id.find(item => item.name == e);

    if (localidentify) {
      this.product_id = localidentify.id;
    } else {
      this.product_id = null;
      this.form.controls.fixed_nom_product_id.setErrors({ 'incorrect': true });
      this.toastService.warning('', 'Debe seleccionar un item de la lista');
    }
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
          fixed_location_campus_id: this.form.controls.fixed_location_campus_id.value,
          responsible_user_id: this.form.controls.responsible_user_id.value,
          status: 'SOLICITADO',
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
          request_amount: this.form.controls.request_amount.value,
          fixed_nom_product_id: this.form.controls.fixed_nom_product_id.value,
          fixed_location_campus_id: this.form.controls.fixed_location_campus_id.value,
          responsible_user_id: this.form.controls.responsible_user_id.value,
          status: 'SOLICITADO',
        }).then(x => {
          this.toastService.success('', x.message);
          this.messageEvent.emit(true);
          this.form.setValue({ fixed_nom_product_id: '', request_amount: '', fixed_location_campus_id: '', responsible_user_id: '' });
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


