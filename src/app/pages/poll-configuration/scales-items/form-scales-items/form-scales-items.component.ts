import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Answer} from '../../../../models/answer';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {AnswerService} from '../../../../business-controller/answer.service';

@Component({
  selector: 'ngx-form-scales-items',
  templateUrl: './form-scales-items.component.html',
  styleUrls: ['./form-scales-items.component.scss'],
})
export class FormScalesItemsComponent implements OnInit {
  @Input() title: string;
  @Input() data: any = null;
  @Input() answer_type_id: number;

  public form: FormGroup;
  public answer: Answer[];
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private answerS: AnswerService,
    private toastService: NbToastrService,
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [this.data?.name, Validators.compose([Validators.required])],
      value: [this.data?.value, Validators.compose([Validators.required])],
    });
  }

  close() {
    this.dialogRef.close();
  }

  async save() {
    this.isSubmitted = true;

    if (!this.form.invalid) {
      this.loading = true;
      let response;
      try {
        if (this.data?.id) {
          response = await this.answerS.Update({
            id: this.data.id,
            name: this.form.controls.name.value,
            value: this.form.controls.value.value,
            answer_type_id: this.answer_type_id,
          });
        } else {

          response = await this.answerS.Save({
            name: this.form.controls.name.value,
            value: this.form.controls.value.value,
            answer_type_id: this.answer_type_id,
          });
        }

        this.toastService.success('', response.message);
        this.close();
        if (this.saved)
          this.saved();

      } catch (e) {
        this.isSubmitted = false;
        this.loading = false;
      }
    }
  }

}
