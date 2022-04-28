import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { BillingStock } from '../models/billing-stock';

@Injectable({
  providedIn: 'root'
})
export class BillingStockService {
  public billing_stock: BillingStock[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<BillingStock[]> {
    let servObj = new ServiceObject(params ? 'billing_stock?pagination=false' : 'billing_stock');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.billing_stock = <BillingStock[]>servObj.data.billing_stock;

        return Promise.resolve(this.billing_stock);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(billing_stock: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('billing_stock');
    servObj.data = billing_stock;
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

  Update(billing_stock: any, id = null): Promise<ServiceObject> {
    let servObj = new ServiceObject('billing_stock', id );
    servObj.data = billing_stock;
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
    let servObj = new ServiceObject('billing_stock', id);
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
