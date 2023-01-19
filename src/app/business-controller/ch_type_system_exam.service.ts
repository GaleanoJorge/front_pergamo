import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { TypeChSystemExam } from '../models/ch-type-ch-system-exam';

@Injectable({
  providedIn: 'root'
})
export class ChTypeSystemExamService {
  public type_ch_system_exam: TypeChSystemExam[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<TypeChSystemExam[]> {
    let servObj = new ServiceObject(params ? 'type_ch_system_exam?pagination=false' : 'type_ch_system_exam');
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.type_ch_system_exam = <TypeChSystemExam[]>servObj.data.type_ch_system_exam;

        return Promise.resolve(this.type_ch_system_exam);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(type_ch_system_exam: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('type_ch_system_exam');
    servObj.data = type_ch_system_exam;
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

  Update(type_ch_system_exam: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('type_ch_system_exam', type_ch_system_exam.id);
    servObj.data = type_ch_system_exam;
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
    let servObj = new ServiceObject('type_ch_system_exam', id);
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
