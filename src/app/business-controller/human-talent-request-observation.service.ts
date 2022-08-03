import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { HumanTalentRequestObservation } from '../models/human-talent-request-observation';

@Injectable({
  providedIn: 'root'
})
export class HumanTalentRequestObservationService {
  public human_talent_request_observation: HumanTalentRequestObservation[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<HumanTalentRequestObservation[]> {
    let servObj = new ServiceObject(params ? 'human_talent_request_observation?pagination=false' : 'human_talent_request_observation');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.human_talent_request_observation = <HumanTalentRequestObservation[]>servObj.data.human_talent_request_observation;

        return Promise.resolve(this.human_talent_request_observation);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(human_talent_request_observation: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('human_talent_request_observation');
    servObj.data = human_talent_request_observation;
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

  Update(human_talent_request_observation: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('human_talent_request_observation', human_talent_request_observation.id);
    servObj.data = human_talent_request_observation;
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
    let servObj = new ServiceObject('human_talent_request_observation', id);
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
