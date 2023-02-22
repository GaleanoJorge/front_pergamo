import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { TcServiceLevel } from '../models/tc-service-level';


@Injectable({
  providedIn: 'root'
})
export class TcServiceLevelService {
  public service_level_tc: TcServiceLevel[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<TcServiceLevel[]> {
    let servObj = new ServiceObject(params ? 'service_level_tc?pagination=false' : 'service_level_tc');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.service_level_tc = <TcServiceLevel[]>servObj.data.service_level_tc;

        return Promise.resolve(this.service_level_tc);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(service_level_tc: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('service_level_tc');
    servObj.data = service_level_tc;
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

  Update(service_level_tc: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('service_level_tc', service_level_tc.id);
    servObj.data = service_level_tc;
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
    let servObj = new ServiceObject('service_level_tc', id);
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

  SaveFile(service_level_tc: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('service_level_tc/file');
    servObj.data = service_level_tc;
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
}
