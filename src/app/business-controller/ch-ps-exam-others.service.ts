import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChPsExamOthers } from '../models/ch-ps-exam-others';

@Injectable({
  providedIn: 'root'
})
export class ChPsExamOthersService {
  public ch_ps_exam_others: ChPsExamOthers[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChPsExamOthers[]> {
    let servObj = new ServiceObject(params ? 'ch_ps_exam_others?pagination=false' : 'ch_ps_exam_others');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_ps_exam_others = <ChPsExamOthers[]>servObj.data.ch_ps_exam_others;

        return Promise.resolve(this.ch_ps_exam_others);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_ps_exam_others: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ps_exam_others');
    servObj.data = ch_ps_exam_others;
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

  Update(ch_ps_exam_others: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ps_exam_others', ch_ps_exam_others.id);
    servObj.data = ch_ps_exam_others;
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
    let servObj = new ServiceObject('ch_ps_exam_others', id);
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
}
