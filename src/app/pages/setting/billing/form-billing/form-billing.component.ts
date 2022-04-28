import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BillingService } from '../../../../business-controller/billing.service';
import { TypeBillingEvidenceService } from '../../../../business-controller/type-billing-evidence.service';
import { PermissionPharmacyStockService } from '../../../../business-controller/permission-pharmacy-stock.service';
import { CompanyService } from '../../../../business-controller/company.service';
import { AuthService } from '../../../../services/auth.service';
import { BillingStockService } from '../../../../business-controller/billing-stock.service';

@Component({
  selector: 'ngx-form-billing',
  templateUrl: './form-billing.component.html',
  styleUrls: ['./form-billing.component.scss']
})
export class FormBillingComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Input() parentData: any;

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public type_billing_evidence: any[];
  public company: any[];
  public selectedOptions: any[] = [];
  public user;
  public show_table;

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private BillingS: BillingService,
    private toastService: NbToastrService,
    private typeEvidenS: TypeBillingEvidenceService,
    private CompanyS: CompanyService,
    private authService: AuthService,
    private billS: BillingStockService,
    private toastS: NbToastrService,
  ) {
  }

  async ngOnInit() {
    this.user = this.authService.GetUser();
    this.parentData = {
      selectedOptions: [],
      entity: 'product',
      customData: 'product',
    };

    if (!this.data) {
      this.data = {
        num_evidence: '',
        sub_total: '',
        vat: '',
        company_id: '',
        setting_value: '',
        invoice_value: '',
        type_billing_evidence_id: '',
      };
    }
    this.form = this.formBuilder.group({
      company_id: [this.data.company_id, Validators.compose([Validators.required])],
      num_evidence: [this.data.num_evidence, Validators.compose([Validators.required])],
      sub_total: [this.data.sub_total, Validators.compose([Validators.required])],
      vat: [this.data.vat, Validators.compose([Validators.required])],
      setting_value: [this.data.setting_value, Validators.compose([Validators.required])],
      invoice_value: [this.data.invoice_value, Validators.compose([Validators.required])],
      type_billing_evidence_id: [this.data.type_billing_evidence_id, Validators.compose([Validators.required])],
    });

    await this.typeEvidenS.GetCollection().then(x => {
      this.type_billing_evidence = x;
    });

    this.CompanyS.GetCollection({ company_category_id: 2 }).then(x => {
      this.company = x;
    });
    
  }
  close() {
    this.dialogRef.close();
  }

  receiveMessage($event) {
    this.selectedOptions = $event;

  }

  save() {
    this.isSubmitted = true;

    if (!this.form.invalid) {
      var valid_values = true;
      if (!this.selectedOptions || this.selectedOptions.length == 0) {
        valid_values = false;
        this.toastS.danger('Debe seleccionar al menos un medicamento', 'Error');
      } else {
        this.selectedOptions.forEach(element => {
          if (element.amount == null || element.amount <= 0) {
            valid_values = false;
          }
        });
        if (!valid_values) {
          this.toastS.danger('Debe ingresar una cantidad valida', 'Error');
        }
      }
      if (valid_values) {
        this.loading = true;
 
      if (this.data.id) {
        this.BillingS.Update({
          id: this.data.id,
          company_id: this.form.controls.company_id.value,
          num_evidence: this.form.controls.num_evidence.value,
          sub_total: this.form.controls.sub_total.value,
          vat: this.form.controls.vat.value,
          setting_value: this.form.controls.setting_value.value,
          invoice_value: this.form.controls.invoice_value.value,
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
            this.billS.Update({
              billing_id: id,
              product_id: JSON.stringify(this.selectedOptions),
              amount: 10,
            }, id).then(x => {
            }).catch(x => {
              err++;
            });
            contador++;

            if (contador > 0) {
              this.toastS.success(null, 'Se actualizaron ' + contador + ' elemetos');
            } else if (err > 0) {
              this.toastS.danger(null, 'No se actualizaron ' + contador + ' elemetos');
            }
            this.selectedOptions = [];
            if (this.saved) {
              this.saved();
            }
          }).catch(x => {
            this.isSubmitted = false;
            this.loading = false;
          });
      } else {
        this.BillingS.Save({
          company_id: this.form.controls.company_id.value,
          num_evidence: this.form.controls.num_evidence.value,
          sub_total: this.form.controls.sub_total.value,
          vat: this.form.controls.vat.value,
          setting_value: this.form.controls.setting_value.value,
          invoice_value: this.form.controls.invoice_value.value,
          type_billing_evidence_id: this.form.controls.type_billing_evidence_id.value,
        }).then(x => {
          this.toastService.success('', x.message);
          this.close();
          var id = x.data.billing.id;
            var contador = 0;
            var err = 0;
            this.billS.Save({
              billing_id: id,
              product_id: JSON.stringify(this.selectedOptions),
              amount: 10,
            }).then(x => {
            }).catch(x => {
              err++;
            });
            contador++;
            if (contador > 0) {
              this.toastS.success(null, 'Se actualizaron ' + contador + ' elemetos');
            } else if (err > 0) {
              this.toastS.danger(null, 'No se actualizaron ' + contador + ' elemetos');
            }
            this.selectedOptions = [];
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
