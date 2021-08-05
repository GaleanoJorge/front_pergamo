import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EventBusinessService} from '../../../../business-controller/event-business.service';
import {UserBusinessService} from '../../../../business-controller/user-business.service';
import {NbToastrService} from '@nebular/theme';
import {MunicipalityService} from '../../../../business-controller/municipality.service';
import {CourseBusinessService} from '../../../../business-controller/course-business.service';

@Component({
  selector: 'ngx-form-preliminary-budget',
  templateUrl: './form-preliminary-budget.component.html',
  styleUrls: ['./form-preliminary-budget.component.scss'],
})
export class FormPreliminaryBudgetComponent implements OnInit {
  @Input() title = null;
  @Input() routes = null;
  @Input() messageError = null;
  @Input() routeBack = '/pages/budget/preliminary';
  @Input() data = null;

  public form: FormGroup;
  public isSubmitted: boolean = false;

  origins = [];
  categories = [];
  subcategories = [];
  entityTypes = [];
  conceptTypes = [];
  status = [];
  amount = 0;

  constructor(
    private formBuilder: FormBuilder,
    private eventBS: EventBusinessService,
    private usersBS: UserBusinessService,
    private toastService: NbToastrService,
    private municipalityBS: MunicipalityService,
    private courseBS: CourseBusinessService,
  ) {
  }

  ngOnInit(): void {

    if (this.data) {
      if (this.data.category_id) {
        this.searchCategoryOrigin({
          origin_id: this.data.origin_id,
          parent_id: this.data.category_id,
        }).then(x => {
          this.subcategories = x;
          this.form.controls.categories_origin_id.setValue(this.data.categories_origin_id);
        });
      }
    }

    this.eventBS.GetAuxData().then(x => {
      this.origins = x.origins;
      this.conceptTypes = x.conceptTypes;
      this.status = x.status;
      this.entityTypes = x.entityTypes;
      this.categories = x.categories;
    });
    this.form = this.formBuilder.group({
      course_id: [this.data?.course_id],
      origin_id: [this.data?.origin_id ?? '', Validators.compose([Validators.required])],
      category_id: [this.data?.category_id ?? '', Validators.compose([Validators.required])],
      categories_origin_id: [this.data?.categories_origin_id ?? '', Validators.compose([Validators.required])],
      municipality_id: [this.data?.municipality_id, Validators.compose([Validators.required])],
      entity_type_id: [this.data?.entity_type_id ?? '', Validators.compose([Validators.required])],
      name: [this.data?.name, Validators.compose([Validators.required])],
      initial_date: [this.data?.initial_date, Validators.compose([Validators.required])],
      final_date: [this.data?.final_date, Validators.compose([Validators.required])],
      summoned_participants: [this.data?.summoned_participants, Validators.compose([Validators.required])],
      number_trainers: [this.data?.number_trainers, Validators.compose([Validators.required])],
      user_coordinate_id: [this.data?.user_coordinate_id, Validators.compose([Validators.required])],
      place: [this.data?.place],
      // approved_status_id: [this.data?.approved_status_id ?? '', Validators.compose([Validators.required])],
    });
    this.onChange();
  }

  onChange() {
    this.form.get('course_id').valueChanges.subscribe(val => {
      if (val) {
        if (val.origin_id) {
          this.form.controls.origin_id.setValue(val.origin_id);
        }

        if (val.entity_type_id) {
          this.form.controls.entity_type_id.setValue(val.entity_type_id);
        }

        if (val.category_id) {
          this.form.controls.category_id.setValue(val.category_id);
        }

        if (val.initial_date) {
          this.form.controls.initial_date.setValue(val.initial_date);
        }

        if (val.final_date) {
          this.form.controls.final_date.setValue(val.final_date);
        }

        if (val.summoned_participants) {

          this.form.controls.summoned_participants.setValue(val.summoned_participants);
        }

        if (val.number_trainers) {
          this.form.controls.number_trainers.setValue(val.number_trainers);
        }

        if (val.categories_origin_id) {
          this.form.controls.categories_origin_id.setValue(val.categories_origin_id);
        }
      }
    });

    this.form.get('category_id').valueChanges.subscribe(async category_id => {
      if (category_id) {
        this.subcategories = await this.searchCategoryOrigin({
          origin_id: this.form.controls.origin_id.value,
          parent_id: category_id,
        });
      }
    });

    this.form.get('categories_origin_id').valueChanges.subscribe(async id => {
      this.subcategories.map(sub => {
        if (sub.id === id) {
          this.amount = parseFloat(sub.allocated_budget ?? 0) - parseFloat(sub.planned_budget ?? 0);
        }
      });
    });
  }

  async searchCategoryOrigin(params) {
    return this.eventBS.GetCategoryOrigin(params);
  }

  async Save() {
    this.isSubmitted = true;

    if (this.form.invalid) return false;

    try {
      let response;
      const data = {
        ...this.form.value,
      };

      data.user_coordinate_id = data.user_coordinate_id?.id;
      data.municipality_id = data.municipality_id?.value;
      data.course_id = data.course_id?.value;

      if (this.data?.id) {
        response = await this.eventBS.Update(data, this.data.id);
      } else {
        response = await this.eventBS.Save(data);
      }

      this.toastService.success('', response.message);
      this.data = response.data.event;

    } catch (e) {
      this.messageError = e;
    }
  }

  renderLabelUsers(data) {
    return data.nombre_completo;
  }

  async searchUser(value) {
    return await this.usersBS.GetUserById(value);
  }

  async searchMunicipality(value) {
    const data = await this.municipalityBS.GetOne(value);
    return {
      value: data.id,
      label: data.name,
    };
  }

  async searchCourse(value) {
    const data: any = await this.courseBS.GetById(value);

    return {
      value: data.id,
      label: data.id + ' - ' + data.coursebase.name,
    };
  }

  get IsApproved() {
    return this.data ? this.data.approved_date : false;
  }
}
