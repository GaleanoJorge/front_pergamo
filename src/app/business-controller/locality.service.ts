import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Locality } from '../models/locality';

@Injectable({
  providedIn: 'root'
})
export class LocalityService {
  public locality: Locality[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<Locality[]> {
    let servObj = new ServiceObject(params ? 'locality?pagination=false' : 'locality');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.locality = <Locality[]>servObj.data.locality;

        return Promise.resolve(this.locality);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(locality: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('locality');
    servObj.data = locality;
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

  Update(locality: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('locality', locality.id);
    servObj.data = locality;
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
    let servObj = new ServiceObject('locality', id);
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
