import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { FixedStockAccessories } from '../models/fixed-stock-accessories';

@Injectable({
  providedIn: 'root'
})
export class FixedStockAccessoriesService {
  public fixed_stock_accessories: FixedStockAccessories[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<FixedStockAccessories[]> {
    let servObj = new ServiceObject(params ? 'fixed_stock_accessories?pagination=false' : 'fixed_stock_accessories');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.fixed_stock_accessories = <FixedStockAccessories[]>servObj.data.fixed_stock_accessories;

        return Promise.resolve(this.fixed_stock_accessories);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(fixed_stock_accessories: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('fixed_stock_accessories');
    servObj.data = fixed_stock_accessories;
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

  Update(fixed_stock_accessories: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('fixed_stock_accessories', fixed_stock_accessories.id);
    servObj.data = fixed_stock_accessories;
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
    let servObj = new ServiceObject('fixed_stock_accessories', id);
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
