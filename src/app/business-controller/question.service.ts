import {Injectable} from '@angular/core';
import {WebAPIService} from '../services/web-api.service';
import {ServiceObject} from '../models/service-object';
import {Question} from '../models/question';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  public questions: Question[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(): Promise<Question[]> {
    let servObj = new ServiceObject('question');
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.questions = <Question[]>servObj.data.questions.data;
        return Promise.resolve(this.questions);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ques: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('question');
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
    let servObj = new ServiceObject('question', ques.id);
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
    let servObj = new ServiceObject('question', id);
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

  GetById(ques: number): Promise<Question[]> {
    let servObj = new ServiceObject('question', ques);

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.questions = <Question[]>servObj.data.question[0];
        return Promise.resolve(this.questions);
      })
      .catch(x => {
        throw x.message;
      });
  }

  ChangeOrder(id, direction) {
    let servObj = new ServiceObject(`question/${id}/move/${direction}`);
    return this.webAPI.PutAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(servObj);
      })
      .catch(x => {
        throw x;
      });
  }
}
