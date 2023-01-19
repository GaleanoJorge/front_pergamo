import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Billing } from '../models/billing';

@Injectable({
  providedIn: 'root'
})
export class BillingService {
  public billing: Billing[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<Billing[]> {
    let servObj = new ServiceObject(params ? 'billing?pagination=false' : 'billing');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.billing = <Billing[]>servObj.data.billing;

        return Promise.resolve(this.billing);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(billing: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('billing');
    servObj.data = billing;
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

  Update(billing: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('billing', billing.id);
    servObj.data = billing;
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
    let servObj = new ServiceObject('billing', id);
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
