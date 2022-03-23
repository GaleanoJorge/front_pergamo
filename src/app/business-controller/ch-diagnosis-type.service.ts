import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChDiagnosisType } from '../models/ch-diagnosis-type';

@Injectable({
  providedIn: 'root'
})
export class ChDiagnosisTypeService {
  public ch_diagnosis_type: ChDiagnosisType[] = [];

  constructor(private webAPI: WebAPIService) {
    2
  }

  GetCollection(params = {}): Promise<ChDiagnosisType[]> {
    let servObj = new ServiceObject(params ? 'ch_diagnosis_type?pagination=false' : 'ch_diagnosis_type');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_diagnosis_type = <ChDiagnosisType[]>servObj.data.ch_diagnosis_type;

        return Promise.resolve(this.ch_diagnosis_type);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_diagnosis_type: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_diagnosis_type');
    servObj.data = ch_diagnosis_type;
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

  Update(ch_diagnosis_type: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_diagnosis_type', ch_diagnosis_type.id);
    servObj.data = ch_diagnosis_type;
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
    let servObj = new ServiceObject('ch_diagnosis_type', id);
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
