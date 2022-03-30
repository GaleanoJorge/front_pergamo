import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { GlossConciliation } from '../models/gloss-conciliation';

@Injectable({
  providedIn: 'root'
})
export class GlossConciliationService {
  public gloss_conciliation: GlossConciliation[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<GlossConciliation[]> {
    let servObj = new ServiceObject(params ? 'gloss_conciliation?pagination=false' : 'gloss_conciliation');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.gloss_conciliation = <GlossConciliation[]>servObj.data.gloss;

        return Promise.resolve(this.gloss_conciliation);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(gloss_conciliation: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('gloss_conciliation');
    servObj.data = gloss_conciliation;
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
    let servObj = new ServiceObject('changeConsciliationStatus');
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

  // SaveFile(gloss: any): Promise<ServiceObject> {
  //   let servObj = new ServiceObject('fileUpload');
  //   servObj.data = gloss;
  //   return this.webAPI.PostAction(servObj)
  //     .then(x => {
  //       servObj = <ServiceObject>x;
  //       if (!servObj.status)
  //         throw new Error(servObj.message);

  //       return Promise.resolve(servObj);
  //     })
  //     .catch(x => {
  //       throw x.message;
  //     });
  // }


  Update(gloss_conciliation: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('gloss_conciliation', gloss_conciliation.id);
    servObj.data = gloss_conciliation;
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

  // ChangeStatus(id): Promise<any> {
  //   let servObj = new ServiceObject(`user/${id}/changeStatus`);

  //   return this.webAPI.PatchAction(servObj)
  //     .then(x => {
  //       servObj = <ServiceObject>x;

  //       if (!servObj.status)
  //         throw new Error(servObj.message);

  //       return Promise.resolve(<any>servObj);
  //     }).catch(x => {
  //       throw x.message;
  //     });
  // }

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
