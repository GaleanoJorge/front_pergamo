import { Injectable } from '@angular/core';
import { WebAPIService } from '../services/web-api.service';
import { ServiceObject } from '../models/service-object';
import { HttpParams } from '@angular/common/http';
import { QuestionType } from '../models/question-type';

@Injectable({
  providedIn: 'root'
})
export class QuestionTypeService {
  public questions: QuestionType[] = [];

  constructor(private webAPI: WebAPIService) { }

  GetCollection(): Promise<QuestionType[]> {
    var servObj = new ServiceObject("questionType");
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.questions = <QuestionType[]>servObj.data.questionTypes;
        return Promise.resolve(this.questions);
      })
      .catch(x => {
        throw x.message;
      });
  }
  Save(ques: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('questionType');
    servObj.data = ques;
    return this.webAPI.PostAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(servObj);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Update(ques: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('questionType', ques.id);
    servObj.data = ques;
    return this.webAPI.PutAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(servObj);
      })
      .catch(x => {
        throw x.message;
      });
  }
  Delete(id): Promise<ServiceObject> {
    let servObj = new ServiceObject('questionType', id);
    return this.webAPI.DeleteAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(servObj);
      })
      .catch(x => {
        throw x.message;
      });
  }
  GetById(ques: number): Promise<QuestionType[]> {
    let servObj = new ServiceObject('questionType', ques);
    
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.questions = <QuestionType[]>servObj.data.question[0];
        return Promise.resolve(this.questions);
      })
      .catch(x => {
        throw x.message;
      });
  }
}
