import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryN } from '../../../../models/CategoryN';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { NewCategoryService } from '../../../../business-controller/new-category.service';
import { CourseBaseService } from '../../../../business-controller/coursebase.service';
import { environment } from '../../../../../environments/environment.prod';


@Component({
  selector: 'ngx-form-course',
  templateUrl: './form-course.component.html',
  styleUrls: ['./form-course.component.scss'],
})
export class FormCourseComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Input() category_id: any = null;
  @Input() curseEdit: boolean;

  public form: FormGroup;
  public categories: CategoryN[];
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public previewImage = null;
  public previewImage2 = null;
  public previewCircular = null;

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private categoryS: NewCategoryService,
    private courseS: CourseBaseService,
    private toastService: NbToastrService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        name: '',
        description: '',
        general_objective:'',
        addressed_to: '',
        category_id: null,
        duration: '',
        contact_email: '',
      };
    } else {
      this.previewImage = environment.storage + this.data.url_img_int;
      this.previewImage2 = environment.storage + this.data.url_img_ext;
      this.previewCircular = environment.storage + this.data.circular;
    }

    this.categoryS.GetCollection().then(x => {
      this.categories = x;
    });

    this.form = this.formBuilder.group({
      name: [this.data.name, Validators.compose([Validators.required])],
      addressed_to: [this.data.addressed_to, Validators.compose([Validators.required])],
      category_id: [this.data.category_id ?? this.category_id, Validators.compose([Validators.required])],
      duration: [this.data.duration, Validators.compose([Validators.required, Validators.min(0)])],
      contact_email: [this.data.contact_email, Validators.compose([Validators.required, Validators.email, Validators.minLength(5)])],
      description: [this.data.description],
      general_objective: [this.data.general_objective],
      url_img_int: [this.data?.url_img_int],
      url_img_ext: [this.data?.url_img_ext],
      circular: [this.data?.circular],
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
    formData.append('id', this.data.id);
    formData.append('name', data.name.value);
    formData.append('description', data.description.value);
    formData.append('general_objective', data.general_objective.value);
    formData.append('category_id', data.category_id.value);
    formData.append('addressed_to', data.addressed_to.value);
    formData.append('duration', data.duration.value);
    formData.append('contact_email', data.contact_email.value);
    formData.append('url_img_int', this.form.value.url_img_int);
    formData.append('url_img_ext', this.form.value.url_img_ext);
    formData.append('circular', this.form.value.circular);

    try {
      let response;
      if (this.data?.id) {
        response = await this.courseS.Update(formData, this.data.id);
      } else {
        response = await this.courseS.Save(formData);
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

  uploadImage(elementId) {
    document.getElementById(elementId).click();
    this.form.controls[elementId].markAsTouched();
  }

  async changeImage(files, option) {
    if (!files.length) return false;

    const file = await this.toBase64(files[0]);

    switch (option) {
      case 1:
        this.form.patchValue({
          url_img_int: files[0],
        });
        this.previewImage = file;
        break;
      case 2:
        this.form.patchValue({
          url_img_ext: files[0],
        });
        this.previewImage2 = file;
        break;
      case 3:
        this.form.patchValue({
          circular: files[0],
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
