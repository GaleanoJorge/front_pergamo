import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChNutritionParental } from '../models/ch-nutrition-parenteral';

@Injectable({
  providedIn: 'root'
})
export class ChNutritionParentalService {
  public ch_nutrition_parenteral: ChNutritionParental[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChNutritionParental[]> {
    let servObj = new ServiceObject(params ? 'ch_nutrition_parenteral?pagination=false' : 'ch_nutrition_parenteral');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_nutrition_parenteral = <ChNutritionParental[]>servObj.data.ch_nutrition_parenteral;

        return Promise.resolve(this.ch_nutrition_parenteral);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_nutrition_parenteral: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_nutrition_parenteral');
    servObj.data = ch_nutrition_parenteral;
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

  Update(ch_nutrition_parenteral: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_nutrition_parenteral', ch_nutrition_parenteral.id);
    servObj.data = ch_nutrition_parenteral;
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
    let servObj = new ServiceObject('ch_nutrition_parenteral', id);
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
