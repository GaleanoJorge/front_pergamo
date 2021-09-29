import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Manual } from '../models/manual';

@Injectable({
  providedIn: 'root'
})
export class ManualService {
  public manual: Manual[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<Manual[]> {
    let servObj = new ServiceObject(params ? 'manual?pagination=false' : 'manual');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.manual = <Manual[]>servObj.data.manual;

        return Promise.resolve(this.manual);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(manual: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('manual');
    servObj.data = manual;
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

  Update(manual: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('manual', manual.id);
    servObj.data = manual;
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
    let servObj = new ServiceObject('manual', id);
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
