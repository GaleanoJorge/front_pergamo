import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Days } from '../models/days';

@Injectable({
  providedIn: 'root'
})
export class DaysService {
  public days: Days[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<Days[]> {
    let servObj = new ServiceObject(params ? 'days?pagination=false' : 'days');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.days = <Days[]>servObj.data.days;

        return Promise.resolve(this.days);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(days: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('days');
    servObj.data = days;
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

  Update(days: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('days', days.id);
    servObj.data = days;
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
    let servObj = new ServiceObject('days', id);
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
