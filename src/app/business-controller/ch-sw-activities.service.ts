import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ChSwAtivities } from '../models/ch-sw-activities';

@Injectable({
  providedIn: 'root'
})
export class ChSwAtivitiesService {
  public ch_sw_activities: ChSwAtivities[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChSwAtivities[]> {
    let servObj = new ServiceObject(params ? 'ch_sw_activities?pagination=false' : 'ch_sw_activities');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_sw_activities = <ChSwAtivities[]>servObj.data.ch_sw_activities;

        return Promise.resolve(this.ch_sw_activities);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_sw_activities: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_sw_activities');
    servObj.data = ch_sw_activities;
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

  Update(ch_sw_activities: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_sw_activities', ch_sw_activities.id);
    servObj.data = ch_sw_activities;
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
    let servObj = new ServiceObject('ch_sw_activities', id);
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
