import {AnswerQuestion} from '../models/answer-question';
import {ServiceObject} from '../models/service-object';
import {WebAPIService} from '../services/web-api.service';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnswerQuestionService {
  public answerT: AnswerQuestion[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(): Promise<AnswerQuestion[]> {
    let servObj = new ServiceObject('answersQuestion');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);


        this.answerT = <AnswerQuestion[]>servObj.data.answers;

        return Promise.resolve(this.answerT);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ans: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('answersQuestion');
    servObj.data = ans;
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

  Update(ans: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('answersQuestion', ans.id);
    servObj.data = ans;
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
    let servObj = new ServiceObject('answersQuestion', id);
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
  Up(ans: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('answersQuestion', ans.id);
    servObj.data = ans;
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
  Down(ans: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('answersQuestion', ans.id);
    servObj.data = ans;
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
  ChangeOrder(id, direction) {
    let servObj = new ServiceObject(`answersQuestion/${id}/move/${direction}`);
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
