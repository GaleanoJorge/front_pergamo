import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidityService } from '../../../../business-controller/validity.service';
import { Validity } from '../../../../models/validity';
import { Origin } from '../../../../models/origin';
import { OriginBusinessService } from '../../../../business-controller/origin-business.service';
import { Category } from '../../../../models/category';
import { CategoryBusinessService } from '../../../../business-controller/category-business.service';
import { CourseBaseService } from '../../../../business-controller/coursebase.service';
import { CourseBase } from '../../../../models/coursebase';
import { CampusService } from '../../../../business-controller/campus.service';
import { Campus } from '../../../../models/campus';
import { EntityType } from '../../../../models/entity-type';
import { EntityTypeService } from '../../../../business-controller/entity-type.service';
import { CourseBusinessService } from '../../../../business-controller/course-business.service';
import { ModuleBusinessService } from '../../../../business-controller/module-business.service';
import { Module } from '../../../../models/module';
import { CourseModuleBusinessService } from '../../../../business-controller/course-module-business.service';
import { ThemesService } from '../../../../business-controller/themes.service';
import { Themes } from '../../../../models/themes';
import { CompetitionBusinessService } from '../../../../business-controller/competition-business.service';
import { Competition } from '../../../../models/competition';
import { CourseCompetitionBusinessService } from '../../../../business-controller/course-competition-business.service';
import { CourseThemesBusinessService } from '../../../../business-controller/course-themes-business.service';
import { CertificatesBusinessService } from '../../../../business-controller/certificates-business.service';
import { Certificate } from 'crypto';
import { CourseTypeService } from '../../../../business-controller/course-type.service';
import { CourseType } from '../../../../models/course-type';

@Component({
  selector: 'ngx-form-course',
  templateUrl: './form-course.component.html',
  styleUrls: ['./form-course.component.scss'],
})
export class FormCourseComponent implements OnInit {
  @Input() title: string;
  @Input() data: any = null;

