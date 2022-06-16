import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ChCarePlan } from '../models/ch-care-plan';

@Injectable({
  providedIn: 'root'
})
export class ChCarePlanService {
  public ch_care_plan: ChCarePlan[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params): Promise<ChCarePlan[]> {
    let servObj = new ServiceObject(params ? 'ch_care_plan?pagination=false' : 'ch_care_plan');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_care_plan = <ChCarePlan[]>servObj.data.ch_care_plan;

        return Promise.resolve(this.ch_care_plan);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_care_plan: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_care_plan');
    servObj.data = ch_care_plan;
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

  Update(ch_care_plan: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_care_plan', ch_care_plan.id);
    servObj.data = ch_care_plan;
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
    let servObj = new ServiceObject('ch_care_plan', id);
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
