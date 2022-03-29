import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ManagementPlan } from '../models/management-plan';

@Injectable({
  providedIn: 'root'
})
export class ManagementPlanService {
  public management_plan: ManagementPlan[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ManagementPlan[]> {
    let servObj = new ServiceObject(params ? 'management_plan?pagination=false' : 'management_plan');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.management_plan = <ManagementPlan[]>servObj.data.management_plan;

        return Promise.resolve(this.management_plan);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(management_plan: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('management_plan');
    servObj.data = management_plan;
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

  Update(management_plan: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('management_plan', management_plan.id);
    servObj.data = management_plan;
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
    let servObj = new ServiceObject('management_plan', id);
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
