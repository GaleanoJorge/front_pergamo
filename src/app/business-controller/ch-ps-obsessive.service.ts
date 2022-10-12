import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ChPsObsessive } from '../models/ch-ps-obsessive';

@Injectable({
  providedIn: 'root'
})
export class ChPsObsessiveService {
  public ch_ps_obsessive: ChPsObsessive[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChPsObsessive[]> {
    let servObj = new ServiceObject(params ? 'ch_ps_obsessive?pagination=false' : 'ch_ps_obsessive');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_ps_obsessive = <ChPsObsessive[]>servObj.data.ch_ps_obsessive;

        return Promise.resolve(this.ch_ps_obsessive);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_ps_obsessive: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ps_obsessive');
    servObj.data = ch_ps_obsessive;
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

  Update(ch_ps_obsessive: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ps_obsessive', ch_ps_obsessive.id);
    servObj.data = ch_ps_obsessive;
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
    let servObj = new ServiceObject('ch_ps_obsessive', id);
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
