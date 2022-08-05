import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ChSwHours } from '../models/ch-sw-hours';

@Injectable({
  providedIn: 'root'
})
export class ChSwHoursService {
  public ch_sw_hours: ChSwHours[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChSwHours[]> {
    let servObj = new ServiceObject(params ? 'ch_sw_hours?pagination=false' : 'ch_sw_hours');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_sw_hours = <ChSwHours[]>servObj.data.ch_sw_hours;

        return Promise.resolve(this.ch_sw_hours);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_sw_hours: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_sw_hours');
    servObj.data = ch_sw_hours;
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

  Update(ch_sw_hours: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_sw_hours', ch_sw_hours.id);
    servObj.data = ch_sw_hours;
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
    let servObj = new ServiceObject('ch_sw_hours', id);
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
