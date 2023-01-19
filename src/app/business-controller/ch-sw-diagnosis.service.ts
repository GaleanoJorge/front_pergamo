import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChSwDiagnosis } from '../models/ch-sw-diagnosis';

@Injectable({
  providedIn: 'root'
})
export class ChSwDiagnosisService {
  public ch_sw_diagnosis: ChSwDiagnosis[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChSwDiagnosis[]> {
    let servObj = new ServiceObject(params ? 'ch_sw_diagnosis?pagination=false' : 'ch_sw_diagnosis');
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_sw_diagnosis = <ChSwDiagnosis[]>servObj.data.ch_sw_diagnosis;

        return Promise.resolve(this.ch_sw_diagnosis);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_sw_diagnosis: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_sw_diagnosis');
    servObj.data = ch_sw_diagnosis;
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

  Update(ch_sw_diagnosis: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_sw_diagnosis', ch_sw_diagnosis.id);
    servObj.data = ch_sw_diagnosis;
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
    let servObj = new ServiceObject('ch_sw_diagnosis', id);
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
