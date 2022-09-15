import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChDiagnosis } from '../models/ch-diagnosis';

@Injectable({
  providedIn: 'root'
})
export class ChDiagnosisService {
  public ch_diagnosis: ChDiagnosis[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChDiagnosis[]> {
    let servObj = new ServiceObject(params ? 'ch_diagnosis?pagination=false' : 'ch_diagnosis');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_diagnosis = <ChDiagnosis[]>servObj.data.ch_diagnosis;

        return Promise.resolve(this.ch_diagnosis);
      })
      .catch(x => {
        throw x.message;
      });
  }
  
  getByRecord(params = {}): Promise<ChDiagnosis[]> {
    let servObj = new ServiceObject('ch_diagnosis/by_record/' + params['record_id'] +'/' + params['type_record_id']);

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_diagnosis = <ChDiagnosis[]>servObj.data.ch_diagnosis;

        return Promise.resolve(this.ch_diagnosis);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_diagnosis: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_diagnosis');
    servObj.data = ch_diagnosis;
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

  Update(ch_diagnosis: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_diagnosis', ch_diagnosis.id);
    servObj.data = ch_diagnosis;
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
    let servObj = new ServiceObject('ch_diagnosis', id);
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
