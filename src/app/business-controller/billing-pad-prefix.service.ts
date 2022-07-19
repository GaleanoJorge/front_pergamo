import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { BillingPadPrefix } from '../models/billing-pad-prefix';

@Injectable({
  providedIn: 'root'
})
export class BillingPadPrefixService {
  public billing_pad_prefix: BillingPadPrefix[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<BillingPadPrefix[]> {
    let servObj = new ServiceObject(params ? 'billing_pad_prefix?pagination=false' : 'billing_pad_prefix');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.billing_pad_prefix = <BillingPadPrefix[]>servObj.data.billing_pad_prefix;

        return Promise.resolve(this.billing_pad_prefix);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(billing_pad_prefix: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('billing_pad_prefix');
    servObj.data = billing_pad_prefix;
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

  Update(billing_pad_prefix: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('billing_pad_prefix', billing_pad_prefix.id);
    servObj.data = billing_pad_prefix;
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
    let servObj = new ServiceObject('billing_pad_prefix', id);
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
