import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { TypeChPhysicalExam } from '../models/ch-type-ch-physical-exam';

@Injectable({
  providedIn: 'root'
})
export class ChTypePhysicalExamService {
  public type_ch_physical_exam: TypeChPhysicalExam[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<TypeChPhysicalExam[]> {
    let servObj = new ServiceObject(params ? 'type_ch_physical_exam?pagination=false' : 'type_ch_physical_exam');
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.type_ch_physical_exam = <TypeChPhysicalExam[]>servObj.data.type_ch_physical_exam;

        return Promise.resolve(this.type_ch_physical_exam);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(type_ch_physical_exam: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('type_ch_physical_exam');
    servObj.data = type_ch_physical_exam;
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

  Update(type_ch_physical_exam: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('type_ch_physical_exam', type_ch_physical_exam.id);
    servObj.data = type_ch_physical_exam;
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
    let servObj = new ServiceObject('type_ch_physical_exam', id);
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
