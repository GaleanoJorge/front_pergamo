import { Component, OnInit, Input } from '@angular/core';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
// import {StatusBusinessService} from '../../../../business-controller/status-business.service';
import {CompanyMailService} from '../../../../business-controller/company-mail.service';
import {RegionService} from '../../../../business-controller/region.service';
import {DocumentService} from '../../../../business-controller/document.service';
import {CompanyService} from '../../../../business-controller/company.service';



@Component({
  selector: 'ngx-form-company-mail',
  templateUrl: './form-company-mail.component.html',
  styleUrls: ['./form-company-mail.component.scss']
})
export class FormCompanyMailComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Input() company_id: any;

  public form: FormGroup;
  // public status: Status[];
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public city: any [];
  public company: any [];
  public document: any [];

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    // private statusBS: StatusBusinessService,
    private RegionS: RegionService,
    private DocumentS: DocumentService,
    private CompanyMailS: CompanyMailService,
    private CompanyS: CompanyService,
    private toastService: NbToastrService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        company_id: '',
        mail: '',
        city_id: '',
        document_id: '',
      };
    }

    // this.statusBS.GetCollection().then(x => {
    //   this.status = x;
    // });
    
    
    this.form = this.formBuilder.group({      
      company_id: [this.company_id, Validators.compose([Validators.required])],
      mail: [this.data.mail, Validators.compose([Validators.required])],
      city_id: [this.data.city_id, Validators.compose([Validators.required])],
      document_id: [this.data.document_id, Validators.compose([Validators.required])],
    });

    this.RegionS.GetCollection().then(x => {
      this.city=x;
    });
    
    this.DocumentS.GetCollection().then(x => {
      this.document=x;
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
        this.CompanyMailS.Update({
          id: this.data.id,
          company_id: Number(this.company_id),
          mail: this.form.controls.mail.value,
          city_id: this.form.controls.city_id.value,
          document_id: this.form.controls.document_id.value,
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
        
        this.CompanyMailS.Save({
          company_id: this.form.controls.company_id.value,
          mail: this.form.controls.mail.value,
          city_id: this.form.controls.city_id.value,
          document_id: this.form.controls.document_id.value,
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
