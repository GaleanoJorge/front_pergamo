import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { BillingPadConsecutive } from '../models/billing-pad-consecutive';

@Injectable({
  providedIn: 'root'
})
export class BillingPadConsecutiveService {
  public billing_pad_consecutive: BillingPadConsecutive[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<BillingPadConsecutive[]> {
    let servObj = new ServiceObject(params ? 'billing_pad_consecutive?pagination=false' : 'billing_pad_consecutive');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.billing_pad_consecutive = <BillingPadConsecutive[]>servObj.data.billing_pad_consecutive;

        return Promise.resolve(this.billing_pad_consecutive);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(billing_pad_consecutive: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('billing_pad_consecutive');
    servObj.data = billing_pad_consecutive;
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

  Update(billing_pad_consecutive: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('billing_pad_consecutive', billing_pad_consecutive.id);
    servObj.data = billing_pad_consecutive;
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
    let servObj = new ServiceObject('billing_pad_consecutive', id);
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
