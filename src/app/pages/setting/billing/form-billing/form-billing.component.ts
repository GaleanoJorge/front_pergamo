import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BillingService } from '../../../../business-controller/billing.service';
import { TypeBillingEvidenceService } from '../../../../business-controller/type-billing-evidence.service';
import { PermissionPharmacyStockService } from '../../../../business-controller/permission-pharmacy-stock.service';
import { CompanyService } from '../../../../business-controller/company.service';
import { AuthService } from '../../../../services/auth.service';
import { BillingStockService } from '../../../../business-controller/billing-stock.service';
import { PharmacyStockService } from '../../../../business-controller/pharmacy-stock.service';

@Component({
  selector: 'ngx-form-billing',
  templateUrl: './form-billing.component.html',
  styleUrls: ['./form-billing.component.scss']
})
export class FormBillingComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Input() parentData: any;
  @Input() parentData1: any;

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public type_billing_evidence: any[];
  public pharmacy_stock: any[];
  public company: any[];
  public selectedOptions: any[] = [];
  public selectedOptions1: any[] = [];
  public user;
  public show_table;

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private BillingS: BillingService,
    private billStockS: BillingStockService,
    private toastService: NbToastrService,
    private typeEvidenS: TypeBillingEvidenceService,
    private CompanyS: CompanyService,
    private authService: AuthService,
    private toastS: NbToastrService,
    private pharStockS: PharmacyStockService
  ) {
  }

  async ngOnInit() {
    this.user = this.authService.GetUser();
    this.parentData = {
      selectedOptions: [],
      entity: 'product',
      customData: 'product',
    };

    this.parentData1 = {
      selectedOptions1: [],
      entity: 'product_supplies_com',
      customData: 'product_supplies_com',
    };

    if (!this.data) {
      this.data = {
        company_id: '',
        type_billing_evidence_id: '',
        pharmacy_stock_id: '',
      };
    }
    this.form = this.formBuilder.group({
      company_id: [this.data.company_id, Validators.compose([Validators.required])],
      pharmacy_stock_id: [this.data.pharmacy_stock_id, Validators.compose([Validators.required])],
      type_billing_evidence_id: [this.data.type_billing_evidence_id, Validators.compose([Validators.required])],
    });

    await this.typeEvidenS.GetCollection({ id: 1 }).then(x => {
      this.type_billing_evidence = x;
    });

    this.CompanyS.GetCollection({ company_category_id: 2 }).then(x => {
      this.company = x;
    });

    this.pharStockS.GetCollection().then(x => {
      this.pharmacy_stock = x;
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
      this.loading = true;
      this.BillingS.Save({
        company_id: this.form.controls.company_id.value,
        pharmacy_stock_id: this.form.controls.pharmacy_stock_id.value,
        type_billing_evidence_id: this.form.controls.type_billing_evidence_id.value,
      }).then(x => {
        this.toastService.success('', x.message);
        this.close();
        var id = x.data.billing.id;
        var contador = 0;
        var err = 0;
        this.billStockS.Save({
          billing_id: id,
          product_id: this.selectedOptions || this.selectedOptions.length > 0 ? JSON.stringify(this.selectedOptions) : null,
          product_supplies_com_id: this.selectedOptions1 || this.selectedOptions1.length > 0 ? JSON.stringify(this.selectedOptions1) : null,
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

