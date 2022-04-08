import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChExamGynecologists } from '../models/ch-exam-gynecologists';

@Injectable({
  providedIn: 'root'
})
export class ChExamGynecologistsService {
  public ch_exam_gynecologists: ChExamGynecologists[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChExamGynecologists[]> {
    let servObj = new ServiceObject(params ? 'ch_exam_gynecologists?pagination=false' : 'ch_exam_gynecologists');
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_exam_gynecologists = <ChExamGynecologists[]>servObj.data.ch_exam_gynecologists;

        return Promise.resolve(this.ch_exam_gynecologists);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_exam_gynecologists: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_exam_gynecologists');
    servObj.data = ch_exam_gynecologists;
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

  Update(ch_exam_gynecologists: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_exam_gynecologists', ch_exam_gynecologists.id);
    servObj.data = ch_exam_gynecologists;
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
    let servObj = new ServiceObject('ch_exam_gynecologists', id);
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
