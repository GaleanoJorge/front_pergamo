import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { FixedStock } from '../models/fixed-stock';

@Injectable({
  providedIn: 'root'
})
export class FixedStockService {
  public fixed_stock: FixedStock[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<FixedStock[]> {
    let servObj = new ServiceObject(params ? 'fixed_stock?pagination=false' : 'fixed_stock');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.fixed_stock = <FixedStock[]>servObj.data.fixed_stock;

        return Promise.resolve(this.fixed_stock);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(fixed_stock: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('fixed_stock');
    servObj.data = fixed_stock;
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

  Update(fixed_stock: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('fixed_stock', fixed_stock.id);
    servObj.data = fixed_stock;
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
    let servObj = new ServiceObject('fixed_stock', id);
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
