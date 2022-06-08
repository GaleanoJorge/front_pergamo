import { Injectable } from '@angular/core';
import { GlossStatus } from '../models/gloss-status';
import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';

@Injectable({
  providedIn: 'root'
})
export class GlossStatusService {

  public gloss_status: GlossStatus[] = [];

  constructor(private webAPI: WebAPIService) { }

  GetCollection(params = {}): Promise<GlossStatus[]> {
    var servObj = new ServiceObject("gloss_status");
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.gloss_status = <GlossStatus[]>servObj.data.gloss_status;
        return Promise.resolve(this.gloss_status);
      })
      .catch(x => {
        throw x.message;
      });
  }

  GetSingle(id: number): Promise<GlossStatus[]> {
    var servObj = new ServiceObject("gloss_status", id);
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.gloss_status = <GlossStatus[]>servObj.data.gloss_status;
        return Promise.resolve(this.gloss_status);
      })
      .catch(x => {
        throw x.status == 401 ? x.error.msg : x.message;
      });
  }

  Save(gloss_status: any): Promise<ServiceObject> {
    var servObj = new ServiceObject("gloss_status");
    servObj.data = gloss_status;
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

  Update(gloss_status: any): Promise<ServiceObject> {
    var servObj = new ServiceObject("gloss_status", gloss_status.id);
    servObj.data = gloss_status;
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

  Delete(id: any): Promise<ServiceObject> {
    var servObj = new ServiceObject("gloss_status", id);
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

  GetCustomFields(id: number): Promise<any[]> {
    var servObj = new ServiceObject("customField/allByUserGlossStatus", id);
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(<any[]>servObj.data.customFieldUserGlossStatus);
      })
      .catch(x => {
        throw x.status == 401 ? x.error.msg : x.message;
      });
  }
}
