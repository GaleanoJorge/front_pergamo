import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChSwArmedConflict } from '../models/ch-sw-armed-conflict';

@Injectable({
  providedIn: 'root'
})
export class ChSwArmedConflictService {
  public ch_sw_armed_conflict: ChSwArmedConflict[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChSwArmedConflict[]> {
    let servObj = new ServiceObject(params ? 'ch_sw_armed_conflict?pagination=false' : 'ch_sw_armed_conflict');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_sw_armed_conflict = <ChSwArmedConflict[]>servObj.data.ch_sw_armed_conflict;

        return Promise.resolve(this.ch_sw_armed_conflict);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_sw_armed_conflict: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_sw_armed_conflict');
    servObj.data = ch_sw_armed_conflict;
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

  Update(ch_sw_armed_conflict: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_sw_armed_conflict', ch_sw_armed_conflict.id);
    servObj.data = ch_sw_armed_conflict;
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
    let servObj = new ServiceObject('ch_sw_armed_conflict', id);
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
