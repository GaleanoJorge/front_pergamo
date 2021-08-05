import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SectionService} from '../../../../business-controller/section.service';
import {CourseBusinessService} from '../../../../business-controller/course-business.service';
import {SurveySectionsBusinessService} from '../../../../business-controller/survey-sections-business.service';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {UserBusinessService} from '../../../../business-controller/user-business.service';

@Component({
  selector: 'ngx-form-section-survey',
  templateUrl: './form-section-survey.component.html',
  styleUrls: ['./form-section-survey.component.scss'],
})
export class FormSectionSurveyComponent implements OnInit {
  @Input() title = null;
  @Input() survey_id = null;
  @Input() data = null;
  @Input() refreshData = null;

  public isSubmitted = false;
  public form: FormGroup;

  public sections = [];
  public courses = [];
  public trainers = [];

  public messageError = null;
  public loading = false;


  constructor(
    private formBuilder: FormBuilder,
    private sectionBS: SectionService,
    private courseBS: CourseBusinessService,
    private surveySectionsBS: SurveySectionsBusinessService,
    private toastrService: NbToastrService,
    private dialogRef: NbDialogRef<any>,
    private userBS: UserBusinessService,
  ) {
  }

  ngOnInit(): void {
    this.sectionBS.GetCollection().then(x => {
      this.sections = x;
    });

    this.courseBS.GetAll({
      pagination: false,
    }).then(x => {
      this.courses = x;
    });

    let course_id = null;

    if (this.data) {
      course_id = this.data.course_id ?? null;
    }

    this.GetTrainers(course_id);

    this.form = this.formBuilder.group({
      section_id: [this.data?.section_id ?? '', Validators.compose([Validators.required])],
      name: [this.data?.name, Validators.compose([Validators.required])],
      weight: [this.data?.weight, Validators.compose([Validators.required])],
      is_percent: [this.data?.is_percent ?? true, Validators.compose([Validators.required])],
      course_id: [this.data?.course_id ?? ''],
      user_role_id: [this.data?.user_role_id ?? ''],
      // status_id: [this.data.status_id],
    });

    this.form.get('section_id').valueChanges.subscribe(val => {
      let newVal = '';

      this.sections.map(section => {
        if (section.id === val) {
          newVal = section.description;
        }
      });

      this.form.patchValue({
        name: newVal,
      });

    });

    this.form.get('course_id').valueChanges.subscribe(val => {
      if (val === '') {
        this.GetTrainers();
      } else {
        this.GetTrainers(val);
      }
      this.form.patchValue({
        user_role_id: '',
      });
    });
  }

  GetTrainers(course_id = null) {
    this.userBS.GetTrainersByCourse(course_id).then(x => {
      this.trainers = x;
    });
  }

  async Save() {
    this.isSubmitted = true;

    if (!this.form.invalid) {
      this.loading = true;
      const data = this.form.value;
      data.survey_id = this.survey_id;
      data.is_percent = data.is_percent ? 1 : 0;

      try {
        let response;
        if (this.data) {
          data.id = this.data.id;
          response = await this.surveySectionsBS.Update(data);
        } else {
          response = await this.surveySectionsBS.Save(data);
        }

        this.toastrService.success('', response.message);

        if (this.refreshData) this.refreshData();
        this.close();
      } catch (e) {
        this.messageError = e;
      }

      this.loading = false;

    }
  }

  public close() {
    this.dialogRef.close();
  }

  get errors() {
    const e = [];
    if (this.messageError && this.messageError.error
      && this.messageError.error.data && this.messageError.error.data.errors) {
      const errors = this.messageError.error.data.errors;
      const errorKeys = Object.keys(errors);

      errorKeys.map(key => {
        errors[key].map(er => {
          e.push(er);
        });
      });
    }

    return e;
  }
}
