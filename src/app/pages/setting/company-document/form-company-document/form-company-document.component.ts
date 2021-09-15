import { Component, OnInit, Input } from '@angular/core';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
// import {StatusBusinessService} from '../../../../business-controller/status-business.service';
import {CompanyDocumentService} from '../../../../business-controller/company-document.service';
import { environment } from '../../../../../environments/environment.prod';
import {DocumentService} from '../../../../business-controller/document.service';


@Component({
  selector: 'ngx-form-company-document',
  templateUrl: './form-company-document.component.html',
  styleUrls: ['./form-company-document.component.scss']
})
export class FormCompanyDocumentComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;

  public form: FormGroup;
  // public status: Status[];
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public cma_mail: any [];
  public cma_company: any [];
  public cdc_document: any [];
  public previewFile = null;

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    // private statusBS: StatusBusinessService,
    private CompanyDocumentS: CompanyDocumentService,
    private DocumentS: DocumentService,
    private toastService: NbToastrService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        cdc_company: '',
        cdc_document: '',
        cdc_file: '',
      };
    }else{
      this.previewFile = environment.storage + this.data.approval_file;
    }

    // this.statusBS.GetCollection().then(x => {
    //   this.status = x;
    // });
    
    
    this.form = this.formBuilder.group({      
      cdc_company: [this.data.cdc_company, Validators.compose([Validators.required])],
      cdc_document: [this.data.cdc_document, Validators.compose([Validators.required])],
      cdc_file: [this.data.cdc_file, Validators.compose([Validators.required])],
    });

    this.DocumentS.GetCollection().then(x => {
      this.cdc_document=x;
    });
  }
  

  close() {
    this.dialogRef.close();
  }

  async save() {
    this.isSubmitted = true;

    if (this.form.invalid) return false;

    this.loading = true;

    var formData = new FormData();
    var data = this.form.controls;
    formData.append('cdc_file', this.form.value.cdc_file);
    formData.append('cdc_company', data.cdc_company.value);
    formData.append('cdc_document', data.cdc_document.value);


    try {
      let response;
      if (this.data?.id) {
        response = await this.CompanyDocumentS.Update(formData, this.data.id);
      } else {
        response = await this.CompanyDocumentS.Save(formData);
      }
      this.toastService.success('', response.message);
      this.close();
      if (this.saved) {
        this.saved();
      }
    } catch (e) {
      this.isSubmitted = false;
      this.loading = false;
      throw new Error(e);
    }
  }

  async changeImage(files, option) {
    if (!files.length) return false;

    const file = await this.toBase64(files[0]);

    switch (option) {
      case 1:
        this.form.patchValue({
          cdc_file: files[0],
        });
        break;
    }
  }

  toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  })

}
