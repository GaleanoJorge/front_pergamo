import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ChNutritionFoodHistory } from '../models/ch-nutrition-food-history';

@Injectable({
  providedIn: 'root'
})
export class ChNutritionFoodHistoryService {
  public ch_nutrition_food_history: ChNutritionFoodHistory[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChNutritionFoodHistory[]> {
    let servObj = new ServiceObject(params ? 'ch_nutrition_food_history?pagination=false' : 'ch_nutrition_food_history');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_nutrition_food_history = <ChNutritionFoodHistory[]>servObj.data.ch_nutrition_food_history;

        return Promise.resolve(this.ch_nutrition_food_history);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_nutrition_food_history: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_nutrition_food_history');
    servObj.data = ch_nutrition_food_history;
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

  Update(ch_nutrition_food_history: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_nutrition_food_history', ch_nutrition_food_history.id);
    servObj.data = ch_nutrition_food_history;
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
    let servObj = new ServiceObject('ch_nutrition_food_history', id);
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
