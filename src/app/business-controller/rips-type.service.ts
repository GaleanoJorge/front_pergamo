import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { RipsType } from '../models/rips-type';

@Injectable({
  providedIn: 'root'
})
export class RipsTypeService {
  public rips_type: RipsType[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<RipsType[]> {
    let servObj = new ServiceObject(params ? 'rips_type?pagination=false' : 'rips_type');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.rips_type = <RipsType[]>servObj.data.rips_type;

        return Promise.resolve(this.rips_type);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(rips_type: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('rips_type');
    servObj.data = rips_type;
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

  Update(rips_type: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('rips_type', rips_type.id);
    servObj.data = rips_type;
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
    let servObj = new ServiceObject('rips_type', id);
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
