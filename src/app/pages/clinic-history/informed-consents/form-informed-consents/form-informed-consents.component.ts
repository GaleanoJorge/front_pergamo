import { Component, OnInit, Input } from '@angular/core';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
// import {StatusBusinessService} from '../../../../business-controller/status-business.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../../environments/environment.prod';
import { ConsentsInformedService } from '../../../../business-controller/consents-informed.service';

@Component({
  selector: 'ngx-form-informed-consents',
  templateUrl: './form-informed-consents.component.html',
  styleUrls: ['./form-informed-consents.component.scss']
})
export class FormInformedConsentsComponent implements OnInit {

  @Input() title: string;
  @Input() ch_record: any;
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
    private ConsentsInformedS: ConsentsInformedService,
    private toastService: NbToastrService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        name: '',
        ch_record: '',
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
      ch_record: [this.data.ch_record],
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
    formData.append('file', this.form.controls.file.value);
    formData.append('name', data.name.value);
    formData.append('ch_record_id', this.ch_record);
    formData.append('admissions_id', this.ch_record);
    formData.append('type_consents_id', this.ch_record);


    try {
      let response;
      if (this.data?.id) {
        response = await this.ConsentsInformedS.Update(this.data.id);
      } else {
        response = await this.ConsentsInformedS.Save(formData);
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
