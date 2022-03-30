import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { DietMenuDish } from '../models/diet-menu-dish';

@Injectable({
  providedIn: 'root'
})
export class DietMenuDishService {
  public diet_menu_dish: DietMenuDish[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<DietMenuDish[]> {
    let servObj = new ServiceObject(params ? 'diet_menu_dish?pagination=false' : 'diet_menu_dish');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.diet_menu_dish = <DietMenuDish[]>servObj.data.diet_menu_dish;

        return Promise.resolve(this.diet_menu_dish);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(diet_menu_dish: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('diet_menu_dish');
    servObj.data = diet_menu_dish;
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

  Update(diet_menu_dish: any, id = null): Promise<ServiceObject> {
    let servObj = new ServiceObject('diet_menu_dish', diet_menu_dish.id ? diet_menu_dish.id : id);
    servObj.data = diet_menu_dish;
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
    let servObj = new ServiceObject('diet_menu_dish', id);
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
