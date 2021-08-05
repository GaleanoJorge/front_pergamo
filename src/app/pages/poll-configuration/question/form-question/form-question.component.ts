import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {QuestionService} from '../../../../business-controller/question.service';
import {QuestionTypeService} from '../../../../business-controller/question-type.service';
import {OriginBusinessService} from '../../../../business-controller/origin-business.service';
import {NewCategoryService} from '../../../../business-controller/new-category.service';
import {NbToastrService} from '@nebular/theme';
import {SectionService} from '../../../../business-controller/section.service';

@Component({
  selector: 'ngx-form-question',
  templateUrl: './form-question.component.html',
  styleUrls: ['./form-question.component.scss'],
})
export class FormQuestionComponent implements OnInit {
  @Input() title = null;
  @Input() routes = [];
  @Input() routeBack = null;
  @Input() data = null;

  public section_id: number = null;
  public questionTypes = [];
  public form: FormGroup;
  public isSubmitted: boolean = false;
  public messageError = null;
  public showAnswer = false;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private questionS: QuestionService,
    private questionTS: QuestionTypeService,
    private originBS: OriginBusinessService,
    private categoryBS: NewCategoryService,
    private toastService: NbToastrService,
    private sectionS: SectionService,
  ) {
  }

  ngOnInit(): void {
    this.section_id = this.route.snapshot.params.section_id;
    if (!this.routeBack) {
      this.routeBack = '/pages/pollconfiguration/sections/' + this.section_id + '/edit';
    }
    if (!this.data) {
      this.data = {
        id: null,
        name: '',
        question_type_id: '',
        description: '',
      };
    }

    this.questionTS.GetCollection().then(x => {
      this.questionTypes = x;
    });

    this.sectionS.GetOne(this.section_id).then(x => {
      if (x.is_matriz) this.showAnswer = false;
      else this.showAnswer = true;
    });

    this.form = this.formBuilder.group({
      name: [this.data.name, Validators.compose([Validators.required])],
      description: [this.data.description, Validators.compose([Validators.required])],
      question_type_id: [this.data.question_type_id, Validators.compose([Validators.required])],
    });
  }

  async save() {
    this.isSubmitted = true;

    if (this.form.invalid) return false;

    try {
      let response;
      if (this.data.id) {
        response = await this.questionS.Update({
          name: this.form.controls.name.value,
          description: this.form.controls.description.value,
          question_type_id: this.form.controls.question_type_id.value,
          section_id: this.section_id,
          status_id: this.data.status_id,
          id: this.data.id,
        });
      } else {
        response = await this.questionS.Save({
          name: this.form.controls.name.value,
          description: this.form.controls.description.value,
          question_type_id: this.form.controls.question_type_id.value,
          section_id: this.section_id,
        });
        this.data.id = response.data.question.id;
        this.data.status_id = response.data.question.status_id;
      }

      this.toastService.success('', response.message);
    } catch (e) {
      this.messageError = e;
    }

  }

}
