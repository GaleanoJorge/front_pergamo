import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ngx-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss'],
})
export class CreateCategoryComponent implements OnInit {

  public title = 'Crear programa';
  public routes = [];
  public routeBack: string = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    if (this.route.snapshot.params.origin_id)
      this.routes = [
        {
          name: 'Plan de formación',
          route: '/pages/educationalconfiguration/origin',
        },
        {
          name: 'Programas',
          route: '/pages/educationalconfiguration/origin/' + this.route.snapshot.params.origin_id + '/edit',
        },
        {
          name: 'Crear',
          route: this.router.url,
        },
      ];
    else {
      this.routeBack = '../';
      this.routes = [
        {
          name: 'Programas',
          route: '/pages/educationalconfiguration/category',
        },
        {
          name: 'Crear',
          route: this.router.url,
        },
      ];
    }
  }

}
