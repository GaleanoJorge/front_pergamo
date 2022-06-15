import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ChNutritionInterpretation } from '../models/ch-nutrition-interpretation';

@Injectable({
  providedIn: 'root'
})
export class ChNutritionInterpretationService {
  public ch_nutrition_interpretation: ChNutritionInterpretation[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChNutritionInterpretation[]> {
    let servObj = new ServiceObject(params ? 'ch_nutrition_interpretation?pagination=false' : 'ch_nutrition_interpretation');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_nutrition_interpretation = <ChNutritionInterpretation[]>servObj.data.ch_nutrition_interpretation;

        return Promise.resolve(this.ch_nutrition_interpretation);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_nutrition_interpretation: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_nutrition_interpretation');
    servObj.data = ch_nutrition_interpretation;
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

  Update(ch_nutrition_interpretation: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_nutrition_interpretation', ch_nutrition_interpretation.id);
    servObj.data = ch_nutrition_interpretation;
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
    let servObj = new ServiceObject('ch_nutrition_interpretation', id);
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
