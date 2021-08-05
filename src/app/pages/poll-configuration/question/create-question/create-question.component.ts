import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'ngx-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.scss'],
})
export class CreateQuestionComponent implements OnInit {
  public title = 'Crear pregunta';
  public routes = [
    {
      name: 'Secciones',
      route: '/pages/pollconfiguration/sections',
    },
    {
      name: 'Preguntas',
      route: '/pages/pollconfiguration/sections/' + this.route.snapshot.params.section_id + '/edit',
    },
    {
      name: 'Crear',
      route: this.router.url,
    },
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
  }

}
