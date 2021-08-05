import {Component, Input, OnInit} from '@angular/core';
import {EventConceptBusinessService} from '../../../../business-controller/event-concept-business.service';
import {file} from '@rxweb/reactive-form-validators';

@Component({
  selector: 'ngx-events-concept-special-executed',
  templateUrl: './events-concept-special-executed.component.html',
  styleUrls: ['./events-concept-special-executed.component.scss'],
})
export class EventsConceptSpecialExecutedComponent implements OnInit {
  @Input() event_id: number;
  @Input() isClose = false;
  DEFAULT_CONCEPT_TYPE_SPECIAL = 3;
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
      concept_type_id: this.DEFAULT_CONCEPT_TYPE_SPECIAL,
      stage: 'project',
    }).then(x => {
      this.concepts = x;
      // this.total.emit(this.totalConcepts);
    });
  }

  get totalPresupuestado() {
    let total = 0;

    this.concepts.map((concept) => {
      total += parseFloat(concept.planned_unit_value);
    });

    return total;
  }

  get totalEjecutado() {
    let total = 0;

    this.concepts.map((concept) => {
      total += parseFloat(concept.real_unit_value ?? 0);
    });

    return total;
  }

  clickFile(index) {
    document.getElementById('file_especial_' + index).click();
  }

  onChangeFile(files, index) {
    if (!files.length) return false;
    this.concepts[index]['evidence_path'] = files[0];
  }

  isUrlFile(path) {
    return typeof path === 'string';
  }
}
