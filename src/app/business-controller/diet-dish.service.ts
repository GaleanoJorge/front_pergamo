import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { DietDish } from '../models/diet-dish';

@Injectable({
  providedIn: 'root'
})
export class DietDishService {
  public diet_dish: DietDish[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<DietDish[]> {
    let servObj = new ServiceObject(params ? 'diet_dish?pagination=false' : 'diet_dish');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.diet_dish = <DietDish[]>servObj.data.diet_dish;

        return Promise.resolve(this.diet_dish);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(diet_dish: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('diet_dish');
    servObj.data = diet_dish;
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

  Update(diet_dish: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('diet_dish', diet_dish.id);
    servObj.data = diet_dish;
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
    let servObj = new ServiceObject('diet_dish', id);
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
