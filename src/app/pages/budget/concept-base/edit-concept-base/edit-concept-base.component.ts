import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ConceptBaseBusinessService} from '../../../../business-controller/concept-base-business.service';

@Component({
  selector: 'ngx-edit-concept-base',
  templateUrl: './edit-concept-base.component.html',
  styleUrls: ['./edit-concept-base.component.scss'],
})
export class EditConceptBaseComponent implements OnInit {
  public title = 'Editar concepto';

  public routes = [
    {
      name: 'Conceptos',
      route: '/pages/budget/concepts',
    },
    {
      name: 'Editar',
      route: this.url,
    },
  ];

  public data = null;
  public loading = true;

  constructor(
    private route: ActivatedRoute,
    private conceptBaseBS: ConceptBaseBusinessService,
  ) {
  }

  ngOnInit(): void {
    this.conceptBaseBS.GetOne(this.route.snapshot.params.id).then(x => {
      this.data = x;
      this.loading = false;
    });
  }

  get url() {
    return '/pages/budget/concepts/' + this.route.snapshot.params.id + '/edit';
  }

}
