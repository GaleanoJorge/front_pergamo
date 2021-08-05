import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GroupBusinessService} from '../../../../business-controller/group-business.service';
import {NbDialogRef, NbToastrService} from '@nebular/theme';

@Component({
  selector: 'ngx-form-group',
  templateUrl: './form-group.component.html',
  styleUrls: ['./form-group.component.scss'],
})
export class FormGroupComponent implements OnInit {
  @Input() course_id: number = null;
  @Input() refresh;
  @Input() data = {
    id: null,
    code: '',
    name: '',
    description: '',
  };

  public form: FormGroup;
  public isSubmitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private groupBs: GroupBusinessService,
    private dialogRef: NbDialogRef<any>,
    private toastService: NbToastrService,
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      code: [this.data.code, Validators.compose([Validators.required])],
      name: [this.data.name, Validators.compose([Validators.required])],
      description: [this.data.description, Validators.compose([Validators.required])],
    });
  }

  close() {
    this.dialogRef.close();
  }

  async save() {
    this.isSubmitted = true;

    if (!this.form.invalid) {
      try {
        let x;
        if (this.data.id) {
          x = await this.groupBs.Update({
            ...this.form.value,
            course_id: this.course_id,
            id: this.data.id,
          });
        } else {
          x = await this.groupBs.Save({
            ...this.form.value,
            course_id: this.course_id,
          });

        }
        this.toastService.success(null, x.message);
        this.close();
        this.refresh();
      } catch (e) {
      }
    }
  }
}
