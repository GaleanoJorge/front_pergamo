import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { AreaService } from '../../../../business-controller/area.service';
import { Location } from '@angular/common';
// import { SubareaService } from '../../../../business-controller/subarea.service';
import { NbToastrService } from '@nebular/theme';
import { NewCategoryService } from '../../../../business-controller/new-category.service';
import { ActivatedRoute, Router } from '@angular/router';
// import { CategoryBusinessService } from '../../../../business-controller/category-business.service';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { environment } from '../../../../../environments/environment.prod';

@Component({
  selector: 'ngx-form-category',
  templateUrl: './form-category.component.html',
  styleUrls: ['./form-category.component.scss'],
})
export class FormCategoryComponent implements OnInit {
  @Input() title = '';
  @Input() routes = [];
  @Input() routeBack = '';
  @Input() data = null;

  public messageError = null;
  public form: FormGroup;
  public areas = [];
  public subareas = [];
  public categories = [];
  public isSubmitted = false;
  public showcursos: boolean = false;
  public showapproval: boolean = false;
  public showsubprogram: boolean = false;
  public showmodules: boolean = true;
  public previewImage = null;
  public previewImage2 = null;

  constructor(
    private formBuilder: FormBuilder,
    // private areaS: AreaService,
    // private subareaS: SubareaService,
    private toastService: NbToastrService,
    private categoryBS: NewCategoryService,
    private route: ActivatedRoute,
    private location: Location,
  ) {
  }

  ngOnInit(): void {
    if (!this.routeBack) {
      // this.routeBack = '/pages/educationalconfiguration/origin/' + this.route.snapshot.params.origin_id + '/edit';
      this.routeBack = '/pages/educationalconfiguration/category';
    }

    if (!this.data) {
      this.data = {
        id: null,
        name: '',
        area_id: null,
        description: '',
        subarea_id: null,
        origin_id: '',
        category_parent_id: '',
        url_img: null
      };
    } else {
      this.previewImage = environment.storage + this.data.url_img;
      this.previewImage2 = environment.storage + this.data.url_img_ext;
    }

    // this.areaS.GetCollection().then(x => {
    //   this.areas = x;
    // });

    this.categoryBS.GetAll().then(x => {
      this.categories = x;
    });

    const params: any = {};

    if (!this.data.id) {
      params.status_id = 1;
    }

    // this.subareaS.GetCollection(params).then(x => {
    //   this.subareas = x;
    // });

    this.form = this.formBuilder.group({
      name: [this.data.name, Validators.compose([Validators.required])],
      // area_id: [this.data.area_id, Validators.compose([Validators.required])],
      category_parent_id: [this.data.category_parent_id],
      // subarea_id: [this.data.subarea_id, Validators.compose([Validators.required])],
      // origin_id: [this.data.origin_id, Validators.compose([Validators.required])],
      description: [this.data.description, Validators.compose([Validators.required])],
      url_img: [this.data?.url_img],
      url_img_ext: [this.data?.url_img_ext],
    });
  }

  async Save() {
    this.isSubmitted = true;
    if (this.form.invalid) return false;

    var formData = new FormData();
    var data = this.form.controls;
    formData.append('id', this.data.id);
    formData.append('name', data.name.value);
    formData.append('description', data.description.value);
    formData.append('area_id', null);
    formData.append('subarea_id', null);
    formData.append('url_img', this.form.value.url_img);
    formData.append('url_img_ext', this.form.value.url_img_ext);
    if (this.form.controls.category_parent_id.value)
      formData.append('category_parent_id', data.category_parent_id.value);

    try {
      let response;
      if (this.data?.id) {
        response = await this.categoryBS.Update(formData, this.data.id);
      } else {
        response = await this.categoryBS.Save(formData);
        this.location.back();
      }

      this.toastService.success('', response.message);
    } catch (e) {
      this.messageError = e;
    }
  }

  ShowModules() {
    this.showmodules = true;
    this.showapproval = false;
    this.showcursos = false;
    this.showsubprogram = false;
  }

  ShowCourses() {
    this.showmodules = false;
    this.showapproval = false;
    this.showsubprogram = false;
    this.showcursos = true;
  }

  ShowSubProgram() {
    this.showmodules = false;
    this.showapproval = false;
    this.showcursos = false;
    this.showsubprogram = true;
  }

  ShowApproval() {
    this.showmodules = false;
    this.showcursos = false;
    this.showsubprogram = false;
    this.showapproval = true;
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
          url_img: files[0],
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
