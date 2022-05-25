import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { LitersPerMinute } from '../models/liters_per_minute';

@Injectable({
  providedIn: 'root'
})
export class LitersPerMinuteService {
  public liters_per_minute: LitersPerMinute[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<LitersPerMinute[]> {
    let servObj = new ServiceObject(params ? 'liters_per_minute?pagination=false' : 'liters_per_minute');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.liters_per_minute = <LitersPerMinute[]>servObj.data.liters_per_minute;

        return Promise.resolve(this.liters_per_minute);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(liters_per_minute: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('liters_per_minute');
    servObj.data = liters_per_minute;
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

  Update(liters_per_minute: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('liters_per_minute', liters_per_minute.id);
    servObj.data = liters_per_minute;
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
    let servObj = new ServiceObject('liters_per_minute', id);
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
