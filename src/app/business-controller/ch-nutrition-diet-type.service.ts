import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ChNutritionDietType } from '../models/ch-nutrition-diet-type';

@Injectable({
  providedIn: 'root'
})
export class ChNutritionDietTypeService {
  public ch_nutrition_diet_type: ChNutritionDietType[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChNutritionDietType[]> {
    let servObj = new ServiceObject(params ? 'ch_nutrition_diet_type?pagination=false' : 'ch_nutrition_diet_type');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_nutrition_diet_type = <ChNutritionDietType[]>servObj.data.ch_nutrition_diet_type;

        return Promise.resolve(this.ch_nutrition_diet_type);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_nutrition_diet_type: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_nutrition_diet_type');
    servObj.data = ch_nutrition_diet_type;
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

  Update(ch_nutrition_diet_type: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_nutrition_diet_type', ch_nutrition_diet_type.id);
    servObj.data = ch_nutrition_diet_type;
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
    let servObj = new ServiceObject('ch_nutrition_diet_type', id);
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
