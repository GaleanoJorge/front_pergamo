import {Component, OnInit} from '@angular/core';
import {SurveyScheduledBusinessService} from '../../../../business-controller/survey-scheduled-business.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SurveyBusinessService} from '../../../../business-controller/survey-business.service';

@Component({
  selector: 'ngx-edit-scheduled-surveys',
  templateUrl: './edit-scheduled-surveys.component.html',
  styleUrls: ['./edit-scheduled-surveys.component.scss'],
})
export class EditScheduledSurveysComponent implements OnInit {
  public title = 'Programar encuesta';
  public subtitle = null;
  public loading = true;
  public data = null;
  public routes = null;
  public routeBack = null;
  public messageError = null;
  public survey_id = null;
  public scheduled_id = null;
  public survey = null;

  constructor(
    private surveyScheduledBS: SurveyScheduledBusinessService,
    private route: ActivatedRoute,
    private router: Router,
    private surveyBS: SurveyBusinessService,
  ) {
  }

  ngOnInit(): void {
    this.survey_id = this.route.snapshot.params.survey_id;
    this.scheduled_id = this.route.snapshot.params.id;

    if (this.survey_id) {
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
            name: 'Editar',
            route: this.router.url,
          },
        ];
      });
      this.routeBack = '/pages/survey/surveys/' + this.survey_id + '/scheduled-surveys';
    } else {
      this.routeBack = '/pages/survey/scheduled-surveys';
    }

    this.surveyScheduledBS.GetOne(this.scheduled_id).then(x => {
      this.data = x.surveyInstance[0];
      this.data.disableParticipantes = x.initSurveys > 0 ? true : false;
      this.loading = false;
    });
  }

}
