import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ReferenceStatus } from '../models/reference-status';

@Injectable({
  providedIn: 'root'
})
export class ReferenceStatusService {
  public reference_status: ReferenceStatus[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ReferenceStatus[]> {
    let servObj = new ServiceObject(params ? 'reference_status?pagination=false' : 'reference_status');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.reference_status = <ReferenceStatus[]>servObj.data.reference_status;

        return Promise.resolve(this.reference_status);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(reference_status: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('reference_status');
    servObj.data = reference_status;
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

  Update(reference_status: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('reference_status', reference_status.id);
    servObj.data = reference_status;
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
    let servObj = new ServiceObject('reference_status', id);
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
