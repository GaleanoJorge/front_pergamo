import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { log } from 'console';
import {SurveyBusinessService} from '../../../business-controller/survey-business.service'
@Component({
  selector: 'ngx-sections-base',
  templateUrl: './sections-base.component.html',
  styleUrls: ['./sections-base.component.scss']
})
export class SectionsBaseComponent implements OnInit {

  @Input() public section:any
  @Input() public position:any
  @Input() public lastposition:any
  @Input() public userAsign:any
  @Output() changePosition = new EventEmitter<any>();
  public questionAnswer:any = {}
  public alert:any = {
    text:"",
    show:false
  }
  public logged: Boolean = localStorage.getItem('access_token') !== null
  public loading: Boolean;

  constructor(
    private router: Router,
    private _serviceSurvey: SurveyBusinessService,
  ) {}

  ngOnInit(): void {
  }

  clickAnswer(qs,ans){
    this.questionAnswer[qs] = {
      answer_id:ans
    }
  }

  changeAnswer(qs,evt,mode){
    switch (mode) {
      case 'multiple':
        if (evt) {
          let answers
          if(this.questionAnswer[qs.question] === undefined){
            answers = []
          }
          else{
            answers = this.questionAnswer[qs.question]['answers']
          }
          answers = answers.concat([qs.answer])
          this.questionAnswer[qs.question] = {
            answers:answers
          }
        }
        else {
          this.questionAnswer[qs.question] = {
            ...this.questionAnswer[qs.question],
            answers:this.questionAnswer[qs.question]['answers'].filter( m => m !== qs.answer)
          }
        }
        break;
      case "text":
      case "simple":
      default:
        this.questionAnswer = {
          ...this.questionAnswer,
          [qs]:{[mode === 'text' ? 'detail' : 'answer_id']:evt.target.value}
        }
      break;
    }
  }

  async updateSurvey(pos,finish) {
    if(this.validatedSurvey()){
      try {
        // Logic for selection multiple survey
        let keys = Object.keys(this.questionAnswer)
        let forPromise = []
        for (let index = 0; index < keys.length; index++) {
          const element = this.questionAnswer[keys[index]];
          if(element.answers === undefined){
            forPromise.push(
              {
                user_assign_survey_id:this.userAsign,
                detail: element.detail === undefined ? '' : element.detail,
                section_id: this.section.id,
                survey_section_id: this.section.pivot.id,
                question_id:keys[index],
                answer_id: element.answer_id === undefined ? null :
                  element.answer_id
              }
            )
          }
          else{
            for (let j = 0; j < element.answers.length; j++) {
              forPromise.push(
                {
                  user_assign_survey_id:this.userAsign,
                  detail: '',
                  section_id: this.section.id,
                  survey_section_id: this.section.pivot.id,
                  question_id:keys[index],
                  answer_id:element.answers[j]
                }
              )
            }
          }
        }
        // Logic for details for others survey
        this.loading = true
        await Promise.all(forPromise.map(m => (
          this._serviceSurvey.postDetail(m)
        )))
        this.alert = {
          text:"",
          show:false
        }
        if(finish !== undefined && finish){
          if (!this.logged) {
            this.router.navigate(['/pages/survey/summary-surveys/' + location.pathname.replace('/pages/survey/surveys/','')])
          }
          else {
            this.router.navigate(['/pages/survey/my-surveys'])
          }
        }
        else {
          this.changePosition.emit({
            position:pos,
            section:this.section
          })
          this.questionAnswer = {}
        }
      } catch (error) {
        console.log('error');
      }
      finally {
        this.loading = false
      }
    }
  }

  validatedSurvey() {
    // Validation survey type
    // Is matriz
    if(this.section.is_matriz === true){
      if(this.section.questions.length === Object.keys(this.questionAnswer).length){
        return true
      }
      else{
        this.alert = {
          show:true,
          text: "¡Debes Responder todas las preguntas!"
        }
        return false
      }
    }
    else{
      let msg = "<p style='color: white !important;font-weight:bold;'>Algunas preguntas faltan por responder</p><ul>"
      let leftAnswers = false
      for (let index = 0; index < this.section.questions.length; index++) {
        const element = this.section.questions[index];
        switch(element.question_type_id){
          case 2:
            if(this.questionAnswer[element.id] === undefined ||
              (this.questionAnswer[element.id] !== undefined
                && this.questionAnswer[element.id]['answers'] !== undefined
                && this.questionAnswer[element.id]['answers'].length === 0
              )
            ){
              leftAnswers = true
              msg += `<li style='color: white !important;font-weight:bold;'>${element.name} debe tener al menos una respuesta</li>`
            }
            break
          case 3:
            break
          case 1:
          default:
            if(this.questionAnswer[element.id] === undefined){
              leftAnswers = true
              msg += `<li style='color: white !important;font-weight:bold;'>${element.name}</li>`
            }
            break
        }
      }
      if(leftAnswers){
        msg += "</ul>"
        this.alert = {
          show:true,
          text: msg
        }
        return false
      }
      return true
    }

  }

  back() {
    this.router.navigate(['/pages/survey/my-surveys'])
  }
}
