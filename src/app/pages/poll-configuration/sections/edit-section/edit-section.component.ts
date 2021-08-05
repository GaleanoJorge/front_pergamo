import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SectionService} from '../../../../business-controller/section.service';

@Component({
  selector: 'ngx-edit-section',
  templateUrl: './edit-section.component.html',
  styleUrls: ['./edit-section.component.scss'],
})
export class EditSectionComponent implements OnInit {
  public title = 'Editar sección';

  public routes = [
    {
      name: 'Secciones',
      route: '/pages/pollconfiguration/sections',
    },
    {
      name: 'Editar',
      route: this.router.url,
    },
  ];

  public loading = true;
  public data = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private section: SectionService,
  ) {
  }

  ngOnInit(): void {
    this.section.GetOne(this.route.snapshot.params.id).then(x => {
      this.data = x;
      this.loading = false;
    });
  }

}
