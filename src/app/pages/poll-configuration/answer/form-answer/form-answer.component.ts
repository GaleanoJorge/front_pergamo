import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Answer} from '../../../../models/answer';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {AnswerService} from '../../../../business-controller/answer.service';
import {AnswerQuestionService} from '../../../../business-controller/answer-question.service';

@Component({
  selector: 'ngx-form-answer',
  templateUrl: './form-answer.component.html',
  styleUrls: ['./form-answer.component.scss'],
})
export class FormAnswerComponent implements OnInit {
  @Input() title: string;
  @Input() data: any = null;
  @Input() answer_type_id: number;
  @Input() question_id: number;

  public form: FormGroup;
  public answer: Answer[];
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private answerS: AnswerService,
    private answerQS: AnswerQuestionService,
    private toastService: NbToastrService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        name: '',
        value: '',
      };
    }

    this.form = this.formBuilder.group({
      name: [this.data.name, Validators.compose([Validators.required])],
      value: [this.data.value, Validators.compose([Validators.required])],
    });
  }

  close() {
    this.dialogRef.close();
  }

  save() {

    this.isSubmitted = true;

    if (!this.form.invalid) {
      this.loading = true;

      if (this.data.id) {
        this.answerS.Update({
          id: this.data.id,
          name: this.form.controls.name.value,
          value: this.form.controls.value.value,
          answer_type_id: this.answer_type_id,
        }).then(x => {

          this.toastService.success('', x.message);
          this.close();
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      } else {

        this.answerS.Save({
          name: this.form.controls.name.value,
          value: this.form.controls.value.value,
          answer_type_id: this.answer_type_id,
        }).then(x => {
          this.answerQS.Save({
            question_id: this.question_id,
            answer_id: x.data.answer.id,
          }).then(y => {
            this.toastService.success('', y.message);
            this.close();
            if (this.saved) {
              this.saved();
            }
          }).catch(y => {
            this.isSubmitted = false;
            this.loading = false;
          });
        }).catch(x => {

          this.isSubmitted = false;
          this.loading = false;
        });
      }

    }
  }

}
