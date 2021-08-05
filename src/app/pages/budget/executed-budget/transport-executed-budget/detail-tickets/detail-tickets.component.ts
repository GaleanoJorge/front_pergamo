import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {EventConceptBusinessService} from '../../../../../business-controller/event-concept-business.service';
import {UserBusinessService} from '../../../../../business-controller/user-business.service';
import {EventsTicketsBusiness} from '../../../../../business-controller/events-tickets-business';
import {NbToastrService} from '@nebular/theme';

@Component({
  selector: 'ngx-detail-tickets',
  templateUrl: './detail-tickets.component.html',
  styleUrls: ['./detail-tickets.component.scss'],
})
export class DetailTicketsComponent implements OnInit {
  title = 'Detalle de tiquetes';
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
      name: 'Detalle de tiquetes',
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
      // stage: 'project',
      concept_type_id: this.eventConcept.DEFAULT_CONCEPT_TRANSPORTE,
    }).then(x => {
      this.concepts = x;
    });
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

      const response = await this.eventsTicketBS.SaveBuyTickets({data});

      this.toastService.success(null, response.message);
    } catch (e) {
      this.toastService.danger(null, e.message);
    }
  }

  setData(data) {
    this.data = data;
  }

  get isClose() {
    return this.data ? this.data.is_close : false;
  }

}
