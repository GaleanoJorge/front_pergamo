import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { GlossResponse } from '../models/gloss-response';

@Injectable({
  providedIn: 'root'
})
export class GlossResponseService {
  public gloss_response: GlossResponse[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<GlossResponse[]> {
    let servObj = new ServiceObject(params ? 'gloss_response?pagination=false' : 'gloss_response');

    return this.webAPI.GetAction(servObj,params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.gloss_response = <GlossResponse[]>servObj.data.gloss_response;

        return Promise.resolve(this.gloss_response);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(gloss_response: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('gloss_response');
    servObj.data = gloss_response;
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

  Update(gloss_response: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('gloss_response', gloss_response.id);
    servObj.data = gloss_response;
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
    let servObj = new ServiceObject('gloss_response', id);
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
