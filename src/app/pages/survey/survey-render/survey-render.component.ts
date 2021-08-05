import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { log } from 'util';
import {SurveyBusinessService} from '../../../business-controller/survey-business.service'

@Component({
  selector: 'ngx-survey-render',
  templateUrl: './survey-render.component.html',
  styleUrls: ['./survey-render.component.scss']
})
export class SurveyRenderComponent implements OnInit {

  public surveyInstance:any = {}
  public UserAsign:any = {}
  public sections:any =  []

  public section = null
  public lastposition = null
  public position = null

  constructor(
    private _route: ActivatedRoute,
    private _serviceSurvey: SurveyBusinessService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this._route.url.subscribe(values => {
      if (values[1]) {
        this.getSurveyInstance(values[1].path)
      }
    });
  }

  async getSurveyInstance(id){
    try {
      let response = await this._serviceSurvey.getID(`user_assig_survey/${id}`)
      this.UserAsign = response
      this.surveyInstance = this.UserAsign['survey_instance']
      this.sections = this.surveyInstance['survey']['sections']
      if(this.sections.length > 0){
        let begin = this.sections.findIndex( m => (this.UserAsign.survey_details.find(item => item.section_id === m.id) === undefined))
        if(begin === -1){
          this.router.navigate(['/pages/survey/summary-surveys/' + id])
        }
        else{
          this.section = this.sections[begin]
          this.position = begin
          this.lastposition = this.sections.length - 1
        }
      }
    } catch (error) {
      console.log('eroror');
    }
  }

  changePosition(evt):void{
    this.sections[this.position] = evt.section
    this.position = evt.position
    this.section = this.sections[this.position]
  }
}
