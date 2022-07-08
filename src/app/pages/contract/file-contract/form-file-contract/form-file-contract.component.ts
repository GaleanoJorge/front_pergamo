import { Component, OnInit, Input } from '@angular/core';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
// import {StatusBusinessService} from '../../../../business-controller/status-business.service';
import { ActivatedRoute, Router } from '@angular/router';
import {FileContractService} from '../../../../business-controller/file-contract.service';
import { environment } from '../../../../../environments/environment.prod';
import {DocumentService} from '../../../../business-controller/document.service';
import {CompanyService} from '../../../../business-controller/company.service';


@Component({
  selector: 'ngx-form-file-contract',
  templateUrl: './form-file-contract.component.html',
  styleUrls: ['./form-file-contract.component.scss']
})
export class FormFileContractComponent implements OnInit {

  @Input() title: string;
  @Input() contract_id: any;
  @Input() data: any = null;

  public form: FormGroup;
  // public status: Status[];
  public messageError = null;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public previewFile = null;

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    // private statusBS: StatusBusinessService,
    private FileContractS: FileContractService,
    private toastService: NbToastrService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        name: '',
        contract_id: '',
        file: '',
      };
    }else{
      this.previewFile = environment.storage + this.data.file;
    }

    // this.statusBS.GetCollection().then(x => {
    //   this.status = x;
    // });
    
    
    this.form = this.formBuilder.group({      
      name: [this.data.name, Validators.compose([Validators.required])],
      file: [this.data.file, Validators.compose([Validators.required])],
      contract_id: [this.data.contract_id],
    });

  }
  

  close() {
    this.dialogRef.close();
  }

  async save() {
    this.isSubmitted = true;

    if (!this.form.invalid){

    this.loading = true;

    var formData = new FormData();
    var data = this.form.controls;
    formData.append('file', this.form.value.file);
    formData.append('name', data.name.value);
    formData.append('contract_id', this.contract_id);


    try {
      let response;
      if (this.data?.id) {
        response = await this.FileContractS.Update(formData, this.data.id);
      } else {
        response = await this.FileContractS.Save(formData);
      }
      this.toastService.success('', response.message);
      this.messageError = null;
      this.close();
      if (this.saved) {
        this.saved();
      }
    } catch (response) {
      this.messageError = response;
      this.isSubmitted = false;
      this.loading = false;
      throw new Error(response);
    }
  }else{
    this.toastService.warning('', "Debe diligenciar los campos obligatorios");
  }
  }

  async changeImage(files, option) {
    if (!files.length) return false;

    const file = await this.toBase64(files[0]);

    switch (option) {
      case 1:
        this.form.patchValue({
          file: files[0],
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
