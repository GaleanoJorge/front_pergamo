import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { HumanTalentRequest } from '../models/humant-talent-request';

@Injectable({
  providedIn: 'root'
})
export class HumanTalentRequestService {
  public human_talent_request: HumanTalentRequest[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<HumanTalentRequest[]> {
    let servObj = new ServiceObject(params ? 'human_talent_request?pagination=false' : 'human_talent_request');

    return this.webAPI.GetAction(servObj,params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.human_talent_request = <HumanTalentRequest[]>servObj.data.human_talent_request;

        return Promise.resolve(this.human_talent_request);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(human_talent_request: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('human_talent_request');
    servObj.data = human_talent_request;
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

  Update(human_talent_request: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('human_talent_request', human_talent_request.id);
    servObj.data = human_talent_request;
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
    let servObj = new ServiceObject('human_talent_request', id);
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
