import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { NursingCarePlan } from '../models/nursing-care-plan';

@Injectable({
  providedIn: 'root'
})
export class NursingCarePlanService {
  public NursingCarePlan: NursingCarePlan[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<NursingCarePlan[]> {
    let servObj = new ServiceObject(params ? 'nursing_care_plan?pagination=false' : 'nursing_care_plan');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.NursingCarePlan = <NursingCarePlan[]>servObj.data.NursingCarePlan;

        return Promise.resolve(this.NursingCarePlan);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(NursingCarePlan: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('nursing_care_plan');
    servObj.data = NursingCarePlan;
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

  Update(NursingCarePlan: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('nursing_care_plan', NursingCarePlan.id);
    servObj.data = NursingCarePlan;
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
    let servObj = new ServiceObject('nursing_care_plan', id);
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
