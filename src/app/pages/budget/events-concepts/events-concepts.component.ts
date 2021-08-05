import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {EventConceptBusinessService} from '../../../business-controller/event-concept-business.service';
import {FormEventsConceptsComponent} from './form-events-concepts/form-events-concepts.component';
import {NbDialogService} from '@nebular/theme';
import {ConfirmDialogComponent} from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'ngx-events-concepts',
  templateUrl: './events-concepts.component.html',
  styleUrls: ['./events-concepts.component.scss'],
})
export class EventsConceptsComponent implements OnInit {
  @Input() event_id: number;
  @Input() event_day_id: number;
  @Input() municipality_id: number;
  @Input() conceptTypes = [];
  @Input() IsApproved = false;

  concepts = [];
  data = null;

  @ViewChild(FormEventsConceptsComponent) formEvent: FormEventsConceptsComponent;
  @Output() total = new EventEmitter<number>();
  constructor(
    private eventConcept: EventConceptBusinessService,
    private dialogFormService: NbDialogService,
  ) {
  }

  ngOnInit(): void {
    this.refreshData();
  }

  refreshData() {
    this.eventConcept.GetCollection({
      pagination: false,
      event_id: this.event_id,
      event_day_id: this.event_day_id,
    }).then(x => {
      this.concepts = x;
      this.total.emit(this.totalConcepts);
    });
  }

  get totalConcepts() {
    let total = 0;

    this.concepts.map(concept => {
      total += parseFloat(concept.planned_quantity) * parseFloat(concept.planned_unit_value);
    });

    return total;
  }

  edit(concept) {
    // this.data = concept;
    this.formEvent.setData({
      ...concept,
      concept_type_id: concept.concept.concept_base.concept_type.id,
      concept_id: {
        value: concept.concept.id,
        label: concept.concept.concept_base.name,
      },
    });
  }

  delete(data) {
    this.dialogFormService.open(ConfirmDialogComponent, {
      context: {
        name: data.concept.concept_base.name,
        data: data,
        delete: this.deleteConcept.bind(this),
      },
    });
  }

  deleteConcept(data) {
    return this.eventConcept.Delete(data.id).then(x => {
      this.refreshData();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }
}
