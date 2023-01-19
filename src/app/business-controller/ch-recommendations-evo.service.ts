import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChRecommendationsEvo } from '../models/ch-recommendations-evo';

@Injectable({
  providedIn: 'root'
})
export class ChRecommendationsEvoService {
  public ch_recommendations_evo: ChRecommendationsEvo[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChRecommendationsEvo[]> {
    let servObj = new ServiceObject(params ? 'ch_recommendations_evo?pagination=false' : 'ch_recommendations_evo');
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_recommendations_evo = <ChRecommendationsEvo[]>servObj.data.ch_recommendations_evo;

        return Promise.resolve(this.ch_recommendations_evo);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_recommendations_evo: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_recommendations_evo');
    servObj.data = ch_recommendations_evo;
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

  Update(ch_recommendations_evo: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_recommendations_evo', ch_recommendations_evo.id);
    servObj.data = ch_recommendations_evo;
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
    let servObj = new ServiceObject('ch_recommendations_evo', id);
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
