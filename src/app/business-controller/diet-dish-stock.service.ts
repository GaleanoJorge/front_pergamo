import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { DietDishStock } from '../models/diet-dish-stock';

@Injectable({
  providedIn: 'root'
})
export class DietDishStockService {
  public diet_dish_stock: DietDishStock[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<DietDishStock[]> {
    let servObj = new ServiceObject(params ? 'diet_dish_stock?pagination=false' : 'diet_dish_stock');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.diet_dish_stock = <DietDishStock[]>servObj.data.diet_dish_stock;

        return Promise.resolve(this.diet_dish_stock);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(diet_dish_stock: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('diet_dish_stock');
    servObj.data = diet_dish_stock;
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

  Update(diet_dish_stock: any, id = null): Promise<ServiceObject> {
    let servObj = new ServiceObject('diet_dish_stock', id );
    servObj.data = diet_dish_stock;
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
    let servObj = new ServiceObject('diet_dish_stock', id);
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
