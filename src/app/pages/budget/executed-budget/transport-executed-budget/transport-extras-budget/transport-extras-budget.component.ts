import {Component, Input, OnInit} from '@angular/core';
import {EventConceptBusinessService} from '../../../../../business-controller/event-concept-business.service';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {ConfirmDialogComponent} from '../../../../components/confirm-dialog/confirm-dialog.component';
import {
  FormTransportExtrasBudgetComponent,
} from './form-transport-extras-budget/form-transport-extras-budget.component';
import {Validators} from '@angular/forms';

@Component({
  selector: 'ngx-transport-extras-budget',
  templateUrl: './transport-extras-budget.component.html',
  styleUrls: ['./transport-extras-budget.component.scss'],
})
export class TransportExtrasBudgetComponent implements OnInit {
  @Input() event_id: number;
  @Input() municipality_id: number;
  @Input() isClose = false;

  concepts = [];

  constructor(
    private eventConceptBS: EventConceptBusinessService,
    private toastrService: NbToastrService,
    private dialogFormService: NbDialogService,
  ) {
  }

  ngOnInit(): void {
    this.refreshData();
  }

  refreshData() {
    this.eventConceptBS.GetCollection({
      stage: 'extra',
      pagination: false,
      event_id: this.event_id,
      concept_type_id: this.eventConceptBS.DEFAULT_CONCEPT_TRANSPORTE,
    }).then(x => {
      this.concepts = x;
    });
  }

  addConceptExtra() {
    this.dialogFormService.open(FormTransportExtrasBudgetComponent, {
      hasScroll: true,
      context: {
        title: 'Crear concepto transporte extra',
        event_id: this.event_id,
        municipality_id: this.municipality_id,
        refreshData: this.refreshData.bind(this),
      },
    });
  }

  editConceptExtra(concept) {
    this.dialogFormService.open(FormTransportExtrasBudgetComponent, {
      context: {
        title: 'Editar concepto transporte extra',
        event_id: this.event_id,
        municipality_id: this.municipality_id,
        refreshData: this.refreshData.bind(this),
        data: {
          concept_id: {
            value: concept.concept_id,
            label: concept.concept.concept_base.name,
          },
          real_date: concept.real_date,
          passenger_user_id: concept.event_tickets[0].passenger_user_id,
          origin: concept.event_tickets[0].origin,
          destination: concept.event_tickets[0].destination,
          back: concept.event_tickets[0].back,
          departure_date: concept.event_tickets[0].departure_date,
          return_date: concept.event_tickets[0].return_date,
          departure_observations: concept.event_tickets[0].departure_observations,
          return_observations: concept.event_tickets[0].return_observations,
          event_concept_id: concept.id,
          event_ticket_id: concept.event_tickets[0].id,
        },
      },
    });
  }

  DeleteConfirmConcept(data) {
    this.dialogFormService.open(ConfirmDialogComponent, {
      context: {
        name: data.concept.concept_base.name,
        data: data,
        delete: this.DeleteConcept.bind(this),
      },
    });
  }

  DeleteConcept(data) {
    return this.eventConceptBS.Delete(data.id).then(x => {
      this.refreshData();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

  get total() {
    let total = 0;

    this.concepts.map(concept => {
      total += concept.real_quantity * concept.real_unit_value;
    });

    return total;
  }

}
