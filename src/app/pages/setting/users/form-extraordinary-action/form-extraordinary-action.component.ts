import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidityService } from '../../../../business-controller/validity.service';
import { Validity } from '../../../../models/validity';
import { Origin } from '../../../../models/origin';
import { OriginBusinessService } from '../../../../business-controller/origin-business.service';
import { Category } from '../../../../models/category';
import { CategoryBusinessService } from '../../../../business-controller/category-business.service';
import { CourseBusinessService } from '../../../../business-controller/course-business.service';
import { Course } from '../../../../models/course';
import { GroupBusinessService } from '../../../../business-controller/group-business.service';
import { InscriptionStatusBusinessService } from '../../../../business-controller/inscription-status-business.service';
import { InscriptionStatus } from '../../../../models/inscription-status';
import { UserRoleBusinessService } from '../../../../business-controller/user-role-business.service';

@Component({
  selector: 'ngx-form-extraordinary-action',
  templateUrl: './form-extraordinary-action.component.html',
  styleUrls: ['./form-extraordinary-action.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormExtraordinaryActionComponent implements OnInit {
  @Input() title: string;
  @Input() data: any = null;

  public form: FormGroup;
  public validities: Validity[] = [];
  public origins: Origin[] = [];
  public categories: Category[] = [];
  public courses: Course[] = [];
  public groups: any[] = [];
  public inscription_status: InscriptionStatus[] = [];

  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private validityBS: ValidityService,
    private toastService: NbToastrService,
    private originBS: OriginBusinessService,
    private categoryBS: CategoryBusinessService,
    private courseBS: CourseBusinessService,
    private groupBS: GroupBusinessService,
    private statusBS: InscriptionStatusBusinessService,
    private userRoleBS: UserRoleBusinessService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    if (this.data.course) {
      this.validities.push(this.data.course.category.categories_origin[0].origin.validity);
      this.origins.push(this.data.course.category.categories_origin[0].origin);
      this.categories.push(this.data.course.category);
      this.courses.push(this.data.course);
      this.groups.push({
        id: this.data.group.group_id,
        name: this.data.group.name
      });
    }

    this.validityBS.GetCollection().then(x => {
      this.validities = x;
      this.cdr.detectChanges();
    });

    this.statusBS.GetCollection().then(x => {
      this.inscription_status = x['data'];
      this.cdr.detectChanges();
    });

    this.form = this.formBuilder.group({
      validity_id: [this.data.course ?
        this.data.course.category.categories_origin[0].origin.validity.id : '', Validators.compose([Validators.required])],
      origin_id: [this.data.course ?
        this.data.course.category.categories_origin[0].origin.id : '', Validators.compose([Validators.required])],
      category_id: [this.data.course ? this.data.course.category.id : '', Validators.compose([Validators.required])],
      course_id: [this.data.course ? this.data.course.id : '', Validators.compose([Validators.required])],
      group_id: [this.data.group ? this.data.group.group_id : '', Validators.compose([Validators.required])],
      inscription_status_id: [this.data.inscription_status_id, Validators.compose([Validators.required])],
    });

    if (this.data.course) {
      this.form.controls.validity_id.disable();
      this.form.controls.origin_id.disable();
      this.form.controls.category_id.disable();
      this.form.controls.course_id.disable();
      this.form.controls.group_id.disable();
      this.cdr.detectChanges();
    }
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.userRoleBS.Save({
        user_id: this.data.user_id,
        role_id: this.data.role_id,
        group_id: this.form.controls.group_id.value,
        inscription_status_id: this.form.controls.inscription_status_id.value,
      }).then(x => {
        this.toastService.success('', x.message);
        this.close();
        if (this.saved) {
          this.saved();
          this.cdr.detectChanges();
        }
      }).catch(x => {
        this.isSubmitted = false;
        this.loading = false;
      });
    }
  }

  onChangeValidity(e) {
    this.form.controls.origin_id.setValue('');
    this.form.controls.category_id.setValue('');
    this.form.controls.course_id.setValue('');
    this.form.controls.group_id.setValue('');
    this.originBS.GetByValidity(e).then(x => {
      this.origins = x.data;
      this.cdr.detectChanges();
    });
  }

  onChangeOrigin(e) {
    this.form.controls.category_id.setValue('');
    this.form.controls.course_id.setValue('');
    this.form.controls.group_id.setValue('');
    this.categoryBS.GetByOrigin(e).then(x => {
      this.categories = x;
      this.cdr.detectChanges();
    });
  }

  onChangeCategory(e) {
    this.form.controls.course_id.setValue('');
    this.form.controls.group_id.setValue('');
    this.courseBS.GetCollection(e).then(x => {
      this.courses = x;
      this.cdr.detectChanges();
    });
  }

  onChangeCourse(e) {
    this.form.controls.group_id.setValue('');
    this.groupBS.GetCollection({
      course_id: e,
    }).then(x => {
      this.groups = x;
      this.cdr.detectChanges();
    });
  }

}
