import { Component, OnInit, Input } from '@angular/core';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
// import {StatusBusinessService} from '../../../../business-controller/status-business.service';
import {CompanyFiscalService} from '../../../../business-controller/company-fiscal.service';
import {CompanyService} from '../../../../business-controller/company.service';
import {FiscalCharacteristicService} from '../../../../business-controller/fiscal-characteristic.service';
import {FiscalClasificationService} from '../../../../business-controller/fiscal-clasification.service';


@Component({
  selector: 'ngx-form-company-fiscal',
  templateUrl: './form-company-fiscal.component.html',
  styleUrls: ['./form-company-fiscal.component.scss']
})
export class FormCompanyFiscalComponent implements OnInit {

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
  public fiscal_characteristic: any[];

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    // private statusBS: StatusBusinessService,
    private CompanyFiscalS: CompanyFiscalService,
    private CompanyS: CompanyService,
    private FiscalClasificationS: FiscalClasificationService,
    private fiscalCharacteristicS: FiscalCharacteristicService,
    private toastService: NbToastrService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        company_id: '',
        fiscal_characteristic_id: '',
        fiscal_clasification_id: '',
      };
    }

    // this.statusBS.GetCollection().then(x => {
    //   this.status = x;
    // });
    
    
    this.form = this.formBuilder.group({      
      company_id: [this.data.company_id, Validators.compose([Validators.required])],
      fiscal_characteristic_id: [this.data.fiscal_characteristic_id, Validators.compose([Validators.required])],
      fiscal_clasification_id: [this.data.fiscal_clasification_id, Validators.compose([Validators.required])],
    });

    this.CompanyS.GetCollection().then(x => {
      this.company=x;
    });
    this.FiscalClasificationS.GetCollection().then(x => {
      this.fiscal_clasification=x;
    });
    this.fiscalCharacteristicS.GetCollection().then(x => {
      this.fiscal_characteristic=x;
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
        this.CompanyFiscalS.Update({
          id: this.data.id,
          company_id: this.form.controls.company_id.value,
          fiscal_characteristic_id: this.form.controls.fiscal_characteristic_id.value,
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
        
        this.CompanyFiscalS.Save({
          company_id: this.form.controls.company_id.value,
          fiscal_characteristic_id: this.form.controls.fiscal_characteristic_id.value,
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
