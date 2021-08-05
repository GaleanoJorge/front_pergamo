import {Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {EventDayBusinessService} from '../../../../business-controller/event-day-business.service';
import {EventsConceptExecutedComponent} from '../events-concept-executed/events-concept-executed.component';
import {EventsConceptSpecialExecutedComponent} from '../events-concept-special-executed/events-concept-special-executed.component';
import {EventConceptBusinessService} from '../../../../business-controller/event-concept-business.service';
import {NbToastrService} from '@nebular/theme';
import {EventsConceptExtrasComponent} from '../events-concept-extras/events-concept-extras.component';
import {ResumeEventExecutedComponent} from '../resume-event-executed/resume-event-executed.component';

@Component({
  selector: 'ngx-logistic-executed-budget',
  templateUrl: './logistic-executed-budget.component.html',
  styleUrls: ['./logistic-executed-budget.component.scss'],
})
export class LogisticExecutedBudgetComponent implements OnInit {
  title = 'Ejecución del presupuesto logistico';
  messageError = null;
  routeBack = '/pages/budget/executed/list';
  loading = true;
  event_id = null;
  data = null;
  events_day = [];

  routes = [
    {
      name: 'Presupuesto ejecutado',
      route: '/pages/budget/executed/list',
    },
    {
      name: 'Logístico',
      route: this.router.url,
    },
  ];
  @ViewChildren(EventsConceptExecutedComponent) eventsDayConcept: QueryList<EventsConceptExecutedComponent>;
  @ViewChild(EventsConceptSpecialExecutedComponent) eventsDaySpecial: EventsConceptSpecialExecutedComponent;
  @ViewChild(EventsConceptExtrasComponent) eventsExtras: EventsConceptExtrasComponent;
  @ViewChild(ResumeEventExecutedComponent) resumeEvent: ResumeEventExecutedComponent;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private eventDayBS: EventDayBusinessService,
    private eventConceptBS: EventConceptBusinessService,
    private toastrService: NbToastrService,
  ) {
  }

  ngOnInit(): void {
    this.event_id = this.route.snapshot.params.id;
    this.refreshData();
  }

  refreshData() {
    this.loading = true;
    this.eventDayBS.GetCollection({
      event_id: this.event_id,
      pagination: false,
    }).then(x => {
      this.events_day = x;
      this.loading = false;
    });
  }

  async Save() {
    let data = [];
    this.eventsDayConcept.forEach(component => {
      data = [
        ...data,
        ...component.concepts,
      ];
    });

    data = [
      ...data,
      ...this.eventsDaySpecial.concepts,
    ];

    const formData = new FormData();
    data.map((concept, key) => {
      if (concept.evidence_path && typeof concept.evidence_path !== 'string') {
        formData.append('evidence_path[' + key + ']', concept.evidence_path);
        delete concept.evidence_path;
      } else {
        delete concept.evidence_path;
      }
    });

    formData.append('data', JSON.stringify(data));

    try {
      const response = await this.eventConceptBS.SaveExecuteArray(formData);

      this.toastrService.success('', response.message);

      this.refreshConcepts();
    } catch (e) {
      this.toastrService.danger('', e);
    }
  }

  refreshConcepts() {
    this.eventsDayConcept.forEach(component => {
      component.refreshData();
    });

    this.eventsDaySpecial.refreshData();
  }

  get totalPresupuestadoPorDia() {
    if (!this.eventsDayConcept) return 0;

    let total = 0;
    this.eventsDayConcept.forEach(component => {
      total += component.totalPresupuestado;
    });

    return total;
  }

  get totalEjecutadoPorDia() {
    if (!this.eventsDayConcept) return 0;

    let total = 0;
    this.eventsDayConcept.forEach(component => {
      total += component.totalEjecutado;
    });

    return total;
  }

  get totalExtras() {
    if (!this.eventsExtras) return 0;

    return this.eventsExtras.total;
  }

  get totalPresupuestado() {
    return this.totalPresupuestadoPorDia + this.totalPresupuestadoSpecial;
  }

  get totalEjecutado() {
    return this.totalEjecutadoPorDia + this.totalEjecutadoSpecial + this.totalExtras;
  }

  get totalPresupuestadoSpecial() {
    if (!this.eventsDaySpecial) return 0;
    return this.eventsDaySpecial.totalPresupuestado;
  }

  get totalEjecutadoSpecial() {
    if (!this.eventsDaySpecial) return 0;
    return this.eventsDaySpecial.totalEjecutado;
  }

  setData(data) {
    this.data = data;
  }

  get isClose() {
    return this.data ? this.data.is_close : false;
  }
}
