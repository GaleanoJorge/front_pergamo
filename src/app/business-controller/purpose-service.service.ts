import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { PurposeService } from '../models/purpose-service';

@Injectable({
  providedIn: 'root'
})
export class PurposeServiceService {
  public purpose_service: PurposeService[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<PurposeService[]> {
    let servObj = new ServiceObject(params ? 'purpose_service?pagination=false' : 'purpose_service');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.purpose_service = <PurposeService[]>servObj.data.purpose_service;

        return Promise.resolve(this.purpose_service);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(purpose_service: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('purpose_service');
    servObj.data = purpose_service;
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

  Update(purpose_service: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('purpose_service', purpose_service.id);
    servObj.data = purpose_service;
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
    let servObj = new ServiceObject('purpose_service', id);
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
