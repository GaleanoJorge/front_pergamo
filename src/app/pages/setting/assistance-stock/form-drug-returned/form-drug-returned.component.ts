import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChFormulationService } from '../../../../business-controller/ch-formulation.service';
import { ActivatedRoute } from '@angular/router';
import { SuppliesStatusService } from '../../../../business-controller/supplies-status.service';
import { AuthService } from '../../../../services/auth.service';
import { PharmacyProductRequestService } from '../../../../business-controller/pharmacy-product-request.service';

@Component({
  selector: 'ngx-form-drug-returned',
  templateUrl: './form-drug-returned.component.html',
  styleUrls: ['./form-drug-returned.component.scss'],
})
export class FormDrugReturnedComponent implements OnInit {
  @Input() title: string;
  @Input() data2: any = null;
  @Input() record_id: any = null;
  @Input() type_record_id: any = null;
  @Input() status: any = null;
  @Output() messageEvent = new EventEmitter<any>();

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  // public close: any = null;
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
    private route: ActivatedRoute,
    private pharmacyRequest: PharmacyProductRequestService,
    private suppliesStatus: SuppliesStatusService,
    private authS: AuthService,
  ) {
  }

  async ngOnInit() {
    if (!this.data) {
      this.data = {
        quantity: '',
        observation: '',
      };
    } else {
    }

    this.form = this.formBuilder.group({
      quantity: ['', Validators.compose([Validators.required])],
      observation: ['', Validators.compose([Validators.required])],
    });

    this.user_id = this.authS.GetUser().id;

  }

  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      if (this.data.id) {
        await this.pharmacyRequest.Update({
          id: this.data.id,
          observation: this.form.controls.observation.value,
          request_amount: this.form.controls.quantity.value,
          admissions_id: this.data.admissions_id,
          management_plan: this.data.management_plan,
          services_briefcase_id:this.data.services_briefcase_id,
          own_pharmacy_stock_id:this.data.own_pharmacy_stock_id,
          user_request_pad_id:this.user_id,
        }).then((x) => {
          this.toastService.success('', x.message);
          if (this.saved) {
            this.saved();
          }
          // this.close();
        }).catch(x => {
          this.toastService.danger('', x);
          this.isSubmitted = false;
          this.loading = false;
        });

      } else {
        await this.pharmacyRequest.Save({
          status: 'DEVUELTO',
          observation: this.form.controls.observation.value,
          request_amount: this.form.controls.quantity.value,
          admissions_id: this.data2.admissions_id,
          management_plan: this.data2.management_plan,
          services_briefcase_id:this.data2.services_briefcase_id,
          own_pharmacy_stock_id:this.data2.own_pharmacy_stock_id,
          user_request_pad_id:this.user_id,
          pharmacy_request:this.data2.id,

        })
          .then((x) => {
            this.toastService.success('', x.message);
            if (this.saved) {
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
