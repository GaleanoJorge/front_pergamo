import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChPhysicalExam } from '../models/ch-physical-exam';

@Injectable({
  providedIn: 'root'
})
export class ChPhysicalExamService {
  public ch_physical_exam: ChPhysicalExam[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChPhysicalExam[]> {
    let servObj = new ServiceObject(params ? 'ch_physical_exam?pagination=false' : 'ch_physical_exam');
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_physical_exam = <ChPhysicalExam[]>servObj.data.ch_physical_exam;

        return Promise.resolve(this.ch_physical_exam);
      })
      .catch(x => {
        throw x.message;
      });
  }

  ByRecord(record,type): Promise<ChPhysicalExam[]> {
    let servObj = new ServiceObject('ch_physical_exam/by_record/'+record+'/'+type+'/?pagination=false');
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_physical_exam = <ChPhysicalExam[]>servObj.data.ch_physical_exam;

        return Promise.resolve(this.ch_physical_exam);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_physical_exam: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_physical_exam');
    servObj.data = ch_physical_exam;
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

  Update(ch_physical_exam: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_physical_exam', ch_physical_exam.id);
    servObj.data = ch_physical_exam;
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
    let servObj = new ServiceObject('ch_physical_exam', id);
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
