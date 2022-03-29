import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { DietOrder } from '../models/diet-order';

@Injectable({
  providedIn: 'root'
})
export class DietOrderService {
  public diet_order: DietOrder[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<DietOrder[]> {
    let servObj = new ServiceObject(params ? 'diet_order?pagination=false' : 'diet_order');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.diet_order = <DietOrder[]>servObj.data.diet_order;

        return Promise.resolve(this.diet_order);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(diet_order: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('diet_order');
    servObj.data = diet_order;
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

  Update(diet_order: any, id = null): Promise<ServiceObject> {
    let servObj = new ServiceObject('diet_order', diet_order.id ? diet_order.id : id);
    servObj.data = diet_order;
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
    let servObj = new ServiceObject('diet_order', id);
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
