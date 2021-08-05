import {Component, OnInit} from '@angular/core';
import {SurveyBusinessService} from '../../../../business-controller/survey-business.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'ngx-create-scheduled-surveys',
  templateUrl: './create-scheduled-surveys.component.html',
  styleUrls: ['./create-scheduled-surveys.component.scss'],
})
export class CreateScheduledSurveysComponent implements OnInit {
  public title = 'Programar encuesta';
  public subtitle = null;
  public survey = null;
  public survey_id = null;
  public routes = null;
  public messageError = null;
  public routeBack = null;

  constructor(
    private surveyBS: SurveyBusinessService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.survey_id = this.route.snapshot.params.survey_id;
    this.surveyBS.GetOne(this.survey_id).then(x => {
      this.survey = x;
      this.subtitle = 'Encuesta: ' + x.name;

      this.routes = [
        {
          name: 'Plantillas',
          route: '/pages/survey/surveys',
        },
        {
          name: 'Encuestas programadas ' + this.survey.name,
          route: '/pages/survey/surveys/' + this.survey_id + '/scheduled-surveys',
        },
        {
          name: 'Crear',
          route: this.router.url,
        },
      ];
    });

    this.routeBack = '/pages/survey/surveys/' + this.survey_id + '/scheduled-surveys';
  }

}
