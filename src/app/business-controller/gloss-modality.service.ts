import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { GlossModality } from '../models/gloss-modality';

@Injectable({
  providedIn: 'root'
})
export class GlossModalityService {
  public gloss_modality: GlossModality[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<GlossModality[]> {
    let servObj = new ServiceObject(params ? 'gloss_modality?pagination=false' : 'gloss_modality');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.gloss_modality = <GlossModality[]>servObj.data.gloss_modality;

        return Promise.resolve(this.gloss_modality);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(gloss_modality: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('gloss_modality');
    servObj.data = gloss_modality;
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


  Update(gloss_modality: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('gloss_modality', gloss_modality.id);
    servObj.data = gloss_modality;
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
    let servObj = new ServiceObject('gloss_modality', id);
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
