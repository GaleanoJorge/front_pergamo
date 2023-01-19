import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { PolicyType } from '../models/policy-type';

@Injectable({
  providedIn: 'root'
})
export class PolicyTypeService {
  public policy_type: PolicyType[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<PolicyType[]> {
    let servObj = new ServiceObject(params ? 'policy_type?pagination=false' : 'policy_type');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.policy_type = <PolicyType[]>servObj.data.policy_type;

        return Promise.resolve(this.policy_type);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(policy_type: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('policy_type');
    servObj.data = policy_type;
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

  Update(policy_type: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('policy_type', policy_type.id);
    servObj.data = policy_type;
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
    let servObj = new ServiceObject('policy_type', id);
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
