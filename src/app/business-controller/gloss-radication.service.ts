import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { GlossRadication } from '../models/gloss-radication';

@Injectable({
  providedIn: 'root'
})
export class GlossRadicationService {
  public gloss_radication: GlossRadication[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<GlossRadication[]> {
    let servObj = new ServiceObject(params ? 'gloss_radication?pagination=false' : 'gloss_radication');

    return this.webAPI.GetAction(servObj,params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.gloss_radication = <GlossRadication[]>servObj.data.gloss_radication;

        return Promise.resolve(this.gloss_radication);
      })
      .catch(x => {
        throw x.message;
      });
  }

  GetResponseById(params = {}): Promise<GlossRadication[]> {
    let servObj = new ServiceObject(params ? 'gloss_radication?pagination=false' : 'gloss_radication');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.gloss_radication = <GlossRadication[]>servObj.data.gloss_radication;

        return Promise.resolve(this.gloss_radication);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(gloss_radication: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('gloss_radication');
    servObj.data = gloss_radication;
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

  Update(gloss_radication: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('gloss_radication', gloss_radication.id);
    servObj.data = gloss_radication;
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
    let servObj = new ServiceObject('gloss_radication', id);
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
