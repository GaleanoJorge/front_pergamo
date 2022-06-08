import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { InvimaStatus } from '../models/invima-status';

@Injectable({
  providedIn: 'root'
})
export class InvimaStatusService {
  public invima_status: InvimaStatus[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<InvimaStatus[]> {
    let servObj = new ServiceObject(params ? 'invima_status?pagination=false' : 'invima_status');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.invima_status = <InvimaStatus[]>servObj.data.invima_status;

        return Promise.resolve(this.invima_status);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(invima_status: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('invima_status');
    servObj.data = invima_status;
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

  Update(invima_status: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('invima_status', invima_status.id);
    servObj.data = invima_status;
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
    let servObj = new ServiceObject('invima_status', id);
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
