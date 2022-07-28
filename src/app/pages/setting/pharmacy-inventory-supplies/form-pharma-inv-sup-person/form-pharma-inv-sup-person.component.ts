import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PharmacyProductRequestService } from '../../../../business-controller/pharmacy-product-request.service';
import { UserBusinessService } from '../../../../business-controller/user-business.service';
import { UserChangeService } from '../../../../business-controller/user-change.service';

@Component({
  selector: 'ngx-form-pharma-inv-sup-person',
  templateUrl: './form-pharma-inv-sup-person.component.html',
  styleUrls: ['./form-pharma-inv-sup-person.component.scss']
})
export class FormPharmaInvSupPersonComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Input() my_pharmacy_id: any = null;

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public selectedOptions: any[] = [];
  public user_request_id: any[];
  public all_changes: any[];
  public own_user: any = null;
  public user_req_id;


  constructor(
    protected dialogRef: NbDialogRef<any>,
    private pharProdReqS: PharmacyProductRequestService,
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private UserRoleBusinessS: UserBusinessService,
    public userChangeS: UserChangeService,
  ) {
  }

  async ngOnInit() {
    if (!this.data) {
      this.data = {
        amount_provition: '',
      };
    }
    this.form = this.formBuilder.group({
      user_request_id: [this.data.user_request_id, Validators.compose([Validators.required])],
      amount_provition: [this.data.amount_provition, Validators.compose([Validators.required])],
    });

    await this.UserRoleBusinessS.GetCollection().then(x => {
      this.user_request_id = x;
    });

  }
  close() {
    this.dialogRef.close();
  }

  saveCode(e): void {
    var localidentify = this.user_request_id.find(item => item.nombre_completo == e);

    if (localidentify) {
      this.user_req_id = localidentify.id;
    } else {
      this.user_req_id = null;
      this.form.controls.user_request_id.setErrors({'incorrect': true });
      this.toastService.warning('', 'Debe seleccionar un item de la lista');
    }
  }
  save() {

    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      if (this.data.id) {
        this.pharProdReqS.updateInventoryByLot({
          id: -1,
          pharmacy_lot_stock_id: this.data.id,
          amount_provition: this.form.controls.amount_provition.value,
          user_request_id: this.user_req_id,
          status: 'ENVIADO',
          product_supplies_id: this.data.billing_stock.product_supplies_com.product_supplies_id,
          request_pharmacy_stock_id: this.my_pharmacy_id,
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