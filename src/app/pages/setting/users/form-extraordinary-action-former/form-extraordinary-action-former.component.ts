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
  selector: 'ngx-form-extraordinary-action-former',
  templateUrl: './form-extraordinary-action-former.component.html',
  styleUrls: ['./form-extraordinary-action-former.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormExtraordinaryActionFormerComponent implements OnInit {
  @Input() title: string;
  @Input() data: any = null;

  public form: FormGroup;
  public validities: any[] = [];
  public origins: any[] = [];
  public categories: any[] = [];
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
      this.validities.push({
        id: this.data.course.validity_id,
        name: this.data.course.validity_name,
      });
      this.origins.push({
        id: this.data.course.origin_id,
        name: this.data.course.origin_name,
      });
      this.categories.push({
        id: this.data.course.category_id,
        name: this.data.course.category_name,
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
      validity_id: [this.data.course ? this.data.course.validity_id : '', Validators.compose([Validators.required])],
      origin_id: [this.data.course ? this.data.course.origin_id : '', Validators.compose([Validators.required])],
      category_id: [this.data.course ? this.data.course.category_id : '', Validators.compose([Validators.required])],
      inscription_status_id: [this.data.course ? this.data.course.inscription_status_id : '', Validators.compose([Validators.required])],
    });

    if (this.data.course) {
      this.form.controls.validity_id.disable();
      this.form.controls.origin_id.disable();
      this.form.controls.category_id.disable();
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
        category_id: this.form.controls.category_id.value,
        inscription_status_id: this.form.controls.inscription_status_id.value,
      }, 'storeFormer').then(x => {
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
    this.originBS.GetByValidity(e).then(x => {
      this.origins = x.data;
      this.cdr.detectChanges();
    });
  }

  onChangeOrigin(e) {
    console.log(e);
    this.form.controls.category_id.setValue('');
    this.categoryBS.GetByOrigin(e).then(x => {
      this.categories = x;
      this.cdr.detectChanges();
    });
  }

}
