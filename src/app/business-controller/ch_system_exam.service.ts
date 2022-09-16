import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChSystemExam } from '../models/ch-system-exam';

@Injectable({
  providedIn: 'root'
})
export class ChSystemExamService {
  public ch_system_exam: ChSystemExam[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChSystemExam[]> {
    let servObj = new ServiceObject(params ? 'ch_system_exam?pagination=false' : 'ch_system_exam');
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_system_exam = <ChSystemExam[]>servObj.data.ch_system_exam;

        return Promise.resolve(this.ch_system_exam);
      })
      .catch(x => {
        throw x.message;
      });
  }

  ByRecord(record,type): Promise<ChSystemExam[]> {
    let servObj = new ServiceObject('ch_system_exam/by_record/'+record+'/'+type+'?pagination=false');
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_system_exam = <ChSystemExam[]>servObj.data.ch_background;

        return Promise.resolve(this.ch_system_exam);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_system_exam: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_system_exam');
    servObj.data = ch_system_exam;
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

  Update(ch_system_exam: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_system_exam', ch_system_exam.id);
    servObj.data = ch_system_exam;
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
    let servObj = new ServiceObject('ch_system_exam', id);
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
