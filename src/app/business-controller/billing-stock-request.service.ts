import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { BillingStockRequest } from '../models/billing-stock-request';

@Injectable({
  providedIn: 'root'
})
export class BillingStockRequestService {
  public billing_stock_request: BillingStockRequest[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<BillingStockRequest[]> {
    let servObj = new ServiceObject(params ? 'billing_stock_request?pagination=false' : 'billing_stock_request');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.billing_stock_request = <BillingStockRequest[]>servObj.data.billing_stock_request;

        return Promise.resolve(this.billing_stock_request);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(billing_stock_request: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('billing_stock_request');
    servObj.data = billing_stock_request;
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

  Update(billing_stock_request: any, id = null): Promise<ServiceObject> {
    let servObj = new ServiceObject('billing_stock_request', id );
    servObj.data = billing_stock_request;
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
    let servObj = new ServiceObject('billing_stock_request', id);
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
