import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { DietWeek } from '../models/diet-week';

@Injectable({
  providedIn: 'root'
})
export class DietWeekService {
  public diet_week: DietWeek[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<DietWeek[]> {
    let servObj = new ServiceObject(params ? 'diet_week?pagination=false' : 'diet_week');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.diet_week = <DietWeek[]>servObj.data.diet_week;

        return Promise.resolve(this.diet_week);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(diet_week: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('diet_week');
    servObj.data = diet_week;
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

  Update(diet_week: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('diet_week', diet_week.id);
    servObj.data = diet_week;
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
    let servObj = new ServiceObject('diet_week', id);
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
