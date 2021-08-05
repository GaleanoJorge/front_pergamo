import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {EventBusinessService} from '../../../../business-controller/event-business.service';

@Component({
  selector: 'ngx-edit-preliminary-budget',
  templateUrl: './edit-preliminary-budget.component.html',
  styleUrls: ['./edit-preliminary-budget.component.scss'],
})
export class EditPreliminaryBudgetComponent implements OnInit {
  public loading = true;
  public title = 'Editar presupuesto preliminar';
  public data = null;

  public routes = [
    {
      name: 'Presupuesto preliminar',
      route: '/pages/budget/preliminary',
    },
    {
      name: 'Editar',
      route: this.router.url,
    },
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private eventBS: EventBusinessService,
  ) {
  }

  ngOnInit(): void {
    this.eventBS.GetOne(this.route.snapshot.params.id).then(x => {
      this.data = x;
      this.loading = false;
    });
  }

}
