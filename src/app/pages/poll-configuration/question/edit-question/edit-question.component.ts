import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {QuestionService} from '../../../../business-controller/question.service';

@Component({
  selector: 'ngx-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.scss'],
})
export class EditQuestionComponent implements OnInit {
  public title = 'Editar pregunta';
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
      name: 'Editar',
      route: this.router.url,
    },
  ];
  public loading = true;
  public data = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private questionS: QuestionService,
  ) {
  }

  ngOnInit(): void {
    this.questionS.GetById(this.route.snapshot.params.id).then(x => {
      this.data = x;
      this.loading = false;
    });
  }

}
