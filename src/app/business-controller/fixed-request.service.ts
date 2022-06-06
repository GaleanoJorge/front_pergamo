import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { FixedRequest } from '../models/fixed-request';

@Injectable({
  providedIn: 'root'
})
export class FixedRequestService {
  public fixed_request: FixedRequest[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<FixedRequest[]> {
    let servObj = new ServiceObject(params ? 'fixed_request?pagination=false' : 'fixed_request');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.fixed_request = <FixedRequest[]>servObj.data.fixed_request;

        return Promise.resolve(this.fixed_request);
      })
      .catch(x => {
        throw x.message;
      });
  }

  updateInventoryByLot(fixed_request: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('fixed_request/updateInventoryByLot', fixed_request.id);
    servObj.data = fixed_request;
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

  Save(fixed_request: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('fixed_request');
    servObj.data = fixed_request;
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

  Update(fixed_request: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('fixed_request', fixed_request.id);
    servObj.data = fixed_request;
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
    let servObj = new ServiceObject('fixed_request', id);
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
