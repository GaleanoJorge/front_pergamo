import {Component, OnInit} from '@angular/core';
import {SurveyBusinessService} from '../../../business-controller/survey-business.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'ngx-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit {
  public messageError: string = null;
  public title = 'Estadisticas';

  public routes = [
    /*{
      name: 'Estadisticas',
      route: '/pages/survey/surveys',
    },*/
  ];

  public sections = [];

  public dataGraphic = [];

  constructor(
    private surveyBS: SurveyBusinessService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    const survey_id = this.route.snapshot.queryParams.survey_id;
    const survey_instance_id = this.route.snapshot.queryParams.survey_instance_id;
    const params: any = {};

    if (survey_id) params.survey_id = survey_id;
    if (survey_instance_id) params.survey_instance_id = survey_instance_id;

    this.surveyBS.PieStatistics(params).then(x => {
      this.sections = x;
    });
  }

}
