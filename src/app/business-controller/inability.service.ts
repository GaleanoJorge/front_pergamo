import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Inability } from '../models/inability';

@Injectable({
  providedIn: 'root'
})
export class InabilityService {
  public Inability: Inability[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<Inability[]> {
    let servObj = new ServiceObject(params ? 'inability?pagination=false' : 'inability');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.Inability = <Inability[]>servObj.data.Inability;

        return Promise.resolve(this.Inability);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(Inability: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('inability');
    servObj.data = Inability;
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

  Update(Inability: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('inability', Inability.id);
    servObj.data = Inability;
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
    let servObj = new ServiceObject('inability', id);
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