  public form: FormGroup;
  public validities: Validity[] = [];
  public origins: Origin[] = [];
  public categories: Category[] = [];
  public baseCourses: CourseBase[] = [];
  public campus: Campus[];
  public entities: EntityType[];
  public modules: Module[] = [];
  public themes: Themes[] = [];
  public competition: Competition[] = [];
  public certificates: Certificate[] = [];
  public courseTypes: CourseType[] = [];
  public courseStates: any[] = [];
  public courseModules: any[] = [];
  public courseThemes: any[] = [];
  public courseCompetition: any[] = [];
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
    private courseBaseBS: CourseBaseService,
    private courseBS: CourseBusinessService,
    private campusBS: CampusService,
    private entityTypeBS: EntityTypeService,
    private moduleBS: ModuleBusinessService,
    private courseModuleBS: CourseModuleBusinessService,
    private themesBS: ThemesService,
    private competitionBS: CompetitionBusinessService,
    private courseCompetitionBS: CourseCompetitionBusinessService,
    private courseThemesBS: CourseThemesBusinessService,
    private _serviceCertificates: CertificatesBusinessService,
    private courseType: CourseTypeService
  ) {
  }

  ngOnInit(): void {

    if (!this.data) {
      this.data = {
        category_id: '',
        campus_id: '',
        entity_type_id: '',
        coursebase_id: '',
        quota: '',
        start_date: '',
        finish_date: '',
        certificates_id: '',
        course_type_id: '',
        course_template:'',
        course_states_id: '',
      };
    } else {
      this.baseCourses.push(this.data.coursebase);
      // this.courseTypes.push(this.data.course_type);
      this.categories.push(this.data.coursebase.category);
      this.origins.push(this.data.coursebase.category.categories_origin[0].origin);
      this.validities.push(this.data.coursebase.category.categories_origin[0].origin.validity);
      this.GetModules();
      this.GetThemes();
      this.GetCompetition();
    }

    this.validityBS.GetCollection().then(x => {
      this.validities = x;
    });
    this.courseBS.GetStatus().then(x => {
      this.courseStates = x;
    });
    this.campusBS.GetCollection({ pagination: false }).then(x => {
      this.campus = x;
    });
    this.entityTypeBS.GetCollection().then(x => {
      this.entities = x;
    });
    this._serviceCertificates.GetCollection().then(x => {
      this.certificates = x;
    });
    this.courseType.GetCollection({ pagination: false }).then(x => {
      this.courseTypes = x;
    });

    this.form = this.formBuilder.group({
      validity_id: [this.data.coursebase ?
        this.data.coursebase.category.categories_origin[0].origin.validity.id : '', Validators.compose([Validators.required])],
      origin_id: [this.data.coursebase ?
        this.data.coursebase.category.categories_origin[0].origin.id : '', Validators.compose([Validators.required])],
      category_id: [this.data.category_id, Validators.compose([Validators.required])],
      coursebase_id: [this.data.coursebase_id, Validators.compose([Validators.required])],
      campus_id: [this.data.campus_id, Validators.compose([Validators.required])],
      entity_type_id: [this.data.entity_type_id, Validators.compose([Validators.required])],
      // certificates_id: [this.data.certificates_id, Validators.compose([Validators.required])],
      certificates_id: [this.data.certificates_id],
      course_template: [this.data.course_template],
      course_type_id: [this.data.course_type_id],
      course_states_id: [this.data.course_states_id],
      quota: [this.data.quota, Validators.compose([Validators.required])],
      start_date: [this.data.start_date, Validators.compose([Validators.required])],
      finish_date: [this.data.finish_date, Validators.compose([Validators.required])],
    });
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      if (Date.parse(this.form.controls.finish_date.value) < Date.parse(this.form.controls.start_date.value)) {
        this.toastService.danger(null, 'Revise las fechas');
        this.loading = false;
      } else {
        if (this.data.id) {
          this.courseBS.Update({
            id: this.data.id,
            origin_id: this.form.controls.origin_id.value,
            category_id: this.form.controls.category_id.value,
            campus_id: this.form.controls.campus_id.value,
            entity_type_id: this.form.controls.entity_type_id.value,
            coursebase_id: this.form.controls.coursebase_id.value,
            course_template:this.form.controls.course_template.value,
            quota: this.form.controls.quota.value,
            start_date: this.form.controls.start_date.value,
            finish_date: this.form.controls.finish_date.value,
            certificates_id: this.form.controls.certificates_id.value,
            course_type_id: this.form.controls.course_type_id.value,
            course_states_id: this.form.controls.course_states_id.value,
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
          this.courseBS.Save({
            origin_id: this.form.controls.origin_id.value,
            category_id: this.form.controls.category_id.value,
            campus_id: this.form.controls.campus_id.value,
            entity_type_id: this.form.controls.entity_type_id.value,
            coursebase_id: this.form.controls.coursebase_id.value,
            course_template:this.form.controls.course_template.value,
            quota: this.form.controls.quota.value,
            start_date: this.form.controls.start_date.value,
            finish_date: this.form.controls.finish_date.value,
            certificates_id: this.form.controls.certificates_id.value,
            course_type_id: this.form.controls.course_type_id.value,
            course_states_id: this.form.controls.course_states_id.value,
          }).then(x => {
            this.toastService.success('', x.message);
            this.close();
            if (this.saved) {
              this.saved();
            }
            this.modules.forEach(module => {
              if (module.checked)
                this.courseModuleBS.Save({
                  course_id: x.data.course.id,
                  module_id: module.id,
                }).then().catch(e => {
                  throw e;
                });
            });
            this.themes.forEach(themes => {
              if (themes.checked)
                this.courseThemesBS.Save({
                  course_id: x.data.course.id,
                  themes_id: themes.id,
                }).then().catch(e => {
                  throw e;
                });
            });
            this.competition.forEach(competition => {
              if (competition.checked)
                this.courseCompetitionBS.Save({
                  course_id: x.data.course.id,
                  competition_id: competition.id,
                }).then().catch(e => {
                  throw e;
                });
            });
          }).catch(x => {
            this.isSubmitted = false;
            this.loading = false;
          });
        }
      }
    }
  }

  onChangeValidity(e) {
    this.form.controls.origin_id.setValue('');
    this.form.controls.category_id.setValue('');
    this.form.controls.coursebase_id.setValue('');
    this.originBS.GetByValidity(e).then(x => {
      this.origins = x.data;
    });
  }

  onChangeOrigin(e) {
    this.form.controls.category_id.setValue('');
    this.form.controls.coursebase_id.setValue('');
    this.categoryBS.GetByOrigin(e).then(x => {
      this.categories = x;
    });
  }

  onChangeCategory(e) {
    this.form.controls.coursebase_id.setValue('');
    this.courseBaseBS.GetByCategory(e).then(x => {
      this.baseCourses = x;
    });
    this.moduleBS.GetByCategoryId(e).then(x => {
      this.modules = x;
    });
  }

  toggle(e, module) {
    this.modules.find(item => item.id === module.id).checked = e;
    if (!e && this.courseModules.length > 0) {
      const id = this.courseModules.find(item => item.module_id === module.id).id;
      if (id)
        this.courseModuleBS.Delete(id).then(x => {
          this.toastService.success('', x.message);
        }).catch(x => {
          throw x;
        });
    }
    if (e && this.data.id) {
      this.courseModuleBS.Save({
        course_id: this.data.id,
        module_id: module.id,
      }).then(x => {
        this.toastService.success('', x.message);
        this.GetModules();
      }).catch(x => {
        throw x;
      });
    }
  }

  toggle2(e, themes) {
    this.themes.find(item => item.id === themes.id).checked = e;
    if (!e && this.courseThemes.length > 0) {
      const id = this.courseThemes.find(item => item.themes_id === themes.id).id;
      if (id)
        this.courseThemesBS.Delete(id).then(x => {
          this.toastService.success('', x.message);
        }).catch(x => {
          throw x;
        });
    }
    if (e && this.data.id) {
      this.courseThemesBS.Save({
        course_id: this.data.id,
        themes_id: themes.id,
      }).then(x => {
        this.toastService.success('', x.message);
        this.GetThemes();
      }).catch(x => {
        throw x;
      });
    }
  }

  toggle3(e, competition) {
    this.competition.find(item => item.id === competition.id).checked = e;
    if (!e && this.courseCompetition.length > 0) {
      const id = this.courseCompetition.find(item => item.themes_id === competition.id).id;
      if (id)
        this.courseCompetitionBS.Delete(id).then(x => {
          this.toastService.success('', x.message);
        }).catch(x => {
          throw x;
        });
    }
    if (e && this.data.id) {
      this.courseCompetitionBS.Save({
        course_id: this.data.id,
        competition_id: competition.id,
      }).then(x => {
        this.toastService.success('', x.message);
        this.GetCompetition();
      }).catch(x => {
        throw x;
      });
    }
  }


  GetModules() {
    this.courseModuleBS.GetByCourseId(this.data.id).then(x => {
      this.courseModules = x.data.modules.data;
      this.moduleBS.GetByCategoryId(this.data.category_id).then(response => {
        this.modules = response;
        this.modules.forEach(module => {
          module.checked = this.courseModules.find(item => item.module_id === module.id) ? true : false;
        });
      });
    });
  }

  GetThemes() {
    this.courseThemesBS.GetByCourseId(this.data.id).then(x => {
      this.courseThemes = x.data.themes.data;
      this.themesBS.GetCollection().then(response => {
        this.themes = response;
        this.themes.forEach(themes => {
          themes.checked = this.courseThemes.find(item => item.themes_id === themes.id) ? true : false;
        });
      });
    });
  }
  GetCompetition() {
    this.courseCompetitionBS.GetByCourseId(this.data.id).then(x => {
      this.courseCompetition = x.data.competition.data;
      this.competitionBS.GetSingleCollection().then(response => {
        this.competition = response;
        this.competition.forEach(competition => {
          competition.checked = this.courseCompetition.find(item => item.competition_id === competition.id) ? true : false;
        });
      });
    });
  }
}
