import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseType } from '../../../../models/course-type';
import { CourseTypeService } from '../../../../business-controller/course-type.service';


@Component({
  selector: 'ngx-form-course-type',
  templateUrl: './form-course-type.component.html',
  styleUrls: ['./form-course-type.component.scss']
})
export class FormCourseTypeComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;

  public form: FormGroup;
  public courseType: CourseType[];
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private courseTypeS: CourseTypeService,
    private toastService: NbToastrService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        name: '',
      };
    }
    this.form = this.formBuilder.group({
      name: [this.data.name, Validators.compose([Validators.required])],
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
        this.courseTypeS.Update({
          id: this.data.id,
          name: this.form.controls.name.value,
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
        this.courseTypeS.Save({
          id: this.data.id,
          name: this.form.controls.name.value
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
      }
    }
  }

}

