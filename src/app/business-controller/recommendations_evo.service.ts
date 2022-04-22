import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { RecommendationsEvo } from '../models/recommendations_evo';

@Injectable({
  providedIn: 'root'
})
export class RecommendationsEvoService {
  public recommendations_evo: RecommendationsEvo[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<RecommendationsEvo[]> {
    let servObj = new ServiceObject(params ? 'recommendations_evo?pagination=false' : 'recommendations_evo');
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.recommendations_evo = <RecommendationsEvo[]>servObj.data.recommendations_evo;

        return Promise.resolve(this.recommendations_evo);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(recommendations_evo: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('recommendations_evo');
    servObj.data = recommendations_evo;
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

  Update(recommendations_evo: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('recommendations_evo', recommendations_evo.id);
    servObj.data = recommendations_evo;
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
    let servObj = new ServiceObject('recommendations_evo', id);
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
