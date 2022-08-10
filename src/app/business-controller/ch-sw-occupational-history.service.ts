import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChSwOccupationalHistory } from '../models/ch-sw-occupational-history';

@Injectable({
  providedIn: 'root'
})
export class ChSwOccupationalHistoryService {
  public ch_sw_occupational_history: ChSwOccupationalHistory[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChSwOccupationalHistory[]> {
    let servObj = new ServiceObject(params ? 'ch_sw_occupational_history?pagination=false' : 'ch_sw_occupational_history');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_sw_occupational_history = <ChSwOccupationalHistory[]>servObj.data.ch_sw_occupational_history;

        return Promise.resolve(this.ch_sw_occupational_history);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_sw_occupational_history: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_sw_occupational_history');
    servObj.data = ch_sw_occupational_history;
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

  Update(ch_sw_occupational_history: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_sw_occupational_history', ch_sw_occupational_history.id);
    servObj.data = ch_sw_occupational_history;
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
    let servObj = new ServiceObject('ch_sw_occupational_history', id);
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
