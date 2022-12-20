import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { Tracing } from 'trace_events';


@Injectable({
  providedIn: 'root'
})
export class TracingService {
  public tracing: Tracing[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<Tracing[]> {
    let servObj = new ServiceObject(params ? 'tracing?pagination=false' : 'tracing');
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.tracing = <Tracing[]>servObj.data.tracing;

        return Promise.resolve(this.tracing);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(tracing: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('tracing');
    servObj.data = tracing;
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

  Update(tracing: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('tracing', tracing.id);
    servObj.data = tracing;
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
    let servObj = new ServiceObject('tracing', id);
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
