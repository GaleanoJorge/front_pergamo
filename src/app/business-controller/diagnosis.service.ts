import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Diagnosis } from '../models/diagnosis';

@Injectable({
  providedIn: 'root'
})
export class DiagnosisService {
  public diagnosis: Diagnosis[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<Diagnosis[]> {
    let servObj = new ServiceObject(params ? 'diagnosis?pagination=false' : 'diagnosis');
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.diagnosis = <Diagnosis[]>servObj.data.diagnosis;

        return Promise.resolve(this.diagnosis);
      })
      .catch(x => {
        throw x.message;
      });
  }


  Save(diagnosis: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('diagnosis');
    servObj.data = diagnosis;
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

  Update(diagnosis: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('diagnosis', diagnosis.id);
    servObj.data = diagnosis;
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
    let servObj = new ServiceObject('diagnosis', id);
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
