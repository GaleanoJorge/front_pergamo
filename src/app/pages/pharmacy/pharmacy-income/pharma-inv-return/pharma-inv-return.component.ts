import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PharmacyProductRequestService } from '../../../../business-controller/pharmacy-product-request.service';
import { UserBusinessService } from '../../../../business-controller/user-business.service';
import { UserChangeService } from '../../../../business-controller/user-change.service';
import { AuthService } from '../../../../services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-pharma-inv-return',
  templateUrl: './pharma-inv-return.component.html',
  styleUrls: ['./pharma-inv-return.component.scss']
})
export class PharmaInvReturnComponent implements OnInit {

  @Input() title: string;
  @Input() my_pharmacy_id: any = null;
  @Input() data2: any = null;
  @Input() status: any = null;

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public disabled: boolean = false;
  public label: string = '';

  public supplies_status: any[];
  public diagnosis_class: any[];
  public status_id;
  public user_id;
  public data;



  constructor(
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    protected dialogRef: NbDialogRef<any>,
    private PharmacyProductRequestS: PharmacyProductRequestService,
    private authS: AuthService,
  ) {
  }

  async ngOnInit() {
    if (!this.data) {
      this.data = {
        // quantity: '',
        observation: '',
      };
    } else {
    }

    this.form = this.formBuilder.group({
      observation: ['', Validators.compose([Validators.required])],
    });

    this.user_id = this.authS.GetUser().id;

  }

  save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      if (this.data2.id) {
        this.PharmacyProductRequestS.updateInventoryByLot({
          id: this.data2.id,
          amount: this.data2.request_amount,
          request_pharmacy_stock_id: this.data2.own_pharmacy_stock_id,
          own_pharmacy_stock_id: this.my_pharmacy_id,
          // own_pharmacy_stock_id: this.data2.own_pharmacy_stock_id,
          // request_pharmacy_stock_id: this.my_pharmacy_id,
          observation: this.form.controls.observation.value,
          status: 'ENVIADO',
        }).then((x) => {
          this.toastService.success('', x.message);
          this.close();
          if (this.saved) {
            this.saved();
            this.close();
          }
          // this.close();
        }).catch(x => {
          this.toastService.danger('', x);
          this.isSubmitted = false;
          this.loading = false;
        });

      } else {
        this.PharmacyProductRequestS.Save({
          amount: this.data2.request_amount,
          request_pharmacy_stock_id: this.data2.own_pharmacy_stock_id,
          own_pharmacy_stock_id: this.my_pharmacy_id,
          observation: this.form.controls.observation.value,
          status: 'ENVIADO',
        })
          .then((x) => {
            this.toastService.success('', x.message);
            if (this.saved) {
              this.close();
              this.saved();
            }
          })
          .catch((x) => {
            this.toastService.success('', x.message);
            this.isSubmitted = false;
            this.loading = false;
          });
      }
    }
  }

  close() {
    this.dialogRef.close();
  }
}