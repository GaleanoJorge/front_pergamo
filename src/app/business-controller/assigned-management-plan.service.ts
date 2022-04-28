import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { AssignedManagementPlan } from '../models/assigned-management-plan';

@Injectable({
  providedIn: 'root'
})
export class AssignedManagementPlanService {
  public assigned_management_plan: AssignedManagementPlan[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<AssignedManagementPlan[]> {
    let servObj = new ServiceObject(params ? 'assigned_management_plan?pagination=false' : 'assigned_management_plan');

    return this.webAPI.GetAction(servObj,params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.assigned_management_plan = <AssignedManagementPlan[]>servObj.data.assigned_management_plan;

        return Promise.resolve(this.assigned_management_plan);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(assigned_management_plan: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('assigned_management_plan');
    servObj.data = assigned_management_plan;
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

  Update(assigned_management_plan: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('assigned_management_plan', assigned_management_plan.id);
    servObj.data = assigned_management_plan;
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
    let servObj = new ServiceObject('assigned_management_plan', id);
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
