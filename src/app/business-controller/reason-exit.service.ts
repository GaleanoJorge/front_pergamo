import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ReasonExit } from '../models/reason-exit';

@Injectable({
  providedIn: 'root'
})
export class ChReasonService {
  public reason_exit: ReasonExit[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ReasonExit[]> {
    let servObj = new ServiceObject(params ? 'reason_exit?pagination=false' : 'reason_exit');
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.reason_exit = <ReasonExit[]>servObj.data.reason_exit;

        return Promise.resolve(this.reason_exit);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(reason_exit: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('reason_exit');
    servObj.data = reason_exit;
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

  Update(reason_exit: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('reason_exit', reason_exit.id);
    servObj.data = reason_exit;
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
    let servObj = new ServiceObject('reason_exit', id);
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
