import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChDiagnosisClass } from '../models/ch-diagnosis-class';

@Injectable({
  providedIn: 'root'
})
export class ChDiagnosisClassService {
  public ch_diagnosis_class: ChDiagnosisClass[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChDiagnosisClass[]> {
    let servObj = new ServiceObject(params ? 'ch_diagnosis_class?pagination=false' : 'ch_diagnosis_class');
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_diagnosis_class = <ChDiagnosisClass[]>servObj.data.ch_diagnosis_class;

        return Promise.resolve(this.ch_diagnosis_class);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_diagnosis_class: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_diagnosis_class');
    servObj.data = ch_diagnosis_class;
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

  Update(ch_diagnosis_class: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_diagnosis_class', ch_diagnosis_class.id);
    servObj.data = ch_diagnosis_class;
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
    let servObj = new ServiceObject('ch_diagnosis_class', id);
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
