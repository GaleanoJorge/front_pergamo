import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {OriginBusinessService} from '../../../../business-controller/origin-business.service';

@Component({
  selector: 'ngx-edit-origin',
  templateUrl: './edit-origin.component.html',
  styleUrls: ['./edit-origin.component.scss'],
})
export class EditOriginComponent implements OnInit {
  public title = 'Editar plan de formación';
  public loading = true;
  public data = null;
  public routes = [
    {
      name: 'Plan de formación',
      route: '/pages/educationalconfiguration/origin',
    },
    {
      name: 'Editar',
      route: this.router.url,
    },
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private originBs: OriginBusinessService,
  ) {
  }

  ngOnInit(): void {
    this.originBs.GetOriginId(this.route.snapshot.params.id).then(x => {
      this.data = x;
      this.loading = false;
    });
  }

}
