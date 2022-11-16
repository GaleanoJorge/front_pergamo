import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ReasonCancel } from '../models/reason-cancel';

@Injectable({
  providedIn: 'root'
})
export class ReasonCancelService {
  public reason_cancel: ReasonCancel[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ReasonCancel[]> {
    let servObj = new ServiceObject(params ? 'reason_cancel?pagination=false' : 'reason_cancel');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.reason_cancel = <ReasonCancel[]>servObj.data.reason_cancel;

        return Promise.resolve(this.reason_cancel);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(reason_cancel: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('reason_cancel');
    servObj.data = reason_cancel;
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

  ChangeStatus(id, status_id): Promise<any> {
    let servObj = new ServiceObject(`reason_cancel/${id}/changeStatus?status_id=${status_id}`);

    return this.webAPI.PatchAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;

        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(<any>servObj);
      }).catch(x => {
        throw x.message;
      });
  }

  Update(reason_cancel: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('reason_cancel', reason_cancel.id);
    servObj.data = reason_cancel;
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
    let servObj = new ServiceObject('reason_cancel', id);
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
