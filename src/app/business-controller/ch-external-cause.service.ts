import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChExternalCause } from '../models/ch-external-cause';

@Injectable({
  providedIn: 'root'
})
export class ChExternalCauseService {
  public ch_external_cause: ChExternalCause[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChExternalCause[]> {
    let servObj = new ServiceObject(params ? 'ch_external_cause?pagination=false' : 'ch_external_cause');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_external_cause = <ChExternalCause[]>servObj.data.ch_external_cause;

        return Promise.resolve(this.ch_external_cause);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_external_cause: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_external_cause');
    servObj.data = ch_external_cause;
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

  Update(ch_external_cause: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_external_cause', ch_external_cause.id);
    servObj.data = ch_external_cause;
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
    let servObj = new ServiceObject('ch_external_cause', id);
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
