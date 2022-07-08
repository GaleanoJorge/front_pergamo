import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Gloss } from '../models/gloss';

@Injectable({
  providedIn: 'root'
})
export class GlossService {
  public gloss: Gloss[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<Gloss[]> {
    let servObj = new ServiceObject(params ? 'gloss?pagination=false' : 'gloss');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.gloss = <Gloss[]>servObj.data.gloss;

        return Promise.resolve(this.gloss);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(gloss: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('gloss');
    servObj.data = gloss;
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

  ChangeStatusBriefcase(status: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('changeStatus');
    servObj.data = status;
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

  SaveFile(gloss: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('fileUpload');
    servObj.data = gloss;
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


  Update(gloss: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('gloss', gloss.id);
    servObj.data = gloss;
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
    let servObj = new ServiceObject('gloss', id);
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
