import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SurveyBusinessService} from '../../../../business-controller/survey-business.service';

@Component({
  selector: 'ngx-edit-surveys',
  templateUrl: './edit-surveys.component.html',
  styleUrls: ['./edit-surveys.component.scss'],
})
export class EditSurveysComponent implements OnInit {
  public title = 'Editar Plantilla';
  public routes = [
    {
      name: 'Plantillas',
      route: '/pages/survey/surveys',
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
    private surveyBS: SurveyBusinessService,
  ) {
  }

  ngOnInit(): void {
    this.surveyBS.GetOne(this.route.snapshot.params.id).then(x => {
      this.data = x;
      this.loading = false;
    }).catch(x => {
    });
  }

}
