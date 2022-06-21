import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChNutritionGastrointestinal } from '../models/ch-nutrition-gastrointestinal';

@Injectable({
  providedIn: 'root'
})
export class ChNutritionGastrointestinalService {
  public ch_nutrition_gastrointestinal: ChNutritionGastrointestinal[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChNutritionGastrointestinal[]> {
    let servObj = new ServiceObject(params ? 'ch_nutrition_gastrointestinal?pagination=false' : 'ch_nutrition_gastrointestinal');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_nutrition_gastrointestinal = <ChNutritionGastrointestinal[]>servObj.data.ch_nutrition_gastrointestinal;

        return Promise.resolve(this.ch_nutrition_gastrointestinal);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_nutrition_gastrointestinal: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_nutrition_gastrointestinal');
    servObj.data = ch_nutrition_gastrointestinal;
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

  Update(ch_nutrition_gastrointestinal: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_nutrition_gastrointestinal', ch_nutrition_gastrointestinal.id);
    servObj.data = ch_nutrition_gastrointestinal;
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
    let servObj = new ServiceObject('ch_nutrition_gastrointestinal', id);
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
