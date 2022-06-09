import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { BillingPadPgp } from '../models/billing-pad-pgp';

@Injectable({
  providedIn: 'root'
})
export class BillingPadPgpService {
  public billing_pad_pgp: BillingPadPgp[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<BillingPadPgp[]> {
    let servObj = new ServiceObject(params ? 'billing_pad_pgp?pagination=false' : 'billing_pad_pgp');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.billing_pad_pgp = <BillingPadPgp[]>servObj.data.billing_pad_pgp;

        return Promise.resolve(this.billing_pad_pgp);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(billing_pad_pgp: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('billing_pad_pgp');
    servObj.data = billing_pad_pgp;
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

  Update(billing_pad_pgp: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('billing_pad_pgp', billing_pad_pgp.id);
    servObj.data = billing_pad_pgp;
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
    let servObj = new ServiceObject('billing_pad_pgp', id);
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
