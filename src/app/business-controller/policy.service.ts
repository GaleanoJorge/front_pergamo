import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Policy } from '../models/policy';

@Injectable({
  providedIn: 'root'
})
export class PolicyService {
  public policy: Policy[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<Policy[]> {
    let servObj = new ServiceObject(params ? 'policy?pagination=false' : 'policy');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.policy = <Policy[]>servObj.data.policy;

        return Promise.resolve(this.policy);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(policy: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('policy');
    servObj.data = policy;
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


  Update(sect: any, id = null): Promise<ServiceObject> {
    let servObj = new ServiceObject('policy', (sect.id ? sect.id : id));
    servObj.data = sect;
    return this.webAPI.PostAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message)
        return Promise.resolve(servObj);
      })
      .catch(x => {
        throw x.message;
      })
  }


  Delete(id): Promise<ServiceObject> {
    let servObj = new ServiceObject('policy', id);
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
