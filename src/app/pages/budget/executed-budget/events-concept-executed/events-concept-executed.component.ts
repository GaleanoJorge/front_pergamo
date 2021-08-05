import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EventConceptBusinessService} from '../../../../business-controller/event-concept-business.service';

@Component({
  selector: 'ngx-events-concept-executed',
  templateUrl: './events-concept-executed.component.html',
  styleUrls: ['./events-concept-executed.component.scss'],
})
export class EventsConceptExecutedComponent implements OnInit {
  @Input() event_id: number;
  @Input() event_day_id: number;
  @Input() isClose = false;

  concepts = [];

  constructor(
    private eventConcept: EventConceptBusinessService,
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
      stage: 'project',
      concept_type_id: 1,
    }).then(x => {
      this.concepts = x;
    });
  }

  get totalPresupuestado() {
    let total = 0;

    this.concepts.map((concept) => {
      total += parseFloat(concept.planned_quantity) * parseFloat(concept.planned_unit_value);
    });

    return total;
  }

  get totalEjecutado() {
    let total = 0;

    this.concepts.map((concept) => {
      total += parseFloat(concept.real_quantity ?? 0) * parseFloat(concept.real_unit_value ?? 0);
    });

    return total;
  }

  clickFile(index) {
    document.getElementById('file_' + index + '_' + this.event_day_id).click();
  }

  onChangeFile(files, index) {
    if (!files.length) return false;
    this.concepts[index]['evidence_path'] = files[0];
  }

  isUrlFile(file) {
    return typeof file === 'string';
  }
}
