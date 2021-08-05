import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SurveyBusinessService } from '../../../business-controller/survey-business.service';

@Component({
  selector: 'ngx-summary-surveys',
  templateUrl: './summary-surveys.component.html',
  styleUrls: ['./summary-surveys.component.scss']
})
export class SummarySurveysComponent implements OnInit {

  public idSurvey: string;
  public UserAsign: any;
  public surveyInstance: any = null;
  public sections: any = null;
  public ids: any;
  public logged: Boolean = localStorage.getItem('access_token') !== null

  constructor(
    private _route: ActivatedRoute,
    private router: Router,
    private _serviceSurvey: SurveyBusinessService,
  ) { }

  ngOnInit(): void {
    this._route.url.subscribe(values => {
      this.idSurvey = values[1].path;
      this.getSurvey()
    });
  }

  back() {
    this.router.navigate(['/pages/survey/my-surveys'])
  }

  async getSurvey() {
      try {
        let response = await this._serviceSurvey.getID(`user_assig_survey/${this.idSurvey}`)
        this.UserAsign = response
        this.surveyInstance = this.UserAsign['survey_instance']
        this.sections = this.surveyInstance['survey']['sections']
        let ids = {}
        this.UserAsign['survey_details'].forEach(element => {
          let idQs =  element.survey_section_id + '_' + element.question_id;
          if (ids[idQs] === undefined) {
            ids[idQs] = {
              answers: [element.answer_id],
              detail : element.detail
            }
          }
          else{
            ids[idQs] = {
              ...ids[idQs],
              answers: ids[idQs]['answers'].concat([element.answer_id]),
              detail : element.detail
            }
          }
        })
        this.ids = ids
      } catch (error) {
        console.log('eroror');
      }
  }
}
