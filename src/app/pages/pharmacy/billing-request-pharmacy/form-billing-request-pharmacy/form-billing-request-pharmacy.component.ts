import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TypeBillingEvidenceService } from '../../../../business-controller/type-billing-evidence.service';
import { AuthService } from '../../../../services/auth.service';
import { BillingStockRequestService } from '../../../../business-controller/billing-stock-request.service';
import { BillingService } from '../../../../business-controller/billing.service';

@Component({
  selector: 'ngx-form-billing-request-pharmacy',
  templateUrl: './form-billing-request-pharmacy.component.html',
  styleUrls: ['./form-billing-request-pharmacy.component.scss']
})
export class FormBillingRequestPharmacyComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Input() parentData: any;
  @Input() parentData1: any;

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public type_billing_evidence: any[];
  public selectedOptions: any[] = [];
  public selectedOptions1: any[] = [];
  public user;

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private BillingRequestS: BillingService,
    private BillingStockRequestS: BillingStockRequestService,
    private toastService: NbToastrService,
    private typeEvidenS: TypeBillingEvidenceService,
    private authService: AuthService,
    private toastS: NbToastrService
  ) {
  }

  async ngOnInit() {
    this.user = this.authService.GetUser();
    this.parentData = {
      selectedOptions: [],
      entity: 'product_generic',
      customData: 'product_generic',
    };

    this.parentData1 = {
      selectedOptions1: [],
      entity: 'product_supplies',
      customData: 'product_supplies',
    };

    if (!this.data) {
      this.data = {
        type_billing_evidence_id: '',
      };
    }
    this.form = this.formBuilder.group({
      type_billing_evidence_id: [this.data.type_billing_evidence_id, Validators.compose([Validators.required])],
    });

    await this.typeEvidenS.GetCollection({ id: 2 }).then(x => {
      this.type_billing_evidence = x;
    });
  }
  close() {
    this.dialogRef.close();
  }

  receiveMessage($event) {
    this.selectedOptions = $event;
  }
  receiveMessage1($event) {
    this.selectedOptions1 = $event;
  }

  save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      var valid_values = true;
      if ((!this.selectedOptions || this.selectedOptions.length == 0) && (!this.selectedOptions1 || this.selectedOptions1.length == 0)) {
        valid_values = false;
        this.toastS.danger('Debe seleccionar al menos un elemento', 'Error');
      }
      if (valid_values) {
        this.loading = true;
        this.BillingRequestS.Save({
          company_id: null,
          pharmacy_stock_id: null,
          type_billing_evidence_id: this.form.controls.type_billing_evidence_id.value,
        }).then(x => {
          this.toastService.success('', x.message);
          this.close();
          var id = x.data.billing.id;
          var contador = 0;
          var err = 0;
          if (this.saved) {
            this.saved();
          }
          this.BillingStockRequestS.Save({
            billing_id: id,
            product_generic_id: this.selectedOptions || this.selectedOptions.length > 0 ? JSON.stringify(this.selectedOptions) : null,
            product_supplies_id: this.selectedOptions1 || this.selectedOptions1.length > 0 ? JSON.stringify(this.selectedOptions1) : null,
          }).then(x => {
          }).catch(x => {
            err++;
          });
          contador++;
          if (contador > 0) {
            this.toastS.success(null, 'Se actualizaron ' + contador + ' elementos');
          } else if (err > 0) {
            this.toastS.danger(null, 'No se actualizaron ' + contador + ' elementos');
          }
          this.selectedOptions = [];
          this.selectedOptions1 = [];
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

