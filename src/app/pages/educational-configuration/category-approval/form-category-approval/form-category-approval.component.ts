import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EntityType} from '../../../../models/entity-type';
import {Specialtym} from '../../../../models/specialtym';
import {CategoryN} from '../../../../models/CategoryN';
import {Origin} from '../../../../models/origin';
import {NbDialogRef, NbDialogService, NbToastrService} from '@nebular/theme';
import {EntityTypeService} from '../../../../business-controller/entity-type.service';
import {SpecialtymService} from '../../../../business-controller/specialtym.service';
import {NewCategoryService} from '../../../../business-controller/new-category.service';
import {CategoryApprovalBusinessService} from '../../../../business-controller/category-approval-business.service';
import { environment } from '../../../../../environments/environment.prod';

@Component({
  selector: 'ngx-form-category-approval',
  templateUrl: './form-category-approval.component.html',
  styleUrls: ['./form-category-approval.component.scss'],
})
export class FormCategoryApprovalComponent implements OnInit {
  @Input() title: string;
  @Input() data: any = null;
  @Input() category_id: number = null;
  @Input() moduleEdit: boolean;

  public form: FormGroup;
  public categories: CategoryN[];
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public messageError: string = null;
  public previewApproval = null;

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private categoryApprovalBS: CategoryApprovalBusinessService,
    private toastService: NbToastrService,
    private deleteConfirmService: NbDialogService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        approval_file: '',
        approval_date: '',
      };
    }else{
      this.previewApproval = environment.storage + this.data.approval_file;
    }

    const params: any = {};


    this.form = this.formBuilder.group({
      category_id: [this.data.category_id ?? this.category_id, Validators.compose([Validators.required])],
      approval_file: [this.data?.approval_file,Validators.compose([Validators.required])],
      approval_date: [this.data.approval_date, Validators.compose([Validators.required])],
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
    formData.append('category_id', data.category_id.value);
    formData.append('approval_file', this.form.value.approval_file);
    formData.append('approval_date', data.approval_date.value);


    try {
      let response;
      if (this.data?.id) {
        response = await this.categoryApprovalBS.Update(formData, this.data.id);
      } else {
        response = await this.categoryApprovalBS.Save(formData);
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
          approval_file: files[0],
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
