import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {EventConceptBusinessService} from '../../../../../../business-controller/event-concept-business.service';
import {ConceptBaseBusinessService} from '../../../../../../business-controller/concept-base-business.service';
import {EventsTicketsBusiness} from '../../../../../../business-controller/events-tickets-business';
import {UserBusinessService} from '../../../../../../business-controller/user-business.service';

@Component({
  selector: 'ngx-form-transport-extras-budget',
  templateUrl: './form-transport-extras-budget.component.html',
  styleUrls: ['./form-transport-extras-budget.component.scss'],
})
export class FormTransportExtrasBudgetComponent implements OnInit {
  @Input() event_id: number;
  @Input() refreshData = null;
  @Input() title: string;
  @Input() data = null;
  @Input() municipality_id: number;

  // conceptTypes = [];
  form: FormGroup;
  isSubmitted = false;
  loading = false;

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private eventConceptBS: EventConceptBusinessService,
    private eventsTicketBS: EventsTicketsBusiness,
    private usersBS: UserBusinessService,
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      event_id: [this.event_id, Validators.compose([Validators.required])],
      concept_id: [this.data?.concept_id, Validators.compose([Validators.required])],
      real_date: [this.data?.real_date, Validators.compose([Validators.required])],
      passenger_user_id: [this.data?.passenger_user_id, Validators.compose([Validators.required])],
      origin: [this.data?.origin, Validators.compose([Validators.required])],
      destination: [this.data?.destination, Validators.compose([Validators.required])],
      back: [this.data?.back, Validators.compose([Validators.required])],
      departure_date: [this.data?.departure_date, Validators.compose([Validators.required])],
      return_date: [this.data?.return_date, Validators.compose([Validators.required])],
      departure_observations: [this.data?.departure_observations],
      return_observations: [this.data?.return_observations],
    });
  }

  paramsConceptAutocomplete() {
    return {
      concept_type_id: this.eventConceptBS.DEFAULT_CONCEPT_TRANSPORTE,
      municipality_id: this.municipality_id,
    };
  }

  async initConcept(value) {
    // const data = await this.conceptBS.GetOne(value);

    return value;
  }

  close() {
    this.dialogRef.close();
  }

  async save() {
    this.isSubmitted = true;
    if (this.form.invalid) return false;

    this.loading = true;

    try {
      const data = this.form.value;

      const newData = {
        eventConcept: {
          id: this.data?.event_concept_id,
          concept_id: data.concept_id.value,
          event_id: data.event_id,
          real_date: data.real_date,
        },
        eventTicket: {
          id: this.data?.event_ticket_id,
          passenger_user_id: data.passenger_user_id.id,
          origin: data.origin,
          destination: data.destination,
          back: data.back,
          departure_date: data.departure_date,
          return_date: data.return_date,
          departure_observations: data.departure_observations,
          return_observations: data.return_observations,
        },
      };


      let response;
      if (this.data?.event_concept_id) {
        response = await this.eventsTicketBS.UpdateTransportExtra(newData);
      } else {
        response = await this.eventsTicketBS.SaveTransportExtra(newData);
      }

      this.toastService.success('', response.message);
      if (this.refreshData) this.refreshData();
      this.close();
    } catch (e) {
      this.toastService.danger('', e.message);
    }
    this.loading = false;
  }

  renderLabelUsers(data) {
    return data.nombre_completo;
  }

  async searchUser(value) {
    return await this.usersBS.GetUserById(value);
  }
}
