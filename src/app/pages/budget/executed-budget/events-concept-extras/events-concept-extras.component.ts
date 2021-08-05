import {Component, Input, OnInit} from '@angular/core';
import {EventConceptBusinessService} from '../../../../business-controller/event-concept-business.service';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {FormEventsConceptExtrasComponent} from './form-events-concept-extras/form-events-concept-extras.component';
import {ConfirmDialogComponent} from '../../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'ngx-events-concept-extras',
  templateUrl: './events-concept-extras.component.html',
  styleUrls: ['./events-concept-extras.component.scss'],
})
export class EventsConceptExtrasComponent implements OnInit {
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
    }).then(x => {
      this.concepts = x;
    });
  }

  addConceptExtra() {
    this.dialogFormService.open(FormEventsConceptExtrasComponent, {
      context: {
        title: 'Crear concepto extra',
        event_id: this.event_id,
        municipality_id: this.municipality_id,
        refreshData: this.refreshData.bind(this),
      },
    });
  }

  editConceptExtra(concept) {
    this.dialogFormService.open(FormEventsConceptExtrasComponent, {
      context: {
        title: 'Editar concepto extra',
        event_id: this.event_id,
        municipality_id: this.municipality_id,
        refreshData: this.refreshData.bind(this),
        data: {
          ...concept,
          evidence_path: null,
          concept_type_id: concept.concept.concept_base.concept_type_id,
          concept_id: {
            value: concept.concept_id,
            label: concept.concept.concept_base.name,
          },
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
