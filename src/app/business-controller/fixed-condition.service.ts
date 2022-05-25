import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { FixedCondition } from '../models/fixed-condition';

@Injectable({
  providedIn: 'root'
})
export class FixedConditionService {
  public fixed_condition: FixedCondition[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<FixedCondition[]> {
    let servObj = new ServiceObject(params ? 'fixed_condition?pagination=false' : 'fixed_condition');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.fixed_condition = <FixedCondition[]>servObj.data.fixed_condition;

        return Promise.resolve(this.fixed_condition);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(fixed_condition: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('fixed_condition');
    servObj.data = fixed_condition;
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

  Update(fixed_condition: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('fixed_condition', fixed_condition.id);
    servObj.data = fixed_condition;
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
    let servObj = new ServiceObject('fixed_condition', id);
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
