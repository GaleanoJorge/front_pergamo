import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { NonWorkingDays } from '../models/non-working-days';

@Injectable({
  providedIn: 'root'
})
export class NonWorkingDaysService {
  public non_working_days: NonWorkingDays[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<NonWorkingDays[]> {
    let servObj = new ServiceObject(params ? 'non_working_days?pagination=false' : 'non_working_days');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.non_working_days = <NonWorkingDays[]>servObj.data.non_working_days;

        return Promise.resolve(this.non_working_days);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(non_working_days: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('non_working_days');
    servObj.data = non_working_days;
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

  Update(non_working_days: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('non_working_days', non_working_days.id);
    servObj.data = non_working_days;
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
    let servObj = new ServiceObject('non_working_days', id);
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
