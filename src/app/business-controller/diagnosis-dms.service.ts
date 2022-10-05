import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { DiagnosisDms } from '../models/diagnosis_dms';

@Injectable({
  providedIn: 'root'
})
export class DiagnosisDmsService {
  public diagnosis_dms: DiagnosisDms[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<DiagnosisDms[]> {
    let servObj = new ServiceObject(params ? 'diagnosis_dms?pagination=false' : 'diagnosis_dms');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.diagnosis_dms = <DiagnosisDms[]>servObj.data.diagnosis_dms;

        return Promise.resolve(this.diagnosis_dms);
      })
      .catch(x => {
        throw x.message;
      });
  }


  Save(diagnosis_dms: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('diagnosis_dms');
    servObj.data = diagnosis_dms;
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

  Update(diagnosis_dms: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('diagnosis_dms', diagnosis_dms.id);
    servObj.data = diagnosis_dms;
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
    let servObj = new ServiceObject('diagnosis_dms', id);
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
