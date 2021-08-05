import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryBusinessService } from '../../../../business-controller/category-business.service';

@Component({
  selector: 'ngx-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss'],
})
export class EditCategoryComponent implements OnInit {
  public title = 'Editar programa';
  public loading = true;
  public data = null;
  // public routes = [
  //   {
  //     name: 'Plan de formación',
  //     route: '/pages/educationalconfiguration/origin',
  //   },
  //   {
  //     name: 'Programas',
  //     route: '/pages/educationalconfiguration/origin/' + this.route.snapshot.params.origin_id + '/edit',
  //   },
  //   {
  //     name: 'Editar',
  //     route: this.router.url,
  //   },
  // ];
  public routes = [
    {
      name: 'Programas',
      route: '/pages/educationalconfiguration/category',
    },
    {
      name: 'Editar',
      route: this.router.url,
    },
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryBs: CategoryBusinessService,
  ) {
  }

  ngOnInit(): void {
    this.categoryBs.GetOne(this.route.snapshot.params.id).then(x => {
      this.data = x;
      this.loading = false;
    });
  }

}
