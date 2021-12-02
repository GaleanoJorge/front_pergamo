import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { GlossService } from '../models/gloss-service';

@Injectable({
  providedIn: 'root'
})
export class GlossServiceService {
  public gloss_service: GlossService[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<GlossService[]> {
    let servObj = new ServiceObject(params ? 'gloss_service?pagination=false' : 'gloss_service');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.gloss_service = <GlossService[]>servObj.data.gloss_service;

        return Promise.resolve(this.gloss_service);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(gloss_service: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('gloss_service');
    servObj.data = gloss_service;
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


  Update(gloss_service: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('gloss_service', gloss_service.id);
    servObj.data = gloss_service;
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

  ChangeStatus(id): Promise<any> {
    let servObj = new ServiceObject(`user/${id}/changeStatus`);

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

  Delete(id): Promise<ServiceObject> {
    let servObj = new ServiceObject('gloss_service', id);
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
