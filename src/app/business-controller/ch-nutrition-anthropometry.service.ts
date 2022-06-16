import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ChNutritionAnthropometry } from '../models/ch-nutrition-anthropometry';

@Injectable({
  providedIn: 'root'
})
export class ChNutritionAnthropometryService {
  public ch_nutrition_anthropometry: ChNutritionAnthropometry[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChNutritionAnthropometry[]> {
    let servObj = new ServiceObject(params ? 'ch_nutrition_anthropometry?pagination=false' : 'ch_nutrition_anthropometry');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_nutrition_anthropometry = <ChNutritionAnthropometry[]>servObj.data.ch_nutrition_anthropometry;

        return Promise.resolve(this.ch_nutrition_anthropometry);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_nutrition_anthropometry: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_nutrition_anthropometry');
    servObj.data = ch_nutrition_anthropometry;
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

  Update(ch_nutrition_anthropometry: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_nutrition_anthropometry', ch_nutrition_anthropometry.id);
    servObj.data = ch_nutrition_anthropometry;
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
    let servObj = new ServiceObject('ch_nutrition_anthropometry', id);
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
