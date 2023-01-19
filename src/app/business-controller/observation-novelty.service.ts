import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ObservationNovelty } from '../models/observation-novelty';

@Injectable({
  providedIn: 'root'
})
export class ObservationNoveltyService {
  public observation_novelty: ObservationNovelty[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ObservationNovelty[]> {
    let servObj = new ServiceObject(params ? 'observation_novelty?pagination=false' : 'observation_novelty');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.observation_novelty = <ObservationNovelty[]>servObj.data.observation_novelty;

        return Promise.resolve(this.observation_novelty);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(observation_novelty: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('observation_novelty');
    servObj.data = observation_novelty;
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

  Update(observation_novelty: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('observation_novelty', observation_novelty.id);
    servObj.data = observation_novelty;
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
    let servObj = new ServiceObject('observation_novelty', id);
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
