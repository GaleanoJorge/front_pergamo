import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {EventConceptBusinessService} from '../../../../business-controller/event-concept-business.service';
import {ConceptBusinessService} from '../../../../business-controller/concept-business.service';
import {ConfirmDialogComponent} from '../../../components/confirm-dialog/confirm-dialog.component';
import {EventDayBusinessService} from '../../../../business-controller/event-day-business.service';

@Component({
  selector: 'ngx-form-events-concepts',
  templateUrl: './form-events-concepts.component.html',
  styleUrls: ['./form-events-concepts.component.scss'],
})
export class FormEventsConceptsComponent implements OnInit {
  @Input() event_id: number;
  @Input() event_day_id: number;
  @Input() municipality_id: number;
  @Input() data = null;
  @Input() conceptTypes = [];
  @Input() refreshData = null;

  public form: FormGroup;

  isSubmitted = false;
  messageError = null;

  constructor(
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private eventsConcept: EventConceptBusinessService,
    private conceptBS: ConceptBusinessService,
    private dialogFormService: NbDialogService,
    private eventDayBS: EventDayBusinessService,
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      event_id: [this.event_id, Validators.compose([Validators.required])],
      event_day_id: [this.event_day_id, Validators.compose([Validators.required])],
      concept_type_id: [this.data?.concept_type_id ?? '', Validators.compose([Validators.required])],
      concept_id: [this.data?.concept_id ?? '', Validators.compose([Validators.required])],
      planned_quantity: [this.data?.planned_quantity ?? '', Validators.compose([Validators.required])],
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
        response = await this.eventsConcept.UpdatePlanned(data, this.data.id);
      } else {
        response = await this.eventsConcept.SavePlanned(data);
      }

      this.toastService.success('', response.message);

      this.resetForm();
      if (this.refreshData) this.refreshData();

      this.isSubmitted = false;
    } catch (e) {
      this.messageError = e;
    }
  }

  resetForm() {
    this.form.controls.concept_type_id.setValue('');
    this.form.controls.concept_id.setValue('');
    this.form.controls.planned_quantity.setValue('');
    this.form.controls.planned_unit_value.setValue('');
    this.data = null;
  }

  paramsConceptAutocomplete() {
    return {
      concept_type_id: this.form.controls.concept_type_id.value,
      municipality_id: this.municipality_id,
    };
  }

  public setData(data) {
    this.data = data;
    this.form.controls.concept_type_id.setValue(data.concept_type_id);
    this.form.controls.concept_id.setValue(data.concept_id);
    this.form.controls.planned_quantity.setValue(data.planned_quantity);
    this.form.controls.planned_unit_value.setValue(data.planned_unit_value);
  }

  async initConcept(value) {
    // const data = await this.conceptBS.GetOne(value);

    return value;
  }

  async eliminarDia() {
    this.dialogFormService.open(ConfirmDialogComponent, {
      context: {
        name: 'Día',
        data: this.event_day_id,
        delete: this.DeleteDay.bind(this),
      },
    });
  }

  async DeleteDay(data) {
    return this.eventDayBS.Delete(data).then(x => {
      this.refreshData();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }
}
