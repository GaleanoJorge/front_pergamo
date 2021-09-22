import { Component, OnInit, Input } from '@angular/core';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
// import {StatusBusinessService} from '../../../../business-controller/status-business.service';
import {CompanyTaxesService} from '../../../../business-controller/company-taxes.service';
import {CompanyService} from '../../../../business-controller/company.service';
import {TaxesService} from '../../../../business-controller/taxes.service';
import {FiscalClasificationService} from '../../../../business-controller/fiscal-clasification.service';


@Component({
  selector: 'ngx-form-company-taxes',
  templateUrl: './form-company-taxes.component.html',
  styleUrls: ['./form-company-taxes.component.scss']
})
export class FormCompanyTaxesComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;

  public form: FormGroup;
  public region_id: number;
  // public status: Status[];
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public company: any [];
  public fiscal_clasification: any [];
  public taxes: any[];

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    // private statusBS: StatusBusinessService,
    private CompanyTaxesS: CompanyTaxesService,
    private CompanyS: CompanyService,
    private FiscalClasificationS: FiscalClasificationService,
    private taxesS: TaxesService,
    private toastService: NbToastrService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        company_id: '',
        taxes_id: '',
        fiscal_clasification_id: '',
      };
    }

    // this.statusBS.GetCollection().then(x => {
    //   this.status = x;
    // });
    
    
    this.form = this.formBuilder.group({      
      company_id: [this.data.company_id, Validators.compose([Validators.required])],
      taxes_id: [this.data.taxes_id, Validators.compose([Validators.required])],
      fiscal_clasification_id: [this.data.fiscal_clasification_id, Validators.compose([Validators.required])],
    });

    this.CompanyS.GetCollection().then(x => {
      this.company=x;
    });
    this.FiscalClasificationS.GetCollection().then(x => {
      this.fiscal_clasification=x;
    });
    this.taxesS.GetCollection().then(x => {
      this.taxes=x;
    });
  }
  

  close() {
    this.dialogRef.close();
  }

  save() {

    this.isSubmitted = true;

    if (!this.form.invalid) {
      this.loading = true;

      if (this.data.id) {
        this.CompanyTaxesS.Update({
          id: this.data.id,
          company_id: this.form.controls.company_id.value,
          taxes_id: this.form.controls.taxes_id.value,
          fiscal_clasification_id: this.form.controls.fiscal_clasification_id.value,
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
      } else {
        
        this.CompanyTaxesS.Save({
          company_id: this.form.controls.company_id.value,
          taxes_id: this.form.controls.taxes_id.value,
          fiscal_clasification_id: this.form.controls.fiscal_clasification_id.value,
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
