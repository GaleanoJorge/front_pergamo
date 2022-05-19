import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { PreBillingPad } from '../models/pre-billing-pad';

@Injectable({
  providedIn: 'root'
})
export class PreBillingPadService {
  public diet_day: PreBillingPad[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<PreBillingPad[]> {
    let servObj = new ServiceObject(params ? 'diet_day?pagination=false' : 'diet_day');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.diet_day = <PreBillingPad[]>servObj.data.diet_day;

        return Promise.resolve(this.diet_day);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(diet_day: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('diet_day');
    servObj.data = diet_day;
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

  Update(diet_day: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('diet_day', diet_day.id);
    servObj.data = diet_day;
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
    let servObj = new ServiceObject('diet_day', id);
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
