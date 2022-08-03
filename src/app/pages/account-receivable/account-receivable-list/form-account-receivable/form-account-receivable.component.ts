import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlossAmbitService } from '../../../../business-controller/gloss-ambit.service';
import { AccountReceivableService } from '../../../../business-controller/account-receivable.service';
import { UserBusinessService } from '../../../../business-controller/user-business.service';
import { compare } from '@rxweb/reactive-form-validators';
import { StatusBillService } from '../../../../business-controller/status-bill.service';
import { CampusService } from '../../../../business-controller/campus.service';
import { AuthService } from '../../../../services/auth.service';
import { UserActivityService } from '../../../../business-controller/user-activity.service';
import * as XLSX from 'ts-xlsx';
import { environment } from '../../../../../environments/environment.prod';




@Component({
  selector: 'ngx-form-account-receivable',
  templateUrl: './form-account-receivable.component.html',
  styleUrls: ['./form-account-receivable.component.scss'],
})
export class FormAccountReceivableComponent implements OnInit {
  @Input() title: string;
  @Input() data: any = null;

  public form: FormGroup;
  public loading: boolean = false;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public capacity: any = null;
  public previewFile = null;
  public user;
  public messageError = null;


  
  public selectedOptions: any[] = [];

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private authService: AuthService,
    private accountReceivableS: AccountReceivableService,

    
  ) {
  }

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        file: '',
      };
    }else{
      if (this.data.file_payment) {
        this.previewFile = environment.storage + this.data.file_payment;
      }
    }

    // this.statusBS.GetCollection().then(x => {
    //   this.status = x;
    // });
    
    
    this.form = this.formBuilder.group({      
      file: [this.data.file, Validators.compose([Validators.required])],
    });


    this.user = this.authService.GetUser();


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
 


    try {
      let response;
      if (this.data?.id) {
        response = await this.accountReceivableS.saveFile(formData, this.data.id);
      }
      this.toastService.success('', response.message);
      this.messageError = null;
      this.close();
      if (this.saved) {
        this.saved();
      }
      if (this.data.status_bill_id != 5 && this.capacity) {
        this.capacity(this.data.assistance_id);
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
  


  


