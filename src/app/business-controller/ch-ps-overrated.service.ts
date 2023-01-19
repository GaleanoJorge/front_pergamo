import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ChPsOverrated } from '../models/ch-ps-overrated';

@Injectable({
  providedIn: 'root'
})
export class ChPsOverratedService {
  public ch_ps_overrated: ChPsOverrated[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChPsOverrated[]> {
    let servObj = new ServiceObject(params ? 'ch_ps_overrated?pagination=false' : 'ch_ps_overrated');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_ps_overrated = <ChPsOverrated[]>servObj.data.ch_ps_overrated;

        return Promise.resolve(this.ch_ps_overrated);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_ps_overrated: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ps_overrated');
    servObj.data = ch_ps_overrated;
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

  Update(ch_ps_overrated: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ps_overrated', ch_ps_overrated.id);
    servObj.data = ch_ps_overrated;
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
    let servObj = new ServiceObject('ch_ps_overrated', id);
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
