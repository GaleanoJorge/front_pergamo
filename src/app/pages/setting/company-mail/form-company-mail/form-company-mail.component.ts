import { Component, OnInit, Input } from '@angular/core';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
// import {StatusBusinessService} from '../../../../business-controller/status-business.service';
import {CompanyMailService} from '../../../../business-controller/company-mail.service';
import {RegionService} from '../../../../business-controller/region.service';
import {DocumentService} from '../../../../business-controller/document.service';



@Component({
  selector: 'ngx-form-company-mail',
  templateUrl: './form-company-mail.component.html',
  styleUrls: ['./form-company-mail.component.scss']
})
export class FormCompanyMailComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;

  public form: FormGroup;
  // public status: Status[];
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public cma_city: any [];
  public cma_company: any [];
  public cma_document: any [];

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    // private statusBS: StatusBusinessService,
    private RegionS: RegionService,
    private DocumentS: DocumentService,
    private CompanyMailS: CompanyMailService,
    private toastService: NbToastrService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        cma_company: '',
        cma_mail: '',
        cma_city: '',
        cma_document: '',
      };
    }

    // this.statusBS.GetCollection().then(x => {
    //   this.status = x;
    // });
    
    
    this.form = this.formBuilder.group({      
      cma_company: [this.data.cma_company, Validators.compose([Validators.required])],
      cma_mail: [this.data.cma_mail, Validators.compose([Validators.required])],
      cma_city: [this.data.cma_city, Validators.compose([Validators.required])],
      cma_document: [this.data.cma_document, Validators.compose([Validators.required])],
    });

     this.RegionS.GetCollection().then(x => {
      this.cma_city=x;
    });
   /*  this.DocumentS.GetCollection().then(x => {
      this.cma_company=x;
    });*/
     this.DocumentS.GetCollection().then(x => {
      this.cma_document=x;
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
          cma_company: this.form.controls.cma_company.value,
          cma_mail: this.form.controls.cma_mail.value,
          cma_city: this.form.controls.cma_city.value,
          cma_document: this.form.controls.cma_document.value,
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
          cma_company: this.form.controls.cma_company.value,
          cma_mail: this.form.controls.cma_mail.value,
          cma_city: this.form.controls.cma_city.value,
          cma_document: this.form.controls.cma_document.value,
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
