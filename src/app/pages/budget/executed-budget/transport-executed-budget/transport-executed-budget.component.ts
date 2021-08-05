import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {EventConceptBusinessService} from '../../../../business-controller/event-concept-business.service';
import {UserBusinessService} from '../../../../business-controller/user-business.service';
import {EventsTicketsBusiness} from '../../../../business-controller/events-tickets-business';
import {NbToastrService} from '@nebular/theme';
@Component({
  selector: 'ngx-transport-executed-budget',
  templateUrl: './transport-executed-budget.component.html',
  styleUrls: ['./transport-executed-budget.component.scss'],
})
export class TransportExecutedBudgetComponent implements OnInit {
  title = 'Requerir tiquetes';
  messageError = null;
  routeBack = '/pages/budget/executed/list';
  loading = true;
  event_id = null;
  data = null;

  routes = [
    {
      name: 'Presupuesto ejecutado',
      route: '/pages/budget/executed/list',
    },
    {
      name: 'Requerir tiquetes',
      route: this.router.url,
    },
  ];

  concepts = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private eventConcept: EventConceptBusinessService,
    private usersBS: UserBusinessService,
    private eventsTicketBS: EventsTicketsBusiness,
    private toastService: NbToastrService,
  ) {
  }

  ngOnInit(): void {
    this.event_id = this.route.snapshot.params.id;
    this.eventConcept.GetCollection({
      pagination: false,
      event_id: this.event_id,
      stage: 'project',
      concept_type_id: this.eventConcept.DEFAULT_CONCEPT_TRANSPORTE,
    }).then(x => {
      this.concepts = x;
      this.concepts.map((concept) => {
        const limit = !concept.event_tickets.length ?
          concept.planned_quantity * 1 : ((concept.planned_quantity * 1) - concept.event_tickets.length);
        for (let i = 0; i < limit; i++) {
          concept.event_tickets.push({
            id: null,
            event_concept_id: concept.id,
            passenger_user_id: null,
            origin: concept.concept.concept_base.origin,
            destination: concept.concept.concept_base.destination,
            back: concept.concept.concept_base.back,
            departure_date: null,
            return_date: null,
            departure_observations: null,
            return_observations: null,
          });
        }
      });
    });
  }

  setData(data) {
    this.data = data;
  }

  get isClose() {
    return this.data ? this.data.is_close : false;
  }

  async Save() {
    try {
      let data = [];

      this.concepts.map(concept => {
        data = [
          ...data,
          ...JSON.parse(JSON.stringify(concept.event_tickets)),
        ];
      });

      data.map((ticket) => {
        if (ticket.passenger_user_id) {
          ticket.passenger_user_id = ticket.passenger_user_id.id;
        }
      });

      const response = await this.eventsTicketBS.SaveExecuteArray({data});

      this.toastService.success(null, response.message);

      window.location.reload();
    } catch (e) {
      this.toastService.danger(null, e.message);
    }
  }

  renderLabelUsers(data) {
    return data.nombre_completo;
  }

  async searchUser(value) {
    return await this.usersBS.GetUserById(value);
  }
}
