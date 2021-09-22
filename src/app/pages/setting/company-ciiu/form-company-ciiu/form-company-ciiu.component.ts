import { Component, OnInit, Input } from '@angular/core';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
// import {StatusBusinessService} from '../../../../business-controller/status-business.service';
import {CompanyCiiuService} from '../../../../business-controller/company-ciiu.service';
import {CompanyService} from '../../../../business-controller/company.service';
import {CiiuClassService} from '../../../../business-controller/ciiu-class.service';
import {FiscalClasificationService} from '../../../../business-controller/fiscal-clasification.service';


@Component({
  selector: 'ngx-form-company-ciiu',
  templateUrl: './form-company-ciiu.component.html',
  styleUrls: ['./form-company-ciiu.component.scss']
})
export class FormCompanyCiiuComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;

  public form: FormGroup;
  public region_id: number;
  // public status: Status[];
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public company: any [];
  public ciiu_class: any [];
  public fiscal_clasification: any[];

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    // private statusBS: StatusBusinessService,
    private CompanyCiiuS: CompanyCiiuService,
    private CompanyS: CompanyService,
    private CiiuClassS: CiiuClassService,
    private fiscalClasificationS: FiscalClasificationService,
    private toastService: NbToastrService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        company_id: '',
        ciiu_class_id: '',
        fiscal_clasification_id: '',
      };
    }

    // this.statusBS.GetCollection().then(x => {
    //   this.status = x;
    // });
    
    
    this.form = this.formBuilder.group({      
      company_id: [this.data.company_id, Validators.compose([Validators.required])],
      ciiu_class_id: [this.data.ciiu_class_id, Validators.compose([Validators.required])],
      fiscal_clasification_id: [this.data.fiscal_clasification_id, Validators.compose([Validators.required])],
    });

    this.CompanyS.GetCollection().then(x => {
      this.company=x;
    });
    this.CiiuClassS.GetCollection().then(x => {
      this.ciiu_class=x;
    });
    this.fiscalClasificationS.GetCollection().then(x => {
      this.fiscal_clasification=x;
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
        this.CompanyCiiuS.Update({
          id: this.data.id,
          company_id: this.form.controls.company_id.value,
          ciiu_class_id: this.form.controls.ciiu_class_id.value,
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
        
        this.CompanyCiiuS.Save({
          company_id: this.form.controls.company_id.value,
          ciiu_class_id: this.form.controls.ciiu_class_id.value,
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
