import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { GlossAmbit } from '../models/gloss-ambit';

@Injectable({
  providedIn: 'root'
})
export class GlossAmbitService {
  public gloss_ambit: GlossAmbit[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<GlossAmbit[]> {
    let servObj = new ServiceObject(params ? 'gloss_ambit?pagination=false' : 'gloss_ambit');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.gloss_ambit = <GlossAmbit[]>servObj.data.gloss_ambit;

        return Promise.resolve(this.gloss_ambit);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(gloss_ambit: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('gloss_ambit');
    servObj.data = gloss_ambit;
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


  Update(gloss_ambit: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('gloss_ambit', gloss_ambit.id);
    servObj.data = gloss_ambit;
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
    let servObj = new ServiceObject('gloss_ambit', id);
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
