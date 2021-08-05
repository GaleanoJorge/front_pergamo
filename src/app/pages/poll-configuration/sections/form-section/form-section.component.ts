import {Component, OnInit, Input} from '@angular/core';
import {NbToastrService} from '@nebular/theme';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CourseBaseService} from '../../../../business-controller/coursebase.service';
import {CourseBase} from '../../../../models/coursebase';
import {AnswerTypeService} from '../../../../business-controller/answer-type.service';
import {AnswerType} from '../../../../models/answer-type';
import {SectionService} from '../../../../business-controller/section.service';

@Component({
  selector: 'ngx-form-section',
  templateUrl: './form-section.component.html',
  styleUrls: ['./form-section.component.scss'],
})
export class FormSectionComponent implements OnInit {
  @Input() title: string;
  @Input() data: any = null;
  @Input() routes = null;
  @Input() messageError: any = null;
  @Input() routeBack = '/pages/pollconfiguration/sections';

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public courses: CourseBase[];
  public answers_types: AnswerType[];
  public show: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private courseBS: CourseBaseService,
    private answerTS: AnswerTypeService,
    private sectionS: SectionService,
    private toastService: NbToastrService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        id: null,
        name: '',
        description: '',
        coursebase_id: '',
        answer_type_id: '',
        is_matriz: false,
      };
    }
    this.show = this.data.is_matriz;
    this.courseBS.GetCollection().then(x => {
      this.courses = x;
    });

    this.answerTS.GetCollection().then(x => {
      this.answers_types = x;
    });

    this.form = this.formBuilder.group({
      name: [this.data.name, Validators.compose([Validators.required])],
      description: [this.data.description, Validators.compose([Validators.required])],
      coursebase_id: [this.data.coursebase_id, Validators.compose([Validators.required])],
      answer_type_id: [this.data.coursebase_id, Validators.compose([Validators.required])],
      is_matriz: [this.data.is_matriz],
    });
  }

  ChangeIsMatriz() {
    this.show = !this.show;
  }

  async save() {
    this.isSubmitted = true;
    this.loading = true;

    if (this.form.invalid) {
      this.loading = false;
      return false;
    }

    try {
      let response;

      if (this.data.id) {
        response = await this.sectionS.Update({
          id: this.data.id,
          name: this.form.controls.name.value,
          description: this.form.controls.description.value,
          coursebase_id: this.form.controls.coursebase_id.value,
          answer_type_id: this.form.controls.answer_type_id.value,
          is_matriz: this.form.controls.is_matriz.value,
        });
      } else {
        response = await this.sectionS.Save({
          name: this.form.controls.name.value,
          description: this.form.controls.description.value,
          coursebase_id: this.form.controls.coursebase_id.value,
          answer_type_id: this.form.controls.answer_type_id.value,
          is_matriz: this.form.controls.is_matriz.value,
        });
      }

      this.toastService.success('', response.message);
    } catch (e) {
      this.isSubmitted = false;
      this.loading = false;
      this.messageError = e;
    }
  }
}
