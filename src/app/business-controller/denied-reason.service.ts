import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { DeniedReason } from '../models/denied-reason';

@Injectable({
  providedIn: 'root'
})
export class DeniedReasonService {
  public denied_reason: DeniedReason[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<DeniedReason[]> {
    let servObj = new ServiceObject(params ? 'denied_reason?pagination=false' : 'denied_reason');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.denied_reason = <DeniedReason[]>servObj.data.denied_reason;

        return Promise.resolve(this.denied_reason);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(denied_reason: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('denied_reason');
    servObj.data = denied_reason;
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

  Update(denied_reason: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('denied_reason', denied_reason.id);
    servObj.data = denied_reason;
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
    let servObj = new ServiceObject('denied_reason', id);
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
