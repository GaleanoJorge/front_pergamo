import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NbToastrService} from '@nebular/theme';
import {ValidityService} from '../../../../business-controller/validity.service';
import {OriginBusinessService} from '../../../../business-controller/origin-business.service';
import {CategoryBusinessService} from '../../../../business-controller/category-business.service';
import {CourseBusinessService} from '../../../../business-controller/course-business.service';
import {SurveyScheduledBusinessService} from '../../../../business-controller/survey-scheduled-business.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'ngx-form-scheduled-surveys',
  templateUrl: './form-scheduled-surveys.component.html',
  styleUrls: ['./form-scheduled-surveys.component.scss'],
})
export class FormScheduledSurveysComponent implements OnInit {
  @Input() title = null;
  @Input() subtitle = null;
  @Input() routes = null;
  @Input() messageError = null;
  @Input() routeBack = null;
  @Input() data = null;
  @Input() survey_id;

  public form: FormGroup;
  public isSubmitted: boolean = false;

  public validities = [];
  public origins = [];
  public categories = [];
  public courses = [];

  public users_found = null;
  public countLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private validityBS: ValidityService,
    private originBS: OriginBusinessService,
    private categoryBS: CategoryBusinessService,
    private courseBS: CourseBusinessService,
    private surveyScheduledBS: SurveyScheduledBusinessService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    if (this.data) {
      if (this.data.validity_id) {
        this.getOrigins(this.data.validity_id);
      }
      if (this.data.origin_id) {
        this.getCategories(this.data.origin_id);
      }
      if (this.data.category_id) {
        this.getCourses(this.data.category_id);
      }
    }
    this.survey_id = this.route.snapshot.params.survey_id ?? null;
    this.validityBS.GetCollection({
      pagination: false,
    }).then(x => {
      this.validities = x;
    });
    this.form = this.formBuilder.group({
      description: [this.data?.description],
      survey_id: [this.data?.survey_id ?? this.survey_id, Validators.compose([Validators.required])],
      dt_init: [this.data?.dt_init, Validators.compose([Validators.required])],
      dt_finish: [this.data?.dt_finish, Validators.compose([Validators.required])],
      status_id: [this.data?.status_id ?? 1, Validators.compose([Validators.required])],
      validity_id: [this.data?.validity_id ?? '', Validators.compose([Validators.required])],
      origin_id: [{value: this.data?.origin_id ?? '', disabled: this.data?.disableParticipantes ?? false}],
      category_id: [{value: this.data?.category_id ?? '', disabled: this.data?.disableParticipantes ?? false}],
      course_id: [{value: this.data?.course_id ?? '', disabled: this.data?.disableParticipantes ?? false}],
    });

    if (this.data) {
      this.countPoblation();
    }

    this.OnChanges();
  }

  OnChanges() {
    this.form.get('validity_id').valueChanges.subscribe(val => {
      this.origins = [];

      if (val !== '') {
        this.getOrigins(val);
      }

      this.countPoblation();
      this.form.patchValue({
        origin_id: '',
        category_id: '',
        course_id: '',
      });

      // this.disabledFields();
    });

    this.form.get('origin_id').valueChanges.subscribe(val => {
      this.categories = [];

      if (val !== '') {
        this.getCategories(val);
      }

      this.countPoblation();
      this.form.patchValue({
        category_id: '',
        course_id: '',
      });
      // this.disabledFields();
    });

    this.form.get('category_id').valueChanges.subscribe(val => {
      this.courses = [];

      if (val !== '') {
        this.getCourses(val);
      }

      this.countPoblation();
      this.form.patchValue({
        course_id: '',
      });
      // this.disabledFields();
    });

    this.form.get('course_id').valueChanges.subscribe(val => {
      this.countPoblation();
    });
  }

  getOrigins(validity_id) {
    this.originBS.GetCollection({
      validity_id,
      pagination: false,
    }).then(x => {
      this.origins = x;
    });
  }

  getCategories(origin_id) {
    this.categoryBS.GetByOrigin(origin_id, false).then(x => {
      this.categories = x;
    });
  }

  getCourses(category_id) {
    this.courseBS.GetAll({
      category_id,
      pagination: false,
    }).then(x => {
      this.courses = x;
    });
  }

  disabledFields() {
    if (!this.form.controls.validity_id.value) {
      this.form.controls.origin_id.disable();
    } else {
      this.form.controls.origin_id.enable();
    }

    if (!this.form.controls.origin_id.value) {
      this.form.controls.category_id.disable();
    } else {
      this.form.controls.category_id.enable();
    }

    if (!this.form.controls.category_id.value) {
      this.form.controls.course_id.disable();
    } else {
      this.form.controls.course_id.enable();
    }
  }

  countPoblation() {
    if (this.countLoading) return false;
    this.countLoading = true;
    const params: any = {};

    if (this.form.controls.validity_id.value) {
      params.validity_id = this.form.controls.validity_id.value;
    }

    if (this.form.controls.origin_id.value) {
      params.origin_id = this.form.controls.origin_id.value;
    }

    if (this.form.controls.category_id.value) {
      params.category_id = this.form.controls.category_id.value;
    }

    if (this.form.controls.course_id.value) {
      params.course_id = this.form.controls.course_id.value;
    }

    this.validityBS.CountPoblationAcademic(params).then(x => {
      this.users_found = x.message;
      this.countLoading = false;
    });
  }

  async Save() {
    this.isSubmitted = true;

    if (!this.form.invalid) {
      const data = {...this.form.value, url: `${location.origin}/pages/survey/surveys/`};
      data.status_id = data.status_id ? 1 : 2;

      try {
        let response;
        if (this.data?.id) {
          data.id = this.data.id;
          response = await this.surveyScheduledBS.Update(data);
        } else {
          response = await this.surveyScheduledBS.Save(data);
        }

        this.toastService.success('', response.message);

        await this.router.navigateByUrl(this.routeBack);
      } catch (e) {
        this.messageError = e;
      }

    }
  }

}
