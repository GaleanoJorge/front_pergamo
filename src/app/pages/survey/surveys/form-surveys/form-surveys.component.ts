import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SurveyTypesBusinessService} from '../../../../business-controller/survey-types-business.service';
import {SurveyBusinessService} from '../../../../business-controller/survey-business.service';
import {NbToastrService} from '@nebular/theme';

@Component({
  selector: 'ngx-form-surveys',
  templateUrl: './form-surveys.component.html',
  styleUrls: ['./form-surveys.component.scss'],
})
export class FormSurveysComponent implements OnInit {
  @Input() title = null;
  @Input() routes = null;
  @Input() messageError = null;
  @Input() routeBack = '/pages/survey/surveys';
  @Input() data = null;

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public previewImage = null;

  public surveyTypes = [];

  constructor(
    private surveyTypesBS: SurveyTypesBusinessService,
    private surveyBS: SurveyBusinessService,
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
  ) {
  }

  ngOnInit(): void {
    this.surveyTypesBS.GetCollection().then(x => {
      this.surveyTypes = x;
    });

    if (this.data) {
      const duration = this.data.duration.split(':');
      this.data.duration_h = duration[0];
      this.data.duration_m = duration[1];
      this.previewImage = this.data.url_image;
      this.data.url_image = null;
    }

    this.form = this.formBuilder.group({
      survey_type_id: [this.data?.survey_type_id ?? '', Validators.compose([Validators.required])],
      name: [this.data?.name, Validators.compose([Validators.required])],
      description: [this.data?.description, Validators.compose([Validators.required])],
      duration_h: [this.data?.duration_h, Validators.compose([
        Validators.required,
        Validators.min(0),
        Validators.max(10)]),
      ],
      duration_m: [this.data?.duration_m, Validators.compose([
        Validators.required,
        Validators.min(0),
        Validators.max(60)]),
      ],
      url_image: [this.data?.url_image],
    })
    ;
  }

  async Save() {
    this.isSubmitted = true;
    // this.form.controls.url_image.markAsTouched();

    if (!this.form.invalid) {

      const formData = new FormData();
      const data = this.form.value;
      data.duration_h = data.duration_h * 1;
      data.duration_m = data.duration_m * 1;
      formData.append('survey_type_id', data.survey_type_id);
      formData.append('name', data.name);
      formData.append('description', data.description);
      formData.append('duration', `${data.duration_h > 10 ? data.duration_h : '0' + data.duration_h}:${data.duration_m > 10 ? data.duration_m : '0' + data.duration_m}`);
      formData.append('url_image', data.url_image);

      try {
        let response;
        if (this.data?.id) {
          response = await this.surveyBS.Update(formData, this.data.id);
        } else {
          response = await this.surveyBS.Save(formData);
        }

        this.toastService.success('', response.message);
        this.data = response.data.survey;
      } catch (e) {
        this.messageError = e;
      }

    }
  }

  uploadImage() {
    document.getElementById('url_image').click();

    this.form.controls.url_image.markAsTouched();
  }

  async changeImage(files) {
    if (!files.length) return false;

    const file = await this.toBase64(files[0]);

    this.form.patchValue({
      url_image: files[0],
    });

    this.previewImage = file;
  }

  toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  })

}
