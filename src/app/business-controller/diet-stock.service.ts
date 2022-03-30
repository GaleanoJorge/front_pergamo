import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { DietStock } from '../models/diet-stock';

@Injectable({
  providedIn: 'root'
})
export class DietStockService {
  public diet_stock: DietStock[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<DietStock[]> {
    let servObj = new ServiceObject(params ? 'diet_stock?pagination=false' : 'diet_stock');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.diet_stock = <DietStock[]>servObj.data.diet_stock;

        return Promise.resolve(this.diet_stock);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(diet_stock: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('diet_stock');
    servObj.data = diet_stock;
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

  Update(diet_stock: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('diet_stock', diet_stock.id);
    servObj.data = diet_stock;
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
    let servObj = new ServiceObject('diet_stock', id);
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
