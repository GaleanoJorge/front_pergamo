import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {EventConceptBusinessService} from '../../../business-controller/event-concept-business.service';
import {
  FormEventsConceptsSpecialComponent,
} from './form-events-concepts-special/form-events-concepts-special.component';
import {ConfirmDialogComponent} from '../../components/confirm-dialog/confirm-dialog.component';
import {NbDialogService} from '@nebular/theme';

@Component({
  selector: 'ngx-events-concepts-special',
  templateUrl: './events-concepts-special.component.html',
  styleUrls: ['./events-concepts-special.component.scss'],
})
export class EventsConceptsSpecialComponent implements OnInit {
  @Input() event_id: number;
  @Input() municipality_id: number;
  @Input() data: any = null;
  @Input() IsApproved = false;
  DEFAULT_CONCEPT_TYPE_SPECIAL = 3;
  concepts = [];

  @Output() total = new EventEmitter<number>();

  @ViewChild(FormEventsConceptsSpecialComponent) formSpecial: FormEventsConceptsSpecialComponent;

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
      concept_type_id: this.DEFAULT_CONCEPT_TYPE_SPECIAL,
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
    this.formSpecial.setData({
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
