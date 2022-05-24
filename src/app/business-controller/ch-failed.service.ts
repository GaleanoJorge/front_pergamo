import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChFailed } from '../models/ch-failed';

@Injectable({
  providedIn: 'root'
})
export class ChFailedService {
  public ch_failed: ChFailed[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChFailed[]> {
    let servObj = new ServiceObject(params ? 'ch_failed?pagination=false' : 'ch_failed');
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_failed = <ChFailed[]>servObj.data.ch_failed;

        return Promise.resolve(this.ch_failed);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_failed: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_failed');
    servObj.data = ch_failed;
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

  Update(ch_failed: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_failed', ch_failed.id);
    servObj.data = ch_failed;
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
    let servObj = new ServiceObject('ch_failed', id);
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
