import {Component, OnInit, Input} from '@angular/core';
import {NbToastrService} from '@nebular/theme';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AnswerType} from '../../../../models/answer-type';
import {AnswerTypeService} from '../../../../business-controller/answer-type.service';

@Component({
  selector: 'ngx-form-scales',
  templateUrl: './form-scales.component.html',
  styleUrls: ['./form-scales.component.scss'],
})
export class FormScalesComponent implements OnInit {
  @Input() title: string;
  @Input() data: any = null;
  @Input() routes = [];
  @Input() messageError: any = null;
  @Input() routeBack = null;

  public form: FormGroup;
  public answerType: AnswerType[];
  public isSubmitted: boolean = false;
  public loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private answerTypeS: AnswerTypeService,
    private toastService: NbToastrService,
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [this.data?.name, Validators.compose([Validators.required])],
    });
  }

  async save() {

    this.isSubmitted = true;

    if (!this.form.invalid) {
      this.loading = true;
      try {
        let response;

        if (this.data?.id) {
          response = await this.answerTypeS.Update({
            id: this.data.id,
            name: this.form.controls.name.value,
          });
        } else {
          response = await this.answerTypeS.Save({
            name: this.form.controls.name.value,
          });
          this.data = response.data.answerType;
        }

        this.toastService.success('', response.message);

      } catch (e) {
        this.messageError = e;
        this.isSubmitted = false;
        this.loading = false;
      }

    }
  }

}
