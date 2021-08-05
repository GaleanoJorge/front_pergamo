import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NbToastrService} from '@nebular/theme';
import {EventConceptBusinessService} from '../../../../business-controller/event-concept-business.service';
import {ConceptBusinessService} from '../../../../business-controller/concept-business.service';

@Component({
  selector: 'ngx-form-events-concepts-special',
  templateUrl: './form-events-concepts-special.component.html',
  styleUrls: ['./form-events-concepts-special.component.scss'],
})
export class FormEventsConceptsSpecialComponent implements OnInit {

  @Input() event_id: number;
  @Input() municipality_id: number;
  @Input() data = null;
  @Input() refreshData = null;

  public form: FormGroup;

  isSubmitted = false;
  messageError = null;
  DEFAULT_CONCEPT_TYPE_SPECIAL = 3;

  constructor(
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private eventsConcept: EventConceptBusinessService,
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      event_id: [this.event_id, Validators.compose([Validators.required])],
      concept_id: [this.data?.concept_id ?? '', Validators.compose([Validators.required])],
      planned_unit_value: [this.data?.planned_unit_value ?? '', Validators.compose([Validators.required])],
    });
  }

  async Save() {
    this.isSubmitted = true;

    if (this.form.invalid) return false;

    try {
      let response;
      const data = {
        ...this.form.value,
      };

      data.concept_id = data.concept_id.value;

      if (this.data?.id) {
        response = await this.eventsConcept.UpdateSpecials(data, this.data.id);
      } else {
        response = await this.eventsConcept.SaveSpecials(data);
      }

      this.toastService.success('', response.message);

      this.resetForm();
      if (this.refreshData) this.refreshData();

      this.isSubmitted = false;
    } catch (e) {
      this.messageError = e;
    }
  }

  paramsConceptAutocomplete() {
    return {
      municipality_id: this.municipality_id,
      concept_type_id: this.DEFAULT_CONCEPT_TYPE_SPECIAL,
    };
  }

  async initConcept(value) {
    return value;
  }

  resetForm() {
    this.form.controls.concept_id.setValue('');
    this.form.controls.planned_unit_value.setValue('');
    this.data = null;
  }

  public setData(data) {
    this.data = data;
    this.form.controls.concept_id.setValue(data.concept_id);
    this.form.controls.planned_unit_value.setValue(data.planned_unit_value);
  }

}
